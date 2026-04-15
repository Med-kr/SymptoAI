import React, { useEffect, useMemo, useState } from 'react';
import { severityOptions } from '../services/symptoms';

const MAX_DESCRIPTION_LENGTH = 5000;
const MAX_NOTE_LENGTH = 5000;

function getTodayDateString() {
    return new Date().toISOString().slice(0, 10);
}

function normalizeValues(values) {
    return {
        name: values?.name ?? '',
        severity: values?.severity ?? 'mild',
        description: values?.description ?? '',
        date_recorded: values?.date_recorded ?? getTodayDateString(),
        note: values?.note ?? values?.notes ?? '',
    };
}

function validate(values) {
    const errors = {};
    const today = getTodayDateString();
    const allowedSeverities = severityOptions.map((option) => option.value);

    if (!values.name.trim()) {
        errors.name = 'Le nom du symptôme est obligatoire.';
    }

    if (!allowedSeverities.includes(values.severity)) {
        errors.severity = 'Veuillez sélectionner une gravité valide.';
    }

    if (!values.date_recorded) {
        errors.date_recorded = 'La date est obligatoire.';
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(values.date_recorded)) {
        errors.date_recorded = 'Le format de date attendu est YYYY-MM-DD.';
    } else if (values.date_recorded > today) {
        errors.date_recorded = 'La date ne peut pas être dans le futur.';
    }

    if (values.description.length > MAX_DESCRIPTION_LENGTH) {
        errors.description = `La description ne doit pas dépasser ${MAX_DESCRIPTION_LENGTH} caractères.`;
    }

    if (values.note.length > MAX_NOTE_LENGTH) {
        errors.note = `La note ne doit pas dépasser ${MAX_NOTE_LENGTH} caractères.`;
    }

    return errors;
}

function SymptomForm({
    initialValues,
    serverErrors = {},
    onSubmit,
    onCancel,
    loading = false,
    submitLabel = 'Enregistrer',
}) {
    const [values, setValues] = useState(() => normalizeValues(initialValues));
    const [clientErrors, setClientErrors] = useState({});

    useEffect(() => {
        setValues(normalizeValues(initialValues));
        setClientErrors({});
    }, [initialValues]);

    const mergedErrors = useMemo(() => ({ ...serverErrors, ...clientErrors }), [serverErrors, clientErrors]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setValues((previous) => ({ ...previous, [name]: value }));
        setClientErrors((previous) => ({ ...previous, [name]: '' }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const nextErrors = validate(values);

        setClientErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            return;
        }

        const payload = {
            name: values.name.trim(),
            severity: values.severity,
            description: values.description.trim(),
            date_recorded: values.date_recorded,
            note: values.note.trim(),
        };

        await onSubmit(payload);
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
                    Nom du symptôme *
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    className="block w-full rounded-md border-slate-300 text-sm shadow-sm focus:border-slate-500 focus:ring-slate-500"
                    value={values.name}
                    onChange={handleChange}
                />
                {mergedErrors.name ? <p className="mt-1 text-xs text-red-600">{mergedErrors.name}</p> : null}
            </div>

            <div>
                <label htmlFor="severity" className="mb-1 block text-sm font-medium text-slate-700">
                    Gravité *
                </label>
                <select
                    id="severity"
                    name="severity"
                    className="block w-full rounded-md border-slate-300 text-sm shadow-sm focus:border-slate-500 focus:ring-slate-500"
                    value={values.severity}
                    onChange={handleChange}
                >
                    {severityOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {mergedErrors.severity ? <p className="mt-1 text-xs text-red-600">{mergedErrors.severity}</p> : null}
            </div>

            <div>
                <label htmlFor="date_recorded" className="mb-1 block text-sm font-medium text-slate-700">
                    Date du symptôme *
                </label>
                <input
                    id="date_recorded"
                    name="date_recorded"
                    type="date"
                    className="block w-full rounded-md border-slate-300 text-sm shadow-sm focus:border-slate-500 focus:ring-slate-500"
                    value={values.date_recorded}
                    onChange={handleChange}
                />
                {mergedErrors.date_recorded ? (
                    <p className="mt-1 text-xs text-red-600">{mergedErrors.date_recorded}</p>
                ) : null}
            </div>

            <div>
                <label htmlFor="description" className="mb-1 block text-sm font-medium text-slate-700">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="block w-full rounded-md border-slate-300 text-sm shadow-sm focus:border-slate-500 focus:ring-slate-500"
                    value={values.description}
                    onChange={handleChange}
                />
                <p className="mt-1 text-xs text-slate-500">{values.description.length}/{MAX_DESCRIPTION_LENGTH}</p>
                {mergedErrors.description ? (
                    <p className="mt-1 text-xs text-red-600">{mergedErrors.description}</p>
                ) : null}
            </div>

            <div>
                <label htmlFor="note" className="mb-1 block text-sm font-medium text-slate-700">
                    Notes
                </label>
                <textarea
                    id="note"
                    name="note"
                    rows={3}
                    className="block w-full rounded-md border-slate-300 text-sm shadow-sm focus:border-slate-500 focus:ring-slate-500"
                    value={values.note}
                    onChange={handleChange}
                />
                <p className="mt-1 text-xs text-slate-500">{values.note.length}/{MAX_NOTE_LENGTH}</p>
                {mergedErrors.note ? <p className="mt-1 text-xs text-red-600">{mergedErrors.note}</p> : null}
            </div>

            <div className="flex flex-wrap justify-end gap-3 pt-2">
                {onCancel ? (
                    <button
                        type="button"
                        className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-60"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Annuler
                    </button>
                ) : null}
                <button
                    type="submit"
                    className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={loading}
                >
                    {loading ? 'Enregistrement...' : submitLabel}
                </button>
            </div>
        </form>
    );
}

export default SymptomForm;
