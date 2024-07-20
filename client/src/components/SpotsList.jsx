import React from 'react';

const SpotsList = ({ id, name, description, img }) => {
  const imageURL = img.startsWith('http') ? img : `http://localhost:8000${img}`;

  return (
    <div className="w-full p-4 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4">
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
        <a href="">
          <figure>
            <a href="" target="_blank">
              <img className="h-48 w-full object-cover" src={imageURL} alt={name} loading="lazy"/>
            </a>
            <figcaption className="p-4 text-white">
              <h1 className="mb-2 font-bold text-lg">{name}</h1>
              <p className="text-sm">{description}</p>
            </figcaption>
          </figure>
        </a>
      </div>
    </div>
  );
};

export { SpotsList };
