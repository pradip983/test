

export default function Information({ data }) {
 
  return (
    <>
      <div className="w-[98%] h-[92.4%] p-6 bg-gray-50 flex flex-col gap-6 hide-scrollbar overflow-y-auto">



        <div className="text-center">
          <h1 className="text-[40px] font-extrabold text-gray-800">{data.title}</h1>
          <p className="text-xl text-gray-500 ">{data.subtitle}</p>
        </div>
        
       {/* Big Center Image */}
       <div className="w-[80%] h-[55%] mx-auto border-2 rounded-lg  shadow-lg">
            <img
              src={data.image || "/fallback-image.jpg"}
              alt={data.title || "Fallback Title"}
              className="w-full h-full object-cover border-2 rounded-lg"
            />
          </div>


        {/* Structural Details */}
        <div>
          <h2 className="text-3xl font-bold text-gray-700 mb-4">
            About {data.title}
          </h2>
          <p className="text-gray-600 leading-8">* {data.description}</p>
        </div>

        {/* Highlights */}
        <div>
          <h2 className="text-3xl font-bold text-gray-700 mb-4">Highlights</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            {data.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </div>

        {/* Gallery */}
        <h2 className="text-3xl font-bold text-gray-700 mb-2">Gallery</h2>
        <div className="w-full h-[30vh]   flex space-x-4 px-4  ">
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
        <h2 className="text-3xl font-bold text-gray-700 mb-2">Detail:</h2>
        {data.detail.map((detail, index) => (
          <div key={index} className="">
         <h2 className="text-xl font-bold text-gray-700 my-2 ">{detail.title}</h2>
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
