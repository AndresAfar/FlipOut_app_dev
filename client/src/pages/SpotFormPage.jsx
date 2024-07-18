import React, { useState } from 'react';
import { createSpot, updateSpot } from '../api/spot.api';

export const SpotFormPage = ({ existingSpot = null }) => {
  const [formData, setFormData] = useState({
    name: existingSpot ? existingSpot.name : '',
    description: existingSpot ? existingSpot.description : '',
    location: existingSpot ? existingSpot.location : '',
    type: existingSpot ? existingSpot.type : '',
    difficulty: existingSpot ? existingSpot.difficulty : '',
    image: null
  });

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
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      if (existingSpot) {
        await updateSpot(existingSpot.id, data);
        console.log('Spot updated:', existingSpot.id);
      } else {
        await createSpot(data);
        console.log('Spot created');
      }
    } catch (error) {
      console.error('Error submitting spot:', error);
    }
  };

  return (
    <>
      <div className='container mx-auto pt-32'>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-sm mx-auto p-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-200">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-200">
              Descripción
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-200">
              Ubicación
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={formData.location}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-200">
              Tipo
            </label>
            <input
              type="text"
              name="type"
              id="type"
              value={formData.type}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />
          </div>
          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-200">
              Dificultad
            </label>
            <input
              type="text"
              name="difficulty"
              id="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-200">
              Imagen
            </label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              required
            />
          </div>
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
    </>
  );
};
