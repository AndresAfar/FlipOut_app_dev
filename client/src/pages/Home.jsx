// src/pages/Home.jsx

import React, { useState, useEffect } from 'react';
import { SpotCard } from '../components/SpotCard';
import { SpotsList } from '../components/SpotsList';
import { getSpots } from '../api/spot.api';
import MapComponent from '../components/MapComponent';

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
      <div className='container mx-auto px-4'>
        <div className='content-map pt-5 h-full w-full'>
          <div className='map text-white bg-slate-600 border-2 rounded-md h-[530px]'>
            <MapComponent spots={spots} />
          </div>
        </div>
        <div className='content-bts w-full my-8 grid justify-items-end'>
          <a href="/new-spot" className='flex text-white bg-[#293038] md:text-base p-3 rounded-lg'>
            Nuevo Spot
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin-plus ml-2"><path d="M19.914 11.105A7.298 7.298 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32 32 0 0 0 .824-.738"/><circle cx="12" cy="10" r="3"/><path d="M16 18h6"/><path d="M19 15v6"/></svg>
          </a>
        </div>
        <div className='content-spots mt-8'>
          <span className='text-white text-3xl my-2'>Spots</span>
          <SpotCard>
            {spots.map(spot => (
              <SpotsList
                id={spot.id}
                name={spot.name}
                description={spot.description}
                img={spot.images.length > 0 ? spot.images[0].image_path : '/media/spots/images/default_image.jpg'}
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
