import React from 'react';

function Card() {
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
            <div className="min-w-[250px] bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <img src="/rishikesh.jpg" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">Rishikesh</h2>
                <p className="mt-2 text-gray-600">Known as the Yoga Capital of the World, Rishikesh offers spiritual retreats and adventure sports.</p>
              </div>
            </div>
            {/* Card 2 */}
            <div className="min-w-[250px] bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <img src="/ramnagar.jpg" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">Ramnagar</h2>
                <p className="mt-2 text-gray-600">Gateway to Jim Corbett National Park, perfect for wildlife enthusiasts.</p>
              </div>
            </div>
            {/* Card 3 */}
            <div className="min-w-[250px] bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <img src="/Shimla.jpg" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">Shimla</h2>
                <p className="mt-2 text-gray-600">A serene hill station famous for its colonial architecture and scenic views.</p>
              </div>
            </div>
            <div className="min-w-[250px] bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <img src="/Udaipur.jpg" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">Udaipur</h2>
                <p className="mt-2 text-gray-600">Known as the City of Lakes, Udaipur is a picturesque destination with rich history.</p>
              </div>
            </div>
            <div className="min-w-[250px] bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <img src="/sawai.jpg" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">Sawai Madhopur</h2>
                <p className="mt-2 text-gray-600">Famous for Ranthambore National Park and its majestic tigers.</p>
              </div>
            </div>
            <div className="min-w-[250px] bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <img src="/bhim tal.jpg" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">Bhim Tal</h2>
                <p className="mt-2 text-gray-600">A tranquil lake town surrounded by lush greenery and mountains.</p>
              </div>
            </div>
            <div className="min-w-[250px] bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <img src="/ajmer.jpg" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">Ajmer</h2>
                <p className="mt-2 text-gray-600">Home to the famous Ajmer Sharif Dargah, a site of spiritual significance.</p>
              </div>
            </div>
            <div className="min-w-[250px] bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <img src="/alwar.jpg" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">Alwar</h2>
                <p className="mt-2 text-gray-600">A historical city known for its forts, palaces, and scenic beauty.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
