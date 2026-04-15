import api from './api';
import { normalizeApiError } from './errors';

export const severityOptions = [
    { value: 'mild', label: 'Mild' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'severe', label: 'Severe' },
];

function normalizeSymptom(symptom) {
    return {
        id: symptom?.id ?? null,
        name: symptom?.name ?? '',
        severity: symptom?.severity ?? 'mild',
        description: symptom?.description ?? '',
        date_recorded: symptom?.date_recorded ?? '',
        note: symptom?.note ?? symptom?.notes ?? '',
    };
}

export async function listSymptoms() {
    try {
        const response = await api.get('/symptoms');
        const symptoms = response?.data?.data?.symptoms;

        if (!Array.isArray(symptoms)) {
            return [];
        }

        return symptoms.map(normalizeSymptom);
    } catch (error) {
        throw normalizeApiError(error, 'Impossible de charger les symptômes.');
    }
}

export async function createSymptom(payload) {
    try {
        const response = await api.post('/symptoms', payload);
        return normalizeSymptom(response?.data?.data?.symptom ?? payload);
    } catch (error) {
        throw normalizeApiError(error, 'Impossible de créer le symptôme.');
    }
}

export async function updateSymptom(id, payload) {
    try {
        const response = await api.put(`/symptoms/${id}`, payload);
        return normalizeSymptom(response?.data?.data?.symptom ?? payload);
    } catch (error) {
        throw normalizeApiError(error, 'Impossible de modifier le symptôme.');
    }
}

export async function deleteSymptom(id) {
    try {
        await api.delete(`/symptoms/${id}`);
    } catch (error) {
        throw normalizeApiError(error, 'Impossible de supprimer le symptôme.');
    }
}
