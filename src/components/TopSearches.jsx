"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

const topSearches = [
  { id:1,
    name: "Taj Mahal",
    img: "/agra.jpg",
    description: "A symbol of love, located in Agra, India.",
  },
  { id:2,
    name: "Golden Temple",
    img: "/agra.jpg",
    description: "A sacred Sikh temple in Amritsar, India.",
  },
  { id:3,
    name: "Jaipur City",
    img: "/agra.jpg",
    description: "The Pink City of India, famous for its palaces.",
  },
  { id:4,
    name: "Kerala Backwaters",
    img: "/agra.jpg",
    description: "Serene and beautiful backwaters in Kerala.",
  },
  { id:5,
    name: "Ladakh",
    img: "/agra.jpg",
    description: "The land of high passes in Jammu and Kashmir.",
  },
  // Add more items up to 10...
];

export default function TopSearches() {

   const [destinations, setDestinations] = useState([]);
     const router = useRouter();
  
  
  
    useEffect(() => {
      const fetchDestinations = async () => {
        const response = await fetch("/api/destination");
        
        const data = await response.json();
        const reversedata  = data.slice().reverse();
        setDestinations(reversedata);
      };
  
      fetchDestinations();
    }, []);
  
    const navigateToDetails = (id) => {
      router.push(`/destination/${id}`);
    };


  return (
    <> 
    <div className="lg:w-full w-[80vw]  lg:h-[60vh] ">
    <div className="lg:w-[80%] w-[90%]  h-full m-auto    py-8 ">
      <h1 className="  text-start text-black text-2xl font-bold font-sans  mb-6">
        Top 10 Searches
      </h1>
      <div className="w-full lg:h-[42vh] overflow-hidden overflow-x-scroll hide-scrollbar flex space-x-4 px-4">
            {destinations.map((cdestination) => (
              <div
                key={cdestination._id}
                className="min-w-[230px] bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-90">
                <div className="relative w-full h-48">
                <img
                  src={cdestination.image}
                  className="w-full h-full object-cover"
                  alt={cdestination.name}
                  onClick={() => navigateToDetails(cdestination._id)}
                  

                />
                </div>
                <div className="p-4">
                  <h2 className="text-base font-bold text-gray-800">{cdestination.title}</h2>
                  <p className="text-xs text-gray-600 mt-2 ">{cdestination.description}</p>
                </div>
              </div>
            ))}
          </div>
    </div>
    </div>
    </>
  );
}
