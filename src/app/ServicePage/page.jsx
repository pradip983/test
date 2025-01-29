"use client";
import React from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function Services() {
  return (
    <>
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header Section */}
      <div className="w-full bg-[#f5f5f5]  shadow-2xl  py-12 text-center text-gray-700">
        <h1 className="text-4xl font-bold">Our Services</h1>
        <p className="text-lg mt-3">
          Explore and book with ease — your journey begins here.
        </p>
      </div>

      {/* Service Sections */}
      <div className="max-w-6xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
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
          <h2 className="text-2xl font-bold text-[#212529] mb-2">Train Booking</h2>
          <p className="text-gray-600 mb-4">
            Plan your journey on India's vast railway network. Book train tickets
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
    <Footer/>
    </>
  );
}
