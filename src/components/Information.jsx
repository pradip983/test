

export default function Information({ data }) {
 
  return (
    <>
      <div className="lg:w-[98%] lg:h-full p-2 gap-3 lg:p-6 bg-gray-50 flex flex-col lg:gap-6 hide-scrollbar overflow-y-auto">



        <div className="text-center">
          <h1 className="lg:text-[40px] text-[35px] font-extrabold text-gray-800">{data.title}</h1>
          <p className="text-xl  text-gray-500 ">{data.subtitle}</p>
        </div>
        
       {/* Big Center Image */}
       <div className="lg:block hidden w-[75%] lg:h-[45%] mx-auto border-2 rounded-lg  shadow-lg">
            <img
              src={data.image || "/fallback-image.jpg"}
              alt={data.title || "Fallback Title"}
              className="w-full h-full object-cover border-2 rounded-lg"
            />
          </div>


        {/* Structural Details */}
        <div>
          <h2 className="lg:text-3xl text-2xl font-bold text-gray-700 mb-4">
            About {data.title}
          </h2>
          <p className="text-gray-600 leading-8">* {data.description}</p>
        </div>

        {/* Highlights */}
        <div>
          <h2 className="lg:text-3xl text-2xl font-bold text-gray-700 mb-4">Highlights</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            {data.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </div>

        {/* Gallery */}
        <h2 className="lg:text-3xl text-2xl font-bold text-gray-700 mb-2">Gallery</h2>
        <div className="w-full lg:overflow-visible overflow-y-auto lg:h-[30vh]   flex space-x-4 px-4  ">
        {data.gallery.map((image, index) => (
              <div
              key={index}
                className="min-w-[200px] bg-white rounded-lg shadow-md   transform transition-transform duration-300 hover:scale-90">
                <img
                   src={image}
                  className="w-full h-[16vh] object-cover"
                  alt={`Gallery image ${index + 1}`}
                  

                />
                <div className="p-4">
                  <h2 className="text-base font-bold text-gray-800">Himalayas</h2>
                  
                </div>
              </div>
            ))}
          </div>

          {/* Detail */}
        <h2 className="lg:text-3xl text-2xl font-bold text-gray-700 mb-2">Detail:</h2>
        {data.detail.map((detail, index) => (
          <div key={index} className="">
         <h2 className="lg:text-xl text-lg font-bold text-gray-700 my-2 ">{detail.title}</h2>
         <p className="text-gray-600 leading-8 my-2 mx-1" style={{ textIndent: '3rem', textAlign: 'justify' }}>{detail.p1}</p>
         <p className="text-gray-600 leading-8 my-2 mx-1" style={{ textIndent: '3rem', textAlign: 'justify' }}>{detail.p2}</p>
         <p className="text-gray-600 leading-8 my-2 mx-1" style={{ textIndent: '3rem', textAlign: 'justify' }}>{detail.p3}</p>
         <p className="text-gray-600 leading-8 my-2 mx-1" style={{ textIndent: '3rem', textAlign: 'justify' }}>{detail.p4}</p>
         </div>
        ))}
      </div>
    </>
  );
}
