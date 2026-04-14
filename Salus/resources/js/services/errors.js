export function normalizeApiError(error, fallbackMessage = 'Une erreur est survenue.') {
    const response = error?.response;
    const data = response?.data ?? {};
    const fieldErrors = {};

    if (data?.errors && typeof data.errors === 'object') {
        Object.entries(data.errors).forEach(([field, messages]) => {
            if (Array.isArray(messages) && messages.length > 0) {
                [fieldErrors[field]] = messages;
                return;
            }

            if (typeof messages === 'string') {
                fieldErrors[field] = messages;
            }
        });
    }

    if (Array.isArray(data?.credentials) && data.credentials.length > 0) {
        fieldErrors.credentials = data.credentials[0];
    }

    return {
        status: response?.status ?? null,
        message: data?.message ?? data?.messgae ?? fallbackMessage,
        fieldErrors,
        raw: error,
    };
}
