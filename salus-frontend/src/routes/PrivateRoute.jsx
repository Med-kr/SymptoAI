import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function PrivateRoute({ children }) {
    const { user, loading } = useUser();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-lg">
                Chargement...
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}