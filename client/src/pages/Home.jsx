import React from 'react'
import { SpotCard } from '../components/SpotCard'
import { SpotsList } from '../components/SpotsList'

import data from '../components/spots.json'

const Home = () => {

  return (
    <>
      <div className='container'>
        <div className='content-map pt-5 h-full w-full'>
          <div className='map text-white bg-slate-600 border-2 rounded-md h-[530px]'>

          </div>


        </div>
        <div className='content-bts w-full my-8 grid justify-items-end'>
          <a href="/new-spot" type='button' className=' text-white bg-[#293038] md:text-base p-3 rounded-lg'>Nuevo Spot</a>
        </div>
        <div className='content-spots mt-8 '>
          <span className='text-white text-3xl my-2'>Spots</span>
          <SpotCard>
              {data.map(spot=>
                <SpotsList name={spot.nombre} description={spot.descripcion} img={spot.img} key={spot.id}/>
                )}
            </SpotCard>
        </div>

      </div>
    </>
  )
}

export default Home