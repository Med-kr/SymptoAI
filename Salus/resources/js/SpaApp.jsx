import React, { useState } from 'react';
import { Link, Navigate, NavLink, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SymptomsPage from './pages/SymptomsPage';
import ProtectedRoute from './routes/ProtectedRoute';
import { useAuth } from './context/AuthContext';

function AppShell() {
    const { user, logout } = useAuth();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        setIsLoggingOut(true);

        try {
            await logout();
        } finally {
            setIsLoggingOut(false);
            navigate('/login', { replace: true });
        }
    };

    return (
        <div className="min-h-screen bg-slate-100">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
                    <div>
                        <Link to="/symptoms" className="text-xl font-bold text-slate-900">
                            Salus
                        </Link>
                        <p className="text-xs text-slate-500">AI Health Assistant</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <nav>
                            <NavLink
                                to="/symptoms"
                                className={({ isActive }) =>
                                    `rounded-md px-3 py-2 text-sm font-medium ${
                                        isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-200'
                                    }`
                                }
                            >
                                Symptômes
                            </NavLink>
                        </nav>
                        <div className="hidden text-right sm:block">
                            <p className="text-sm font-medium text-slate-800">{user?.name ?? 'Utilisateur'}</p>
                            <p className="text-xs text-slate-500">{user?.email ?? ''}</p>
                        </div>
                        <button
                            type="button"
                            className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                        >
                            {isLoggingOut ? 'Déconnexion...' : 'Déconnexion'}
                        </button>
                    </div>
                </div>
            </header>

            <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
                <Outlet />
            </main>
        </div>
    );
}

function App() {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            <Route
                path="/"
                element={<Navigate to={isAuthenticated ? '/symptoms' : '/login'} replace />}
            />
            <Route
                path="/login"
                element={isAuthenticated ? <Navigate to="/symptoms" replace /> : <LoginPage />}
            />
            <Route
                path="/register"
                element={isAuthenticated ? <Navigate to="/symptoms" replace /> : <RegisterPage />}
            />

            <Route
                element={(
                    <ProtectedRoute>
                        <AppShell />
                    </ProtectedRoute>
                )}
            >
                <Route path="/symptoms" element={<SymptomsPage />} />
            </Route>

            <Route
                path="*"
                element={<Navigate to={isAuthenticated ? '/symptoms' : '/login'} replace />}
            />
        </Routes>
    );
}

export default App;
