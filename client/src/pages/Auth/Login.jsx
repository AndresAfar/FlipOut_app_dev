import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, getCSRFToken } from '../../api/users.api';

export const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getCSRFToken().catch(error => console.error('Error al obtener el token CSRF:', error));
  }, []);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await loginUser(credentials);
      console.log('Login exitoso:', response.data);
      navigate('/');
    } catch (err) {
      console.error('Error en el login:', err);
      if (err.response) {
        // El servidor respondió con un estado fuera del rango de 2xx
        setError(err.response.data.detail || 'Error en el inicio de sesión. Inténtalo de nuevo.');
      } else if (err.request) {
        // La petición fue hecha pero no se recibió respuesta
        setError('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
      } else {
        // Algo sucedió al configurar la petición que provocó un error
        setError('Error al procesar la solicitud. Inténtalo de nuevo.');
      }
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Iniciar Sesión</h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Correo Electrónico:</label>
            <input id="email" name="email" type="email" value={credentials.email} onChange={handleChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Contraseña:</label>
            <input id="password" name="password" type="password" value={credentials.password} onChange={handleChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
          <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Iniciar Sesión</button>
          {error && <p>{error}</p>}
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">¿No tiene cuenta? <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Registrarse</a></p>
      </div>
    </div>
  );
};
