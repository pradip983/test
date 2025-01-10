'use client';
import React, { useState, useEffect } from 'react';

function ChooseDestination() {
  const [cdestinations, setCDestinations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchCDestinations = async () => {
      const response = await fetch('/api/cdestination');
      console.log(response);
      const data = await response.json();
      setCDestinations(data);
    };

    fetchCDestinations();
  }, []);

  const filteredDestinations = selectedCategory
    ? cdestinations.filter((destination) => destination.category === selectedCategory)
    : cdestinations;

  return (
    <>
      <div className="w-full h-[55vh] grid">
        <div className="w-[80%] h-[50vh] m-auto grid place-content-evenly">
          <h1 className="text-black text-4xl font-bold font-sans pb-1">Quick and easy trip planner</h1>
          <h2 className="text-black text-2xl font-sans pb-7">
            Pick a vibe and explore the top destinations in India
          </h2>

          {/* Category Buttons */}
          <div className="flex space-x-4 mb-8">
            {[
              { category: 'Beach', icon: '/beach.svg', label: 'Beach' },
              { category: 'Outdoor', icon: '/outdoor.svg', label: 'Outdoor' },
              { category: 'Romance', icon: '/romence.svg', label: 'Romance' },
              { category: 'City', icon: 'city.svg', label: 'City' },
            ].map(({ category, icon, label }) => (
              <button
                key={category}
                className={`flex justify-center items-center gap-4 px-5 py-3 text-black border border-solid rounded-full 
                ${selectedCategory === category ? 'bg-blue-500 text-white' : 'border-blue-500'}`}
                onClick={() => setSelectedCategory(category)}>
                <div>
                  <img src={icon} alt={label} />
                </div>
                <div>{label}</div>
              </button>
            ))}
          </div>

          {/* Scrollable Cards Section */}
          <div className="w-full h-[30vh] overflow-hidden overflow-x-scroll hide-scrollbar flex space-x-4 px-4">
            {filteredDestinations.map((cdestination) => (
              <div
                key={cdestination._id}
                className="min-w-[250px] bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
                <img
                  src={cdestination.image}
                  className="w-full h-48 object-cover"
                  alt={cdestination.name}
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-800">{cdestination.name}</h2>
                  <p className="mt-2 text-gray-600">Welcome to {cdestination.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ChooseDestination;
