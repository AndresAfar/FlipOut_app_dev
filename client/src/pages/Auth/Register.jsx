import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
    const navigate = useNavigate();
  // Estado para el formulario y errores
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    gender: '',
    bio: '',
    city: '',
    country: '',
    profile_picture: null,
    password: '',
    password2: '',
  });

  const [errors, setErrors] = useState(null);

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'profile_picture' ? files[0] : value,
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      setErrors('Las contraseñas no coinciden.');
      return;
    }

    // Crea un objeto FormData para enviar los datos
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    try {
      // Envía una solicitud POST al backend
      const response = await axios.post('http://localhost:8000/api/register/', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Registro exitoso:', response.data);
      // Maneja la respuesta, redirige al usuario, etc.
      // Redirigir al login
      navigate('/login');
    } catch (error) {
      console.error('Error en el registro:', error.response ? error.response.data : error.message);
      setErrors('Error en el registro.');
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8000/api/login/', { email, password });
      // Guardar el token en el almacenamiento local
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error('Error en el inicio de sesión:', error.response ? error.response.data : error.message);
      setErrors('Error en el inicio de sesión.');
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Registro</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* Nombre */}
            <div className="sm:col-span-3">
              <label htmlFor="first_name" className="block text-sm font-medium leading-6 text-gray-900">Nombre:</label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Apellido */}
            <div className="sm:col-span-3">
              <label htmlFor="last_name" className="block text-sm font-medium leading-6 text-gray-900">Apellido:</label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last_name"
                  id="lastName"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Correo Electrónico */}
            <div className="sm:col-span-full">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Correo Electrónico:</label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Teléfono */}
            <div className="sm:col-span-3">
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Teléfono:</label>
              <div className="mt-2">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Género */}
            <div className="sm:col-span-3">
              <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">Género:</label>
              <div className="mt-2">
                <select
                  name="gender"
                  id="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="">Selecciona un género</option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                </select>
              </div>
            </div>

            {/* Descripción */}
            <div className="col-span-full">
              <label htmlFor="bio" className="block text-sm font-medium leading-6 text-gray-900">Descripción:</label>
              <div className="mt-2">
                <textarea
                  name="bio"
                  id="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Ciudad */}
            <div className="sm:col-span-3">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">Ciudad:</label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* País */}
            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">País:</label>
              <div className="mt-2">
                <input
                  type="text"
                  name="country"
                  id="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Foto de Perfil */}
            <div className="sm:col-span-3">
              <label htmlFor="profile_picture" className="block text-sm font-medium leading-6 text-gray-900">Foto de Perfil:</label>
              <div className="mt-2">
                <input
                  type="file"
                  name="profile_picture"
                  id="profile_picture"
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Contraseña */}
            <div className="col-span-full">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Contraseña:</label>
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Confirmar Contraseña */}
            <div className="col-span-full">
              <label htmlFor="password2" className="block text-sm font-medium leading-6 text-gray-900">Confirmar Contraseña:</label>
              <div className="mt-2">
                <input
                  type="password"
                  name="password2"
                  id="password2"
                  value={formData.password2}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          {/* Botón de Envío */}
          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Registrarse</button>
          </div>

          {/* Mostrar errores */}
          {errors && <p className="text-red-600">{errors}</p>}
        </form>
      </div>
    </div>
  );
};
