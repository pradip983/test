import React from 'react'
import { useRouter } from 'next/navigation'

function NearPlave({places}) {
 
  const Router = useRouter();
 const  heandlerouting = async(dl) => {
  
  Router.push(dl)
 }
  return (
    <div className="w-full h-full bg-gray-50 flex flex-col items-center p-2 lg:p-6 overflow-y-auto hide-scrollbar">
      {/* Page Header */}
      <header className="w-full max-w-6xl text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">Explore Nearby Destinations</h1>
        <p className="lg:text-lg text-base text-gray-600 mt-2">
          Discover stunning locations close to your destination and make the most of your journey.
        </p>
      </header>

      {/* Near Places Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-6 w-full max-w-6xl">
        {places.map((place, index) => (
          <div
            key={index}
            className="relative border rounded-lg  overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Image Section */}
            <div className="w-full lg:h-48">
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Content Section */}
            <div className="lg:p-4 p-2 flex flex-col items-start w-full lg:h-[30vh] min-h-[28vh] justify-around">
              <h2 className="text-xl font-bold text-gray-800">{place.name}</h2>
              <p className="text-sm text-gray-600 mt-2">{place.description}</p>

              {/* Action Buttons */}
              <div className="mt-4 flex justify-between items-center">
                
                <button                  
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
                   onClick={()=>{heandlerouting(`${place.detailsLink}`)}}>
                  View Detail
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
  )
}

export default NearPlave
