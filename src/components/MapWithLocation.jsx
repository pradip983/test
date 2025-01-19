'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

// Fix the marker icon issue


const LocateUserButton = ({ locationIcon }) => {
  const map = useMap();

  const locateUser = () => {
    map.locate({ setView: true, maxZoom: 16 });
    map.on('locationfound', (e) => {
      L.marker(e.latlng, { icon: locationIcon })
        .addTo(map)
        .bindPopup('You are here!')
        .openPopup();
    });
  };

  return (
    <button
      onClick={locateUser}
      className="p-2 bg-[#364657] text-white rounded-lg shadow-md hover:bg-blue-800 absolute top-4 right-2 z-[1000]"
    >
      Locate Me
    </button>
  );
};

const SearchBar = () => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      style: 'button',
    });

    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, [map]);

  return null;
};

const MapWithLocation = ({ location }) => {
  // Custom location icon
  const locationIcon = L.icon({
    iconUrl: '/marker-icon.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <MapContainer
      center={[location.latitude, location.longitude]}
      zoom={10}
      scrollWheelZoom={true}
      className="w-full h-full rounded-lg shadow-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[location.latitude, location.longitude]} icon={locationIcon}>
        <Popup>{location.name}</Popup>
      </Marker>
      <LocateUserButton locationIcon={locationIcon} />
      <SearchBar />
    </MapContainer>
  );
};

export default MapWithLocation;
