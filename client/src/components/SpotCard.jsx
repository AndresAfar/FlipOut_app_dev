import React from 'react';

const SpotCard = ({ children }) => {
  return (
    <div className='spots__section mt-6 justify-items-center grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
      {children}
    </div>
  );
};

export { SpotCard };
