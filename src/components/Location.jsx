'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';

// Dynamically import the map component to prevent SSR issues
const MapWithLocation = dynamic(() => import('./MapWithLocation'), { ssr: false });

const Location = ({ location }) => {
  return (
    <div className="w-full h-full bg-gray-50 p-6 ">
      {/* Page Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">{location.name}</h1>
        <p className="text-lg text-gray-600 mt-2">
          Discover how to get to {location.name} and explore nearby attractions.
        </p>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Map Section */}
        <div className="h-96 lg:h-full relative">
          <MapWithLocation location={location} />
        </div>

        {/* Location Details Section */}
        <div className="flex flex-col gap-3">
          {/* Address */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Address</h2>
            <p className="text-gray-600 mt-2">{location.address}</p>
          </div>

          {/* Transportation Options */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">How to Get There</h2>
            <ul className="list-disc pl-5 text-gray-600 space-y-2 mt-2">
              {location.transportation.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          </div>

          {/* Nearby Places */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Nearby Attractions</h2>
            <ul className="list-disc pl-5 text-gray-600 space-y-2 mt-2">
              {location.nearbyPlaces.map((place, index) => (
                <li key={index}>{place}</li>
              ))}
            </ul>
          </div>
          {/* googel map */}
          <div>
            <a
              href={`https://www.google.co.in/maps/place/${location.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-[#364657] text-white font-bold rounded-lg shadow-md hover:bg-blue-800 transition duration-200"
            >
               Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
