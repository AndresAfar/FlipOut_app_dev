import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

export const register = async (userData) => {
  const formData = new FormData();
  for (const key in userData) {
    formData.append(key, userData[key]);
  }
  return axios.post(`${API_URL}register/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const login = async (email, password) => {
  return axios.post(`${API_URL}login/`, { email, password });
};

export const logout = async () => {
  return axios.post(`${API_URL}logout/`);
};

export const getUserProfile = async () => {
  return axios.get(`${API_URL}user/`);
};

export const updateUserProfile = async (userData) => {
  const formData = new FormData();
  for (const key in userData) {
    formData.append(key, userData[key]);
  }
  return axios.patch(`${API_URL}user/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};