import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../services/api";

const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("salus_token"));
    const [loading, setLoading] = useState(true);

    const fetchMe = async () => {
        try {
            const response = await api.get("/me");
            setUser(response.data?.data?.user || response.data?.user || null);
        } catch (error) {
            localStorage.removeItem("salus_token");
            setToken(null);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            localStorage.setItem("salus_token", token);
            fetchMe();
        } else {
            localStorage.removeItem("salus_token");
            setUser(null);
            setLoading(false);
        }
    }, [token]);

    const register = async (formData) => {
        const response = await api.post("/register", formData);

        const newToken =
            response.data?.data?.token || response.data?.token || null;

        const newUser =
            response.data?.data?.user || response.data?.user || null;

        if (newToken) {
            localStorage.setItem("salus_token", newToken);
            setToken(newToken);
        }

        if (newUser) {
            setUser(newUser);
        }

        return response.data;
    };

    const login = async (formData) => {
        const response = await api.post("/login", formData);

        const newToken =
            response.data?.data?.token || response.data?.token || null;

        const newUser =
            response.data?.data?.user || response.data?.user || null;

        if (newToken) {
            localStorage.setItem("salus_token", newToken);
            setToken(newToken);
        }

        if (newUser) {
            setUser(newUser);
        }

        return response.data;
    };

    const logout = async () => {
        try {
            await api.post("/logout");
        } catch (error) {
            // ignore
        } finally {
            localStorage.removeItem("salus_token");
            setToken(null);
            setUser(null);
        }
    };

    const value = useMemo(() => {
        return {
            user,
            token,
            loading,
            login,
            register,
            logout,
            fetchMe,
            isAuthenticated: !!user && !!token,
        };
    }, [user, token, loading]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUser must be used inside UserProvider");
    }

    return context;
}