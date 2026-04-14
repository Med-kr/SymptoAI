import React, { useCallback, useEffect, useMemo, useState } from 'react';
import SymptomForm from '../components/SymptomForm';
import {
    createSymptom,
    deleteSymptom,
    listSymptoms,
    updateSymptom,
} from '../services/symptoms';

const severityBadgeClass = {
    mild: 'bg-emerald-100 text-emerald-800',
    moderate: 'bg-amber-100 text-amber-800',
    severe: 'bg-red-100 text-red-800',
};

function formatDate(dateString) {
    if (!dateString) {
        return '-';
    }

    const date = new Date(`${dateString}T00:00:00`);

    if (Number.isNaN(date.getTime())) {
        return dateString;
    }

    return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium' }).format(date);
}

function SymptomsPage() {
    const [symptoms, setSymptoms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState('');
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingSymptom, setEditingSymptom] = useState(null);
    const [formLoading, setFormLoading] = useState(false);
    const [formServerErrors, setFormServerErrors] = useState({});
    const [deletingId, setDeletingId] = useState(null);

    const loadSymptoms = useCallback(async () => {
        setLoading(true);
        setFetchError('');

        try {
            const data = await listSymptoms();
            setSymptoms(data);
        } catch (error) {
            setFetchError(error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadSymptoms();
    }, [loadSymptoms]);

    const sortedSymptoms = useMemo(() => (
        [...symptoms].sort((a, b) => b.date_recorded.localeCompare(a.date_recorded))
    ), [symptoms]);

    const openCreateForm = () => {
        setEditingSymptom(null);
        setFormServerErrors({});
        setStatus({ type: '', message: '' });
        setIsFormVisible(true);
    };

    const openEditForm = (symptom) => {
        setEditingSymptom(symptom);
        setFormServerErrors({});
        setStatus({ type: '', message: '' });
        setIsFormVisible(true);
    };

    const closeForm = () => {
        setIsFormVisible(false);
        setEditingSymptom(null);
        setFormServerErrors({});
    };

    const handleSave = async (payload) => {
        setFormLoading(true);
        setFormServerErrors({});
        setStatus({ type: '', message: '' });

        try {
            if (editingSymptom?.id) {
                await updateSymptom(editingSymptom.id, payload);
                setStatus({ type: 'success', message: 'Symptôme mis à jour avec succès.' });
            } else {
                await createSymptom(payload);
                setStatus({ type: 'success', message: 'Symptôme ajouté avec succès.' });
            }

            await loadSymptoms();
            closeForm();
        } catch (error) {
            setFormServerErrors(error.fieldErrors ?? {});
            setStatus({ type: 'error', message: error.message });
        } finally {
            setFormLoading(false);
        }
    };

    const handleDelete = async (symptom) => {
        const confirmed = window.confirm(
            `Supprimer le symptôme "${symptom.name}" ? Cette action est définitive.`,
        );

        if (!confirmed) {
            return;
        }

        setDeletingId(symptom.id);
        setStatus({ type: '', message: '' });

        try {
            await deleteSymptom(symptom.id);
            setSymptoms((previous) => previous.filter((item) => item.id !== symptom.id));
            setStatus({ type: 'success', message: 'Symptôme supprimé avec succès.' });
        } catch (error) {
            setStatus({ type: 'error', message: error.message });
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <section className="space-y-6">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Gestion des symptômes</h1>
                    <p className="text-sm text-slate-600">
                        Ajoute, modifie ou supprime tes symptômes avec validation des formulaires.
                    </p>
                </div>
                <button
                    type="button"
                    className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                    onClick={openCreateForm}
                >
                    Ajouter un symptôme
                </button>
            </div>

            {status.message ? (
                <p
                    className={`rounded-md border px-4 py-3 text-sm ${
                        status.type === 'success'
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                            : 'border-red-200 bg-red-50 text-red-700'
                    }`}
                >
                    {status.message}
                </p>
            ) : null}

            {isFormVisible ? (
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-900">
                        {editingSymptom ? 'Modifier le symptôme' : 'Nouveau symptôme'}
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">Les champs marqués * sont obligatoires.</p>
                    <div className="mt-4">
                        <SymptomForm
                            initialValues={editingSymptom}
                            serverErrors={formServerErrors}
                            onSubmit={handleSave}
                            onCancel={closeForm}
                            loading={formLoading}
                            submitLabel={editingSymptom ? 'Mettre à jour' : 'Créer'}
                        />
                    </div>
                </div>
            ) : null}

            {loading ? (
                <p className="rounded-md border border-slate-200 bg-white px-4 py-6 text-sm text-slate-600">
                    Chargement des symptômes...
                </p>
            ) : null}

            {!loading && fetchError ? (
                <div className="rounded-md border border-red-200 bg-red-50 p-4">
                    <p className="text-sm text-red-700">{fetchError}</p>
                    <button
                        type="button"
                        className="mt-3 rounded-md border border-red-300 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
                        onClick={loadSymptoms}
                    >
                        Réessayer
                    </button>
                </div>
            ) : null}

            {!loading && !fetchError && sortedSymptoms.length === 0 ? (
                <p className="rounded-md border border-slate-200 bg-white px-4 py-6 text-sm text-slate-600">
                    Aucun symptôme pour le moment.
                </p>
            ) : null}

            {!loading && !fetchError && sortedSymptoms.length > 0 ? (
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Nom
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Gravité
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Date
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Description
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Notes
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {sortedSymptoms.map((symptom) => (
                                    <tr key={symptom.id}>
                                        <td className="px-4 py-3 text-sm font-medium text-slate-800">
                                            {symptom.name}
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <span
                                                className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                                    severityBadgeClass[symptom.severity] ?? 'bg-slate-100 text-slate-700'
                                                }`}
                                            >
                                                {symptom.severity}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-slate-700">
                                            {formatDate(symptom.date_recorded)}
                                        </td>
                                        <td className="max-w-xs truncate px-4 py-3 text-sm text-slate-700">
                                            {symptom.description || '-'}
                                        </td>
                                        <td className="max-w-xs truncate px-4 py-3 text-sm text-slate-700">
                                            {symptom.note || '-'}
                                        </td>
                                        <td className="px-4 py-3 text-right text-sm">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    type="button"
                                                    className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
                                                    onClick={() => openEditForm(symptom)}
                                                >
                                                    Modifier
                                                </button>
                                                <button
                                                    type="button"
                                                    className="rounded-md border border-red-300 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100 disabled:opacity-60"
                                                    onClick={() => handleDelete(symptom)}
                                                    disabled={deletingId === symptom.id}
                                                >
                                                    {deletingId === symptom.id ? 'Suppression...' : 'Supprimer'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : null}
        </section>
    );
}

export default SymptomsPage;
