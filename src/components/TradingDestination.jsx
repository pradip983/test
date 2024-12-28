import React from 'react';

function TradingDestination() {
  return (
    <>
      <div className="w-full h-[85vh]">
        <div className="w-[80%] h-[50vh] m-auto">
          <h1 className="text-black text-4xl font-bold font-sans p-2">Trending Destinations</h1>
          <h2 className="text-black text-2xl font-sans p-2">
            Most popular choices for travellers from India
          </h2>
          <div className="w-full h-[72vh] overflow-hidden p-6">
            <div className="grid grid-cols-2 gap-4">
              {/* Upper Section with 2 images as background */}
              <div className="h-[40vh] relative bg-cover bg-center rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-90" style={{ backgroundImage: 'url("/684765.jpg")' }}>
                <h1 className="absolute top-4 left-4 text-white text-3xl font-bold shadow-md">Destination 1</h1>
              </div>
              <div className="h-[40vh] relative bg-cover bg-center rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-90" style={{ backgroundImage: 'url("/684765.jpg")' }}>
                <h1 className="absolute top-4 left-4 text-white text-3xl font-bold shadow-md">Destination 2</h1>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              {/* Lower Section with 3 images as background */}
              <div className="h-[25vh] relative bg-cover bg-center rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-90" style={{ backgroundImage: 'url("/684765.jpg")' }}>
                <h1 className="absolute top-4 left-4 text-white text-2xl font-bold shadow-md">Destination 3</h1>
              </div>
              <div className="h-[25vh] relative bg-cover bg-center rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-90" style={{ backgroundImage: 'url("/684765.jpg")' }}>
                <h1 className="absolute top-4 left-4 text-white text-2xl font-bold shadow-md">Destination 4</h1>
              </div>
              <div className="h-[25vh] relative bg-cover bg-center rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-90" style={{ backgroundImage: 'url("/684765.jpg")' }}>
                <h1 className="absolute top-4 left-4 text-white text-2xl font-bold shadow-md">Destination 5</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TradingDestination;
