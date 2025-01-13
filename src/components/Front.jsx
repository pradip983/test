export default function Front() {
    return (
        <div
            className="min-h-[75vh] bg-cover bg-center relative" 
            style={{ backgroundImage: "url('/background img.png')", boxShadow: "0 40px 80px rgba(0, 0, 0, 0.4)" }}
        >
            {/* Gradient Overlay for Bottom Shadow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            
            <div className="h-[95vh] bg-black bg-opacity-50 flex items-center justify-center">
                <div className="w-[50vw] text-start">
                    <h1 className="text-5xl font-extrabold text-white">Travel has never</h1>
                    <h1 className="text-5xl font-extrabold text-white p-3">felt this cosy</h1>
                    <h2 className="text-2xl font-sans text-gray-50 p-3">Book an entire place all to yourself</h2>
                    <div className="my-5">
                        <button
                            className="bg-indigo-700 text-white px-[10px] m-2 py-1 rounded-md text-base hover:bg-indigo-600 transition"
                        >
                            View More &gt;
                        </button>
                    </div>

                    <div className="mt-[30px] flex items-center  gap-4">
                        <div className="w-[30vw] h-[5vh]">
                            <input
                                type="text"
                                className="flex-grow w-[30vw] h-[5vh] text-base text-white px-7 py-2 bg-transparent border-2 border-slate-300 rounded-full outline-none"
                                placeholder="Search for destinations, places, or stays..."
                            />
                        </div>
                        <div>
                            <button
                                className="bg-indigo-700 text-white px-[10px] m-2 py-1 rounded-md text-base hover:bg-indigo-600 transition"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
