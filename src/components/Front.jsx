"use client"
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";




export default function Front() {

    const [form, setForm] = useState({ title: "" });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Send search request
            const response = await fetch("/api/search", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await response.json();
            

            if (!response.ok) {
                alert(data.error || "An error occurred during Searching. Please try again.");
                setLoading(false);
                return;
            }

            

            if(data?.message){
                
                alert(data.message || "Search successful!");
            }else{
                {router.push(`/destination/${data._id}`)}
            }


        } catch (error) {
            console.error("Search error:", error);
            alert("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };


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

                    <div className="mt-[30px] items-center   gap-4">
                        <form onSubmit={handleSubmit} className="flex items-center justify-start">
                            <div className="w-[30vw] h-[5vh]">
                                <input
                                    id="search"
                                    name="search"
                                    type="text"
                                    value={form.title}
                                    onChange={(e) =>
                                        setForm({ ...form, title: e.target.value })
                                    }
                                    required
                                    className="flex-grow w-[30vw] h-[5vh] text-base text-white px-7 py-2 bg-transparent border-2 border-slate-300 rounded-full outline-none"
                                    placeholder="Search for destinations, places, or stays..."

                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={` bg-indigo-700 text-white px-[10px] m-2 py-1 shadow-sm rounded-md text-base hover:bg-indigo-600 transition  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${loading
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
    );
}
