import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function validateRegister(values) {
    const errors = {};

    if (!values.name.trim()) {
        errors.name = 'Nom obligatoire.';
    }

    if (!values.email.trim()) {
        errors.email = 'Email obligatoire.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'Email invalide.';
    }

    if (!values.password) {
        errors.password = 'Mot de passe obligatoire.';
    } else if (values.password.length < 6) {
        errors.password = 'Le mot de passe doit contenir au moins 6 caractères.';
    }

    if (!values.password_confirmation) {
        errors.password_confirmation = 'Confirmation obligatoire.';
    } else if (values.password !== values.password_confirmation) {
        errors.password_confirmation = 'Les mots de passe ne correspondent pas.';
    }

    return errors;
}

function RegisterPage() {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
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
        const nextErrors = validateRegister(values);

        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            return;
        }

        setLoading(true);
        setApiError('');

        try {
            await register(values);
            navigate('/symptoms', { replace: true });
        } catch (error) {
            setErrors({
                name: error.fieldErrors?.name ?? '',
                email: error.fieldErrors?.email ?? '',
                password: error.fieldErrors?.password ?? '',
                password_confirmation: error.fieldErrors?.password_confirmation ?? '',
            });
            setApiError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-8">
            <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-bold text-slate-900">Inscription</h1>
                <p className="mt-1 text-sm text-slate-500">
                    Crée ton compte pour gérer tes données de santé.
                </p>

                {apiError ? (
                    <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                        {apiError}
                    </p>
                ) : null}

                <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
                    <div>
                        <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
                            Nom
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            className="block w-full rounded-md border-slate-300 text-sm shadow-sm focus:border-slate-500 focus:ring-slate-500"
                            value={values.name}
                            onChange={handleChange}
                        />
                        {errors.name ? <p className="mt-1 text-xs text-red-600">{errors.name}</p> : null}
                    </div>

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
                            autoComplete="new-password"
                            className="block w-full rounded-md border-slate-300 text-sm shadow-sm focus:border-slate-500 focus:ring-slate-500"
                            value={values.password}
                            onChange={handleChange}
                        />
                        {errors.password ? <p className="mt-1 text-xs text-red-600">{errors.password}</p> : null}
                    </div>

                    <div>
                        <label htmlFor="password_confirmation" className="mb-1 block text-sm font-medium text-slate-700">
                            Confirmation mot de passe
                        </label>
                        <input
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            autoComplete="new-password"
                            className="block w-full rounded-md border-slate-300 text-sm shadow-sm focus:border-slate-500 focus:ring-slate-500"
                            value={values.password_confirmation}
                            onChange={handleChange}
                        />
                        {errors.password_confirmation ? (
                            <p className="mt-1 text-xs text-red-600">{errors.password_confirmation}</p>
                        ) : null}
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={loading}
                    >
                        {loading ? 'Création...' : 'Créer le compte'}
                    </button>
                </form>

                <p className="mt-4 text-sm text-slate-600">
                    Déjà inscrit ?{' '}
                    <Link to="/login" className="font-medium text-slate-900 underline">
                        Se connecter
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;
