'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


function ChooseDestination() {
  const [cdestinations, setCDestinations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchCDestinations = async () => {
      const response = await fetch('/api/cdestination');
     
      const data = await response.json();
      setCDestinations(data);
    };

    fetchCDestinations();
  }, []);

  const filteredDestinations = selectedCategory
    ? cdestinations.filter((destination) => destination.category === selectedCategory)
    : cdestinations;

    const navigateToDetails = (id) => {
      router.push(`/destination/${id}`);
    };
    

  return (
    <>
      <div className="lg:w-full w-full   lg:grid">
        <div className="lg:w-[80%] w-[90%] lg:h-[60vh] h-[45vh]  m-auto grid place-content-evenly">
          <h1 className="text-black lg:text-2xl text-xl font-bold font-sans ">Quick and easy trip planner</h1>
          <h2 className="text-black lg:text-xl text-sm font-sans ">
            Pick a vibe and explore the top destinations in India
          </h2>

          {/* Category Buttons */}
          <div className="flex  lg:w-full w-full space-x-2 mb-4">
            {[
              { category: 'Beach', icon: '/beach.svg', label: 'Beach' },
              { category: 'Outdoor', icon: '/outdoor.svg', label: 'Outdoor' },
              { category: 'Romance', icon: '/romence.svg', label: 'Romance' },
              { category: 'City', icon: 'city.svg', label: 'City' },
            ].map(({ category, icon, label }) => (
              <button
                key={category}
                className={`flex justify-center items-center gap-2 lg:px-3 px-1 py-1 lg:text-sm text-xs lg:py-2 text-black border border-solid rounded-full 
                ${selectedCategory === category ? 'bg-blue-500 text-white' : 'border-blue-500'}`}
                onClick={() => setSelectedCategory(category)}>
                <div>
                  <img src={icon} className='' alt={label} />
                </div>
                <div>{label}</div>
              </button>
            ))}
          </div>

          {/* Scrollable Cards Section */}
          <div className="lg:w-full  w-full    lg:h-[30vh] overflow-hidden overflow-x-scroll hide-scrollbar flex space-x-4 px-4">
            {filteredDestinations.map((cdestination) => (
              <div
                key={cdestination._id}
                className="min-w-[200px]  bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-90">
                <img
                  src={cdestination.image}
                  className="w-full h-[16vh] object-cover"
                  alt={cdestination.name}
                  onClick={() => navigateToDetails(cdestination._id)}

                />
                <div className="p-4">
                  <h2 className="text-base font-bold text-gray-800">{cdestination.name}</h2>
                  <p className="mt-1 text-xs text-gray-600">Welcome to {cdestination.name}</p>
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
