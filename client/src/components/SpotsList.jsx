import React from 'react';

const SpotsList = ({ id, name, description, img }) => {
  return (
    <div className="cursor-pointer w-full sm:mx-6 md:mx-4 lg:mx-0 hover:bg-gray-950/70 hover:-translate-y-2 duration-300 hover:shadow-lg rounded" key={id}>
      <a href="">
        <figure>
          <a href="" target="_blank">
            <img className="rounded-t-lg h-36 w-full aspect-auto" src={img} alt={name} loading="lazy"/>
          </a>
          <figcaption className="py-4 px-2 block text-white text-pretty">
            <h1 className="mb-4 font-bold">{name}</h1>
            <p className="text-sm text-pretty">{description}</p>
          </figcaption>
        </figure>
      </a>
    </div>
  );
};

export { SpotsList };
