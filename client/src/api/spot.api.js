import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1/spots/';

const spotsApi = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    xsrfHeaderName: 'X-CSRFToken',
    xsrfCookieName: 'csrftoken'
});

const createFormData = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
            formData.append(key, value);
        }
    });
    return formData;
};

const handleApiError = (error, operation) => {
    console.error(`Error ${operation}:`, error.response ? error.response.data : error.message);
    throw error;
};

export const createSpot = async (spotData) => {
    try {
        const formData = createFormData(spotData);
        const response = await spotsApi.post('', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        handleApiError(error, 'creating spot');
    }
};

export const getSpots = async () => {
    try {
        const response = await spotsApi.get('');
        return response.data;
    } catch (error) {
        handleApiError(error, 'fetching spots');
    }
};

export const getSpot = async (id) => {
    try {
        const response = await spotsApi.get(`${id}/`);
        return response.data;
    } catch (error) {
        handleApiError(error, `fetching spot with id ${id}`);
    }
};

export const updateSpot = async (id, spotData) => {
    try {
        const formData = createFormData(spotData);
        const response = await spotsApi.patch(`${id}/`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        handleApiError(error, `updating spot with id ${id}`);
    }
};

export const deleteSpot = async (id) => {
    try {
        const response = await spotsApi.delete(`${id}/`);
        return response.data;
    } catch (error) {
        handleApiError(error, `deleting spot with id ${id}`);
    }
};
