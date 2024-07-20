import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ spots }) => {
  return (
    <MapContainer center={[4.754731743966792, -74.11157140094889]} zoom={13} className="h-full w-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {spots.map((spot) => {
        const [lat, lng] = spot.geocode.split(',').map(Number);
        return (
          <Marker key={spot.id} position={[lat, lng]}>
            <Popup>
              <strong>{spot.name}</strong>
              <br />
              {spot.description}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapComponent;
