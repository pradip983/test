"use client"
import React from 'react';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

function TradingDestination() {
  const [tdestinations, setTDestinations] = useState([]);
  const [firstTwoDestinations, setFirstTwoDestinations] = useState([]);
  const [lastThreeDestinations, setLastThreeDestinations] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTDestinations = async () => {
      try {
        const response = await fetch("/api/tdestination");
        const data = await response.json();

        setTDestinations(data);
        setFirstTwoDestinations(data.slice(0, 2)); // First two destinations
        setLastThreeDestinations(data.slice(2, 5)); // Last three destinations
      } catch (error) {

      }
    };

    fetchTDestinations();
  }, []);

  const navigateToDetails = (id) => {
    router.push(`/destination/${id}`);
  };

  return (
    <>
      <div className="lg:w-full w-full lg:h-[85vh] h-[48vh]  ">
        <div className="lg:w-[80%] w-[90%]  lg:h-[50vh]  m-auto">
          <h1 className="text-black lg:text-2xl text-xl font-bold font-sans p-1">Trending Destinations</h1>
          <h2 className="text-black lg:text-xl text-sm font-sans p-1 ">
            Most popular choices for travellers from India
          </h2>
          <div className="w-full lg:h-[72vh]  overflow-hidden lg:p-6 p-2">
            {/* Upper Section with First Two Images */}
            <div className="grid grid-cols-2 lg:gap-4 gap-2">
              {firstTwoDestinations.map((ftd) => (
                <div
                  key={ftd._id} // Unique key for each destination
                  className=" lg:h-[33vh] h-[20vh] relative bg-cover bg-center rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-90"
                  style={{ backgroundImage: `url(${ftd.image})` }}
                  onClick={() => navigateToDetails(ftd._id)}
                >
                  <h1 className="absolute top-4 left-4 text-white lg:text-xl text-xs font-bold shadow-md flex gap-3">
                    <div>{ftd.title}</div>
                    <div>
                      <img src="/world.png" alt="" className="lg:w-7 w-4" />
                    </div>
                  </h1>
                </div>
              ))}
            </div>

            {/* Lower Section with Last Three Images */}
            <div className="grid grid-cols-3 lg:gap-4 gap-2 mt-4">
              {lastThreeDestinations.map((ltd) => (
                <div
                  key={ltd._id} // Unique key for each destination
                  className="lg:h-[27vh] h-[10vh] relative bg-cover bg-center rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-90"
                  style={{ backgroundImage: `url(${ltd.image})` }}
                  onClick={() => navigateToDetails(ltd._id)}
                >
                  <h1 className="absolute lg:top-4 top-2 lg:left-4 left-1 text-white lg:text-xl text-[9px] font-bold shadow-md flex lg:gap-3 gap-1">
                    <div>{ltd.title}</div>
                    <div>
                      <img src="/world.png" alt="" className="lg:w-7 w-3" />
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
