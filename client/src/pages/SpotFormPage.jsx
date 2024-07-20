import React, { useState, useEffect } from 'react';
import { createSpot, updateSpot } from '../api/spot.api';

import { useNavigate } from 'react-router-dom';

export const SpotFormPage = ({ existingSpot = null }) => {

  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    geocode: '',
    type: '',
    difficulty: '',
    image: null
  });

  useEffect(() => {
    if (existingSpot) {
      setFormData({
        name: existingSpot.name,
        description: existingSpot.description,
        location: existingSpot.location,
        geocode: existingSpot.geocode,
        type: existingSpot.type,
        difficulty: existingSpot.difficulty,
        image: null
      });
    }
  }, [existingSpot]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      latitude: 0,  // Asignar valor adecuado o capturar del usuario
      longitude: 0  // Asignar valor adecuado o capturar del usuario
    };
    try {
      if (existingSpot) {
        await updateSpot(existingSpot.id, data);
        console.log('Spot updated:', existingSpot.id);
      } else {
        await createSpot(data);
        console.log('Spot created');
        navigate('/');
      }
    } catch (error) {
      console.error('Error submitting spot:', error);
    }
  };

  return (
    <div className='container mx-auto pt-32'>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-sm mx-auto p-5">
        <InputField
          label="Nombre"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextAreaField
          label="Descripción"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <InputField
          label="Ubicación"
          name="location"
          type="text"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <InputField
          label="GeoCode"
          name="geocode"
          type="text"
          value={formData.geocode}
          onChange={handleChange}
          required
        />
        <InputField
          label="Tipo"
          name="type"
          type="text"
          value={formData.type}
          onChange={handleChange}
          required
        />
        <InputField
          label="Dificultad"
          name="difficulty"
          type="text"
          value={formData.difficulty}
          onChange={handleChange}
          required
        />
        <FileInputField
          label="Imagen"
          name="image"
          onChange={handleFileChange}
          required
        />
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {existingSpot ? 'Actualizar Spot' : 'Crear Spot'}
          </button>
        </div>
      </form>
    </div>
  );
};

const InputField = ({ label, name, type, value, onChange, required }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-200">{label}</label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      required={required}
    />
  </div>
);

const TextAreaField = ({ label, name, value, onChange, required }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-200">{label}</label>
    <textarea
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      required={required}
    ></textarea>
  </div>
);

const FileInputField = ({ label, name, onChange, required }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-200">{label}</label>
    <input
      type="file"
      name={name}
      id={name}
      onChange={onChange}
      className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
      required={required}
    />
  </div>
);
