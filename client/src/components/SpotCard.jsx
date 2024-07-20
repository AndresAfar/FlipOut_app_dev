import React from 'react';

const SpotCard = ({ children }) => {
  return (
    <div className='flex flex-wrap -mx-4 mt-6'>
      {children}
    </div>
  );
};

export { SpotCard };
