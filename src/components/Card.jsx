"use client"
import React from 'react';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

function Card() {
  const [destinations, setDestinations] = useState([]);
   const router = useRouter();



  useEffect(() => {
    const fetchDestinations = async () => {
      const response = await fetch("/api/destination");
      
      const data = await response.json();
      setDestinations(data);
    };

    fetchDestinations();
  }, []);

  const navigateToDetails = (id) => {
    router.push(`/destination/${id}`);
  };

  return (
    <>
      <div className=" lg:h-[55vh]  lg:w-full w-full   lg:grid">
        <div className="lg:w-[80%] w-[90%] lg:h-[50vh] h-[45vh]  m-auto grid place-content-evenly">
          <div>
            <h1 className="text-black lg:text-2xl text-xl font-bold font-sans ">Explore India</h1>
            <h2 className="text-black lg:text-xl text-sm font-sans">These popular destinations have a lot to offer</h2>
          </div>
          <div className="w-full  h-[30vh] overflow-hidden overflow-x-scroll hide-scrollbar flex space-x-4 px-4">
            {/* Card 1 */}
            {destinations.map((destination) => (
            <div  key={destination._id} className="min-w-[200px] bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-90">
            
              <img src={destination.image} className="w-full h-[16vh] object-cover" onClick={() => navigateToDetails(destination._id)} />
              <div className="p-4">
                <h2 className="text-base font-bold text-gray-800">{destination.title}</h2>
                <p className="mt-1 text-xs text-gray-600">{destination.description}</p>
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
