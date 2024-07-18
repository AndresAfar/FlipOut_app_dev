import React from 'react'
import axios from 'axios'

import data from './spots.json';
import { SpotsList } from './SpotsList';

const SpotCard = (props) => {

  return (
    <div className='spots__section mt-6 justify-items-center grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
        {props.children}
    </div>
  )
}
export {SpotCard}
