import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function validateLogin(values) {
    const errors = {};

    if (!values.email.trim()) {
        errors.email = 'Email obligatoire.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'Email invalide.';
    }

    if (!values.password) {
        errors.password = 'Mot de passe obligatoire.';
    }

    return errors;
}

function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [values, setValues] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((previous) => ({ ...previous, [name]: value }));
        setErrors((previous) => ({ ...previous, [name]: '' }));
        setApiError('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const nextErrors = validateLogin(values);

        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            return;
        }

        setLoading(true);
        setApiError('');

        try {
            await login(values);
            navigate('/symptoms', { replace: true });
        } catch (error) {
            setErrors({
                email: error.fieldErrors?.email ?? '',
                password: error.fieldErrors?.password ?? '',
            });
            setApiError(error.fieldErrors?.credentials ?? error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-8">
            <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-bold text-slate-900">Connexion</h1>
                <p className="mt-1 text-sm text-slate-500">
                    Accède à ton espace Salus pour gérer tes symptômes.
                </p>

                {apiError ? (
                    <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                        {apiError}
                    </p>
                ) : null}

                <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
                    <div>
                        <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            className="block w-full rounded-md border-slate-300 text-sm shadow-sm focus:border-slate-500 focus:ring-slate-500"
                            value={values.email}
                            onChange={handleChange}
                        />
                        {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email}</p> : null}
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
                            Mot de passe
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            className="block w-full rounded-md border-slate-300 text-sm shadow-sm focus:border-slate-500 focus:ring-slate-500"
                            value={values.password}
                            onChange={handleChange}
                        />
                        {errors.password ? <p className="mt-1 text-xs text-red-600">{errors.password}</p> : null}
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={loading}
                    >
                        {loading ? 'Connexion...' : 'Se connecter'}
                    </button>
                </form>

                <p className="mt-4 text-sm text-slate-600">
                    Pas encore de compte ?{' '}
                    <Link to="/register" className="font-medium text-slate-900 underline">
                        Créer un compte
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
