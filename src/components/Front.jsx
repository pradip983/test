export default function Front() {
    return (
        <div
            className="min-h-[75vh] bg-cover bg-center relative"
            style={{ backgroundImage: "url('/background img.png')" }}
        >
            {/* Gradient Overlay for Bottom Shadow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            
            <div className="h-[100vh] bg-black bg-opacity-50 flex items-center justify-center">
                <div className="w-[50vw] text-start">
                    <h1 className="text-7xl font-extrabold text-white">Travel has never</h1>
                    <h1 className="text-7xl font-extrabold text-white p-3">felt this cosy</h1>
                    <h2 className="text-4xl font-sans text-gray-50 p-3">Book an entire place all to yourself</h2>
                    <div className="my-7">
                        <button
                            className="bg-indigo-700 text-white px-[14px] m-2 py-2 rounded-md text-2xl hover:bg-indigo-600 transition"
                        >
                            View More &gt;
                        </button>
                    </div>

                    <div className="mt-[100px] flex items-center justify-center gap-4">
                        <div className="w-[43vw] h-[6vh]">
                            <input
                                type="text"
                                className="flex-grow w-[43vw] h-[6vh] text-2xl text-white px-9 py-2 bg-transparent border-[4px] border-slate-300 rounded-full outline-none"
                                placeholder="Search for destinations, places, or stays..."
                            />
                        </div>
                        <div>
                            <button
                                className="bg-indigo-700 text-white px-[14px] m-2 py-3 rounded-md text-2xl hover:bg-indigo-600 transition"
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
