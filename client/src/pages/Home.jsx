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
          <a href="/new-spot" className='text-white bg-[#293038] md:text-base p-3 rounded-lg'>
            Nuevo Spot
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
