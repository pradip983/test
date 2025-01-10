"use client"
import React from 'react';
import { useEffect, useState } from "react";

function Card() {
  const [destinations, setDestinations] = useState([]);


  useEffect(() => {
    const fetchDestinations = async () => {
      const response = await fetch("/api/destination");
      console.log(response);
      const data = await response.json();
      setDestinations(data);
    };

    fetchDestinations();
  }, []);

  return (
    <>
      <div className="w-full h-[55vh] grid ">
        <div className="w-[80%] h-[50vh] m-auto grid place-content-evenly">
          <div>
            <h1 className="text-black text-4xl font-bold font-sans ">Explore India</h1>
            <h2 className="text-black text-2xl font-sans">These popular destinations have a lot to offer</h2>
          </div>
          <div className="w-full h-[30vh] overflow-hidden overflow-x-scroll hide-scrollbar flex space-x-4 px-4">
            {/* Card 1 */}
            {destinations.map((destination) => (
            <div  key={destination._id} className="min-w-[250px] bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
            
              <img src={destination.image} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">{destination.title}</h2>
                <p className="mt-2 text-gray-600">{destination.description}</p>
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
