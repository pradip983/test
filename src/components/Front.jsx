

export default function Front() {
    return (
        <div
            className="min-h-[75vh] bg-cover bg-center "
            style={{ backgroundImage: "url('/background img.png') " }}
        >
            <div className="  h-[100vh]  bg-black bg-opacity-50 flex items-center justify-center ">
                <div className="w-[50vw] S text-start  ">
                    <h1 className="text-7xl font-extrabold text-white  ">Travel has never</h1>
                    <h1 className="text-7xl font-extrabold text-white p-3 ">felt this cosy</h1>
                    <h2 className="text-4xl font-sans text-gray-50 p-3">Book an entire place all to yourself</h2>
                    <div className="my-7">
                        <button
                            className="bg-indigo-700 text-white px-[14px] m-2 py-2 rounded-md text-2xl  hover:bg-indigo-600 transition"
                        >
                            View More &gt;
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}
