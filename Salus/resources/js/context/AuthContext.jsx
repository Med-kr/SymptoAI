import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import api from '../services/api';
import { normalizeApiError } from '../services/errors';

const TOKEN_KEY = 'salus_token';
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
    const [user, setUser] = useState(null);
    const [initializing, setInitializing] = useState(true);

    const clearAuth = useCallback(() => {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
    }, []);

    const persistAuth = useCallback((nextToken, nextUser) => {
        localStorage.setItem(TOKEN_KEY, nextToken);
        setToken(nextToken);
        setUser(nextUser ?? null);
    }, []);

    const login = useCallback(async (payload) => {
        try {
            const response = await api.post('/login', payload);
            const nextToken = response?.data?.data?.token;
            const nextUser = response?.data?.data?.user ?? null;

            if (!nextToken) {
                throw new Error('Token manquant dans la réponse API.');
            }

            persistAuth(nextToken, nextUser);

            return nextUser;
        } catch (error) {
            throw normalizeApiError(error, 'Connexion impossible.');
        }
    }, [persistAuth]);

    const register = useCallback(async (payload) => {
        try {
            const response = await api.post('/register', payload);
            const nextToken = response?.data?.data?.token;
            const nextUser = response?.data?.data?.user ?? null;

            if (!nextToken) {
                throw new Error('Token manquant dans la réponse API.');
            }

            persistAuth(nextToken, nextUser);

            return nextUser;
        } catch (error) {
            throw normalizeApiError(error, 'Inscription impossible.');
        }
    }, [persistAuth]);

    const logout = useCallback(async () => {
        try {
            await api.post('/logout');
        } catch (_error) {
            // Nothing to do: local auth must always be cleared.
        } finally {
            clearAuth();
        }
    }, [clearAuth]);

    useEffect(() => {
        let active = true;

        if (!token) {
            setInitializing(false);
            return () => {
                active = false;
            };
        }

        setInitializing(true);

        api.get('/me')
            .then((response) => {
                if (!active) {
                    return;
                }

                setUser(response?.data?.data?.user ?? null);
            })
            .catch(() => {
                if (!active) {
                    return;
                }

                clearAuth();
            })
            .finally(() => {
                if (active) {
                    setInitializing(false);
                }
            });

        return () => {
            active = false;
        };
    }, [token, clearAuth]);

    const value = useMemo(() => ({
        token,
        user,
        isAuthenticated: Boolean(token),
        initializing,
        login,
        register,
        logout,
    }), [token, user, initializing, login, register, logout]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used inside AuthProvider.');
    }

    return context;
}
