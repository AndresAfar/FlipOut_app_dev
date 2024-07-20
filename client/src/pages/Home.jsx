import React, { useState, useEffect } from 'react';
import { SpotCard } from '../components/SpotCard';
import { SpotsList } from '../components/SpotsList';
import { getSpots } from '../api/spot.api'; // Asegúrate de que este es el camino correcto para importar getSpots

const Home = () => {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const data = await getSpots();
        setSpots(data);
      } catch (error) {
        console.error('Error fetching spots:', error);
      }
    };

    fetchSpots();
  }, []);

  return (
    <>
      <div className='container'>
        <div className='content-map pt-5 h-full w-full'>
          <div className='map text-white bg-slate-600 border-2 rounded-md h-[530px]'>
            {/* Aquí va el componente del mapa */}
          </div>
        </div>
        <div className='content-bts w-full my-8 grid justify-items-end'>
          <a href="/new-spot" className='text-white bg-[#293038] md:text-base p-3 rounded-lg'>
            Nuevo Spot
          </a>
        </div>
        <div className='content-spots mt-8'>
          <span className='text-white text-3xl my-2'>Spots</span>
          <SpotCard>
            {spots.map(spot => (
              <SpotsList
                name={spot.name}
                description={spot.description}
                img={spot.images.length > 0 ? spot.images[0].image_path : 'default_image.jpg'} // Reemplaza 'default_image.jpg' con una imagen por defecto si no hay imágenes
                key={spot.id}
              />
            ))}
          </SpotCard>
        </div>
      </div>
    </>
  );
};

export default Home;
