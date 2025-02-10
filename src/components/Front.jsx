"use client"
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";




export default function Front() {

    
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [suggestions, setsuggestions] = useState([]);
    
    const router = useRouter();


useEffect(() => {
    const fetchDestinations = async () => {

        const response = await fetch("/api/search");

        const suggestions = await response.json();
    
        setsuggestions(suggestions);
      
    };

    fetchDestinations();
  }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            // Send search request
            const response = await fetch("/api/searchtitle", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: inputValue }),
            });

            const data = await response.json();


             if (!response.ok) {
                 toast.warn(data.message || "An error occurred during Searching. Please try again.");
                 setLoading(false);
                 return;
             }
             else {
                { router.push(`/destination/${data._id}`) }
            }


        } catch (error) {
            
            toast.warn("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
        

        
    };

   

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        // Filter suggestions based on input
        if (value) {
            const filtered = suggestions.filter((suggestion) =>
                suggestion.title.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredSuggestions(filtered);
        } else {
            setFilteredSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion); // Set the input to the clicked suggestion
        
        setFilteredSuggestions([]); // Hide the suggestions
    };



    return (
        <>
            <div
                className="min-h-[75vh] w-full bg-cover bg-center  relative"
              
                style={{ backgroundImage: "url('/background img.png')", boxShadow: "0 40px 80px rgba(0, 0, 0, 0.4)" }}
            >
                  <ToastContainer />
                {/* Gradient Overlay for Bottom Shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                <div className="h-[95vh] bg-black w-full bg-opacity-50 flex items-center  px-3 lg:px-0 justify-center">
                    <div className="lg:w-[50vw] w-[88%]  text-start">
                        <h1 className="lg:text-5xl text-4xl font-extrabold text-white">Travel has never</h1>
                        <h1 className="lg:text-5xl text-4xl font-extrabold text-white px-2 py-2 lg:p-3">felt this cosy</h1>
                        <h2 className="lg:text-2xl text-xl font-sans text-gray-50 p-3">Book an entire place all to yourself</h2>
                        <div className="lg:my-5">
                            <Link href={"/AboutPage"} >
                            <button
                                className="bg-indigo-700 border-slate-300 border-[1px] text-white px-[10px] m-2 py-1 rounded-md  text-sm lg:text-base hover:bg-indigo-600 transition"
                            >
                                View More &gt;
                            </button>
                            </Link>
                        </div>

                        <div className="mt-[30px] lg:w-[38vw]   items-center    gap-4">
                            <form onSubmit={handleSubmit} className="flex items-center justify-start ">
                                <div className="">
                                    <input
                                        id="search"
                                        name="search"
                                        type="text"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        required
                                        autoComplete="off"

                                        className="flex-grow lg:w-[30vw]  lg:h-[5vh] lg:text-base text-white  lg:px-7 px-6 py-[6px] text-sm lg:py-2 bg-transparent border lg:border-2  border-slate-300 rounded-full outline-none"
                                        placeholder="Search for destinations..."

                                    />
                                    {filteredSuggestions.length > 0 && (
                                        <div className="">
                                            <ul className="absolute z-10   min-w-44 lg:w-[25vw] max-h-[20vh] overflow-y-scroll hide-scrollbar  border border-slate-400 bg-transparent  text-white  rounded-md ml-10 mt-1 shadow-lg">
                                                {filteredSuggestions.map((suggestion, index) => (
                                                    <li
                                                        key={index}
                                                        onClick={() => handleSuggestionClick(suggestion.title)}
                                                        className="m-[4px] rounded text-xs p-2 border-hidden border-[1px] cursor-pointer hover:border-white  hover:border-[1px] hover:bg-blue-900 hover:shadow-lg"
                                                    >
                                                        {suggestion.title}
                                                    </li> 
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={` bg-indigo-700 text-white border-white border-[1px] lg:px-[10px] m-2 min-w-16 lg:min-w-24 py-1 shadow-sm rounded-md text-sm lg:text-base hover:bg-indigo-600 transition  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${loading
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
                                            }`}
                                    >
                                        {loading ? "Search..." : "Search"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
