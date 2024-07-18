import axios from 'axios'

const tasksApi = axios.create({
    baseURL: 'http://localhost:8000/api/v1/spots/',
    withCredentials: true,
    xsrfHeaderName: 'X-CSRFToken',
    xsrfCookieName: 'csrftoken'
})


export const createSpot = async (spotData) => {
    const formData = new FormData();
    for (const key in spotData) {
        formData.append(key, spotData[key]);
    }
    try {
        const response = await spotsApi.post('/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating spot:', error);
        throw error;
    }
};
  export const getSpots = async () => {
    try {
      const response = await spotsApi.get('/');
      return response.data;
    } catch (error) {
      console.error('Error fetching spots:', error);
      throw error;
    }
  };
  
  export const getSpot = async (id) => {
    try {
      const response = await spotsApi.get(`/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching spot with id ${id}:`, error);
      throw error;
    }
  };
  
  export const updateSpot = async (id, spotData) => {
    const formData = new FormData();
    for (const key in spotData) {
      formData.append(key, spotData[key]);
    }
    try {
      const response = await spotsApi.patch(`/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating spot with id ${id}:`, error);
      throw error;
    }
  };
  
export const deleteSpot = async (id) => {
    try {
        const response = await spotsApi.delete(`/${id}/`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting spot with id ${id}:`, error);
        throw error;
    }
};