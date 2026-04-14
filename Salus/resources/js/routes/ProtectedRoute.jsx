import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
    const { isAuthenticated, initializing } = useAuth();

    if (initializing) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-100">
                <p className="rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
                    Vérification de la session...
                </p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
