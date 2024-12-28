import React from 'react';

function Card() {
  return (
    <>
      <div className="w-full h-[55vh] grid ">
        <div className='w-[80%] h-[50vh] m-auto grid place-content-evenly'>
          <div><h1 className='text-black text-4xl font-bold font-sans '>Expolre India</h1>
            <h2 className='text-black text-2xl font-sans'>These popular destinations have a lot to offer</h2>
          </div>
          <div
            className="w-full h-[30vh]  overflow-hidden overflow-x-scroll hide-scrollbar flex space-x-4 px-4">
            {/* Card 1 */}
            <div className="min-w-[250px]  bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <img
                src="/684765.jpg"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">New Delhi</h2>
                <p className="mt-2 text-gray-600">Welcome to Delhi</p>
              </div>
            </div>
            {/* Card 2 */}
            <div className="min-w-[250px] bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <img
                src="/684765.jpg"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">Mumbai</h2>
                <p className="mt-2 text-gray-600">Welcome to Mumbai</p>
              </div>
            </div>
            {/* Card 3 */}
            <div className="min-w-[250px] bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <img
                src="/684765.jpg"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">Bangalore</h2>
                <p className="mt-2 text-gray-600">Welcome to Bangalore</p>
              </div>
            </div>
            <div className="min-w-[250px] bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <img
                src="/684765.jpg"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">Bangalore</h2>
                <p className="mt-2 text-gray-600">Welcome to Bangalore</p>
              </div>
            </div>
            <div className="min-w-[250px] bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <img
                src="/684765.jpg"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">Bangalore</h2>
                <p className="mt-2 text-gray-600">Welcome to Bangalore</p>
              </div>
            </div>
            <div className="min-w-[250px] bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <img
                src="/684765.jpg"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">Bangalore</h2>
                <p className="mt-2 text-gray-600">Welcome to Bangalore</p>
              </div>
            </div>
            <div className="min-w-[250px] bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <img
                src="/684765.jpg"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">Bangalore</h2>
                <p className="mt-2 text-gray-600">Welcome to Bangalore</p>
              </div>
            </div>
            <div className="min-w-[250px] bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <img
                src="/684765.jpg"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">Bangalore</h2>
                <p className="mt-2 text-gray-600">Welcome to Bangalore</p>
              </div>
            </div>
            {/* Add more cards as needed */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
