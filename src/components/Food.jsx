import React from 'react'

function Food({foods}) {
  return (
    <>
    <div className="w-full h-full p-2 lg:p-6 bg-gray-50 flex flex-col gap-2 lg:gap-6 hide-scrollbar overflow-y-auto">
      {/* Title Section */}
      <div className="text-center">
        <h1 className="lg:text-5xl text-4xl font-extrabold text-gray-800">Famous Foods</h1>
        <p className="lg:text-xl text-base text-gray-500 mt-2">
          Explore the most iconic dishes of this place and their rich flavors.
        </p>
      </div>

      {/* Food Cards */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-8">
        {foods.map((food, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg shadow-md overflow-hidden  transform transition-shadow duration-300 hover:shadow-2xl"
          >
            {/* Food Image */}
            <div className="w-full lg:h-56 h-36 relative">
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Food Info */}
            <div className="lg:p-4 p-2 flex flex-col items-start w-full lg:h-[37vh] gap-2 min-h-[30vh] justify-around">
              <h2 className="lg:text-2xl text-xl font-bold text-gray-800">{food.name}</h2>
              <p className="text-gray-600 text-sm">{food.description}</p>
              <p className="text-gray-500 text-sm italic">
                Origin: {food.origin}
              </p>
              {food.recipe && (
                <a
                  href={`https://www.allrecipes.com/search?q=${food.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800  font-medium"
                >
                  View Recipe
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

    
    </div>
    </>
  )
}

export default Food
