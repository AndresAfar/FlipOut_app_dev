import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    xsrfHeaderName: 'X-CSRFToken',
    xsrfCookieName: 'csrftoken',
});


// Función para obtener el valor de una cookie
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// Añadir un interceptor para incluir el token CSRF en cada solicitud
axiosInstance.interceptors.request.use(function (config) {
    config.headers['X-CSRFToken'] = getCookie('csrftoken');
    return config;
});

export const createUser = (userData) => axiosInstance.post('register/', userData);
export const loginUser = (credentials) => axiosInstance.post('login/', credentials);
export const logoutUser = () => axiosInstance.post('logout/');

// Añade una función para obtener el token CSRF
export const getCSRFToken = () => axiosInstance.get('get-csrf-token/');


/*
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
};*/