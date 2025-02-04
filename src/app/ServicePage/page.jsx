"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Services() {
  const { data: session } = useSession();
  const Router = useRouter();
  const [loading, setLoading] = useState(false);


  const handlehome = ()=> {
    setLoading(true);
   Router.push("/")
  };

  if(session){
    return (
      <>
        <div className="min-h-screen bg-[#f8f9fa]  ">
          {/* Header Section */}
          <div className="w-full bg-[#f5f5f5]  shadow-2xl  py-8  text-center text-gray-700">
            <h1 className="text-4xl font-bold">Our Services</h1>
            <p className="text-lg mt-3">
              Explore and book with ease — your journey begins here.
            </p>
          </div>

          {/* Service Sections */}
          <div className="max-w-6xl mx-auto pt-10 pb-4  px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Hotel Booking */}
            <div className="bg-white  rounded-xl shadow-lg p-6 hover:shadow-2xl transition-transform transform hover:scale-105">
              <div className="w-full h-[25vh]  ">
                <img src="/hotel.jpg" alt="" className="w-full h-full object-cover" />

              </div>
              <h2 className="text-2xl font-bold text-[#212529] mb-2">Hotel Booking</h2>
              <p className="text-gray-600 mb-4">
                Discover the best hotel deals across India. Find accommodations that
                suit your style and budget.
              </p>
              <Link href="/HotelBook">
                <button className="bg-white border border-sky-800 text-sky-800 px-6 py-2 rounded-md hover:bg-[#007bff] hover:text-white transition">
                  Book Now
                </button>
              </Link>
            </div>

            {/* Flight Booking */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-transform transform hover:scale-105">
              <div className="w-full h-[25vh]  ">
                <img src="/flight.jpg" alt="" className="w-full h-full object-cover" />

              </div>
              <h2 className="text-2xl font-bold text-[#212529] mb-2">Flight Booking</h2>
              <p className="text-gray-600 mb-4">
                Book domestic and international flights with ease. Explore affordable
                and flexible options for your travel needs.
              </p>
              <Link href="/FlightBook">
                <button className="bg-white border border-sky-800 text-sky-800 px-6 py-2 rounded-md hover:bg-[#007bff] hover:text-white transition">
                  Book Now
                </button>
              </Link>
            </div>

            {/* Train Booking */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-transform transform hover:scale-105">
              <div className="w-full h-[25vh]  ">
                <img src="/train.jpg" alt="" className="w-full h-full object-cover" />

              </div>
              <h2 className="text-2xl font-bold text-[#212529] mb-2">Car Booking</h2>
              <p className="text-gray-600 mb-4">
                Plan your journey on India's  car rent network. Book car tickets
                to your favorite destinations effortlessly.
              </p>
              <Link href="/CarBook">
                <button className="bg-white border border-sky-800 text-sky-800 px-6 py-2 rounded-md hover:bg-[#007bff] hover:text-white transition">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        </div>

      </>
    );
  }
else {
    return (
      <>
        <div className="flex w-full h-[75vh] items-center justify-center px-6 py-12 lg:px-8">
          <div className="w-[45vw] h-[55vh] border-4 border-gray-50 rounded-lg shadow-2xl">
            <div className="sm:mx-auto sm:w-full">
              <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-gray-900">
                Sign in of your account
              </h2>
            </div>

            <div className="mt-14 sm:mx-auto sm:w-[50%]">
              <div className="mt-5">
                <button
                  onClick={handlehome}
                  disabled={loading}
                  className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
                    }`}
                >
                  {loading ? "Redirect" : "Home"}
                </button>
              </div>

              <p className="mt-5 text-center text-sm text-gray-500">
                Register and Explore India?
              </p>
            </div>
          </div>
        </div>

      </>
    );


  }
}
