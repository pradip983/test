"use client"
import React from 'react';
import { useEffect, useState } from "react";

function TradingDestination() {
  const [tdestinations, setTDestinations] = useState([]);
  const [firstTwoDestinations, setFirstTwoDestinations] = useState([]);
  const [lastThreeDestinations, setLastThreeDestinations] = useState([]);

  useEffect(() => {
    const fetchTDestinations = async () => {
      try {
        const response = await fetch("/api/tdestination");
        const data = await response.json();

        setTDestinations(data);
        setFirstTwoDestinations(data.slice(0, 2)); // First two destinations
        setLastThreeDestinations(data.slice(2, 5)); // Last three destinations
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchTDestinations();
  }, []);


  return (
    <>
      <div className="w-full h-[85vh]">
        <div className="w-[80%] h-[50vh] m-auto">
          <h1 className="text-black text-4xl font-bold font-sans p-2">Trending Destinations</h1>
          <h2 className="text-black text-2xl font-sans p-2">
            Most popular choices for travellers from India
          </h2>
          <div className="w-full h-[72vh] overflow-hidden p-6">
  {/* Upper Section with First Two Images */}
  <div className="grid grid-cols-2 gap-4">
    {firstTwoDestinations.map((ftd) => (
      <div
        key={ftd._id} // Unique key for each destination
        className="h-[40vh] relative bg-cover bg-center rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-90"
        style={{ backgroundImage: `url(${ftd.image})` }}
      >
        <h1 className="absolute top-4 left-4 text-white text-3xl font-bold shadow-md flex gap-5">
          <div>{ftd.title}</div>
          <div>
            <img src="/world.png" alt="" className="w-10" />
          </div>
        </h1>
      </div>
    ))}
  </div>

  {/* Lower Section with Last Three Images */}
  <div className="grid grid-cols-3 gap-4 mt-4">
    {lastThreeDestinations.map((ltd) => (
      <div
        key={ltd._id} // Unique key for each destination
        className="h-[25vh] relative bg-cover bg-center rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-90"
        style={{ backgroundImage: `url(${ltd.image})` }}
      >
        <h1 className="absolute top-4 left-4 text-white text-2xl font-bold shadow-md flex gap-5">
          <div>{ltd.title}</div>
          <div>
            <img src="/world.png" alt="" className="w-10" />
          </div>
        </h1>
      </div>
    ))}
  </div>
</div>

        </div>
      </div>
    </>
  );
}

export default TradingDestination;
