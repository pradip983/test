'use client'
import React, { useState } from 'react';
function ChooseDestination() {
  const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category

  // Sample data for the cards
  const destinations = [
    { name: 'New Delhi', category: 'City', image: '/684765.jpg' },
    { name: 'Mumbai', category: 'City', image: '/684765.jpg' },
    { name: 'Bangalore', category: 'City', image: '/684765.jpg' },
    { name: 'Goa Beach', category: 'Beach', image: '/684765.jpg' },
    { name: 'Kerala', category: 'Beach', image: '/684765.jpg' },
    { name: 'Manali', category: 'Outdoor', image: '/684765.jpg' },
    { name: 'Rishikesh', category: 'Outdoor', image: '/684765.jpg' },
    { name: 'Kashmir', category: 'Romance', image: '/684765.jpg' },
    { name: 'Udaipur', category: 'Romance', image: '/684765.jpg' },
    { name: 'Darjeeling', category: 'Romance', image: '/684765.jpg' }
  ];

  // Filtered destinations based on selected category
  const filteredDestinations = selectedCategory
    ? destinations.filter(destination => destination.category === selectedCategory)
    : destinations;

  return (
    <>
      <div className="w-full h-[55vh] grid ">
        <div className="w-[80%] h-[50vh] m-auto  grid place-content-evenly">
          <h1 className="text-black text-4xl font-bold font-sans pb-1">Quick and easy trip planner</h1>
          <h2 className="text-black text-2xl font-sans pb-7">
            Pick a vibe and explore the top destinations in India
          </h2>

          {/* Category Buttons */}
          <div className="flex space-x-4 mb-8">
            <button
              className=" flex justify-center items-center gap-4 px-5 py-3 text-black border border-solid   border-blue-500 rounded-full"
              onClick={() => setSelectedCategory('Beach')}>
                <div><img src="/beach.svg" alt="" /></div>
                <div> Beach</div>
            </button>
            <button
              className="flex justify-center items-center gap-4  px-5 py-3 text-black border border-solid   border-blue-500 rounded-full"
              onClick={() => setSelectedCategory('Outdoor')}>
              <div><img src="/outdoor.svg" alt="" /></div>
              <div>Outdoor</div>
            </button>
            <button
              className="flex justify-center items-center gap-4  px-5 py-3 text-black border border-solid   border-blue-500 rounded-full"
              onClick={() => setSelectedCategory('Romance')}>
             <div ><img src="/romence.svg" alt="" /></div>
             <div>Romance</div> 
            </button>
            <button
              className="flex justify-center items-center gap-4  px-5 py-3 text-black border border-solid   border-blue-500 rounded-full"
              onClick={() => setSelectedCategory('City')}>
                <div><img src="city.svg" alt="" /></div>
               <div>City</div>
            </button>
          </div>

          {/* Scrollable Cards Section */}
          <div className="w-full h-[30vh] overflow-hidden overflow-x-scroll hide-scrollbar flex space-x-4 px-4">
            {/* Render Cards based on selected category */}
            {filteredDestinations.map((destination, index) => (
              <div
                key={index}
                className="min-w-[250px] bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
                <img
                  src={destination.image}
                  className="w-full h-48 object-cover"
                  alt={destination.name}
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-800">{destination.name}</h2>
                  <p className="mt-2 text-gray-600">Welcome to {destination.name}</p>
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
