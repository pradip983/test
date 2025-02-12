'use client';
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from 'react';
import Lottie from "lottie-react";
import { useEffect } from "react";
import Footer from "@/components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function FlightBooking() {
    const [form, setForm] = useState({ from: '', to: '', departureDate: '', returnDate: '', firstid: '', secondid: '' });
    const [flights, setFlights] = useState();
    const [loading, setLoading] = useState(false);
    const [animationData, setAnimationData] = useState(null);
    const [animationData1, setAnimationData1] = useState(null);

    useEffect(() => {
        fetch("/flight.json")
            .then((response) => response.json())
            .then((data) => setAnimationData(data))
            .catch((error) => console.error("Error loading animation:", error));

        fetch("/loadingp.json")
            .then((response) => response.json())
            .then((data) => setAnimationData1(data))
            .catch((error) => console.error("Error loading animation:", error));
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response1 = await fetch('/api/FlightBook/SearchFlightDest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!response1.ok) throw new Error('Failed to fetch flights');
            const data1 = await response1.json();

            const firstid = data1[0].data[0].id;
            const secondid = data1[1].data[0].id;

            const response2 = await fetch('/api/FlightBook/SearchFlight', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, firstid, secondid }),
            });

            if (!response2.ok) throw new Error('Failed to fetch flights');
            const data2 = await response2.json();
            setFlights(data2);
        } catch (error) {
            toast.warn('An error occurred while searching for flights.');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate(); // Day of the month
        const monthNames = [
          "Jan", "Feb", "Mar", "Apr", "May", 
          "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
        ];
        const month = monthNames[date.getMonth()]; // Get the month name
        return `${day} ${month}`;
      };

      const formatTime = (dateString) => {
        const options = { hour: '2-digit', minute: '2-digit', hour12: false }; // 24-hour format
        return new Date(dateString).toLocaleTimeString('en-US', options);
      };

      const formatDuration = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600); // Convert seconds to hours
        const minutes = Math.floor((totalSeconds % 3600) / 60); // Remainder seconds to minutes
        return `${hours}h ${minutes}m`;
      };


      const handlePayment = async (flight) => {
        
        const stripe = await stripePromise;

        const response = await fetch("/api/FlightBook/checkout", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(flight),
        });
        const session = await response.json();

        const result = await stripe.redirectToCheckout({ sessionId: session.id });

        if (result.error) {
            toast.error(result.error.message);
        }
    };

    return (
        <>
        <div className="min-h-screen bg-[#f8f9fa] p-6 text-black flex flex-col  md:flex-row gap-6">
        <ToastContainer />
            {/* Left Side: Enter Flight Details */}
            <div className="w-full md:w-1/3 bg-[#f8f9fa]  p-6 rounded-lg">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Enter Flight Details</h1>
                <form onSubmit={handleSearch}>
                    <label className="block text-gray-700">From:</label>
                    <input
                        type="text"
                        value={form.from}
                        placeholder="from"
                        onChange={(e) => setForm({ ...form, from: e.target.value })}
                        required
                        className="border border-gray-300 rounded-lg p-3 w-full mb-3"
                    />

                    <label className="block text-gray-700">To:</label>
                    <input
                        type="text"
                        placeholder="to"
                        value={form.to}
                        onChange={(e) => setForm({ ...form, to: e.target.value })}
                        required
                        className="border border-gray-300 rounded-lg p-3 w-full mb-3"
                    />

                    <label className="block text-gray-700">Departure Date:</label>
                    <input
                        type="date"
                        value={form.departureDate}
                        onChange={(e) => setForm({ ...form, departureDate: e.target.value })}
                        required
                        className="border border-gray-300 rounded-lg p-3 w-full mb-3"
                    />

                    <label className="block text-gray-700">Return Date (Optional):</label>
                    <input
                        type="date"
                        value={form.returnDate}
                        onChange={(e) => setForm({ ...form, returnDate: e.target.value })}
                        className="border border-gray-300 rounded-lg p-3 w-full mb-3"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                        disabled={loading}
                    >
                        {loading ? 'Searching...' : 'Search Flights'}
                    </button>
                </form>
            </div>

            {/* Right Side: Show Flight Details */}
            <div className="w-full md:w-2/3 bg-[#f8f9fa] ">
                <h2 className="text-2xl font-bold  ml-2 mt-6 bg-[#f8f9fa] text-gray-800">Available Flights</h2>
                <div className="  lg:p-6 p-2 rounded-2xl lg:h-[85vh] h-[41vh]   hide-scrollbar  overflow-y-auto">
                    {loading ? (
                        <div className="flex justify-center items-center lg:h-full h-[36.7vh]">
                            <Lottie animationData={animationData1} loop={true} className="lg:h-[30vh] h-[15vh] items-center" />
                        </div>
                    ) : flights?.[0]?.data?.flightOffers?.length > 0 ? (
                        flights[0].data.flightOffers.map((flight, index) => {
                            {
                                const leg = flight.segments[0].legs[0];
                                const duration = flight.segments[0].duration; // Assuming this holds the journey duration
                                const logoUrl = leg.carriersData?.[0]?.logo || "/default-logo.png"; // Replace with a placeholder if missing

                                return (
                                    <div
                                        key={index}
                                        className="bg-white   my-2 w-full  h-[12vh] lg:h-[15vh] p-2  lg:p-4 rounded-lg shadow-md flex items-center hover:scale-105 transition justify-between"
                                        onClick={() => handlePayment(flight)}
                                    >
                                        {/* Left Section */}
                                        <div className="flex items-center space-x-4  ">
                                            <div className='flex-col lg:p-2'>
                                                <img
                                                    src={logoUrl}
                                                    alt={leg.carriersData?.[0]?.name || "Airline"}
                                                    className="lg:w-10 w-8 h-8 lg:h-10 rounded-full object-contain"
                                                />
                                                <h3 className="text-sm font-normal">{leg.carriersData?.[0]?.name || "Unknown Airline"}</h3>
                                            </div>
                                            <div>
                                                <p className="text-gray-800 font-bold lg:text-xl">
                                                    {formatTime(leg.departureTime) || "Unknown City"}
                                                </p>
                                                <p className="text-gray-700 text-xs lg:text-sm">
                                                    {leg.departureAirport?.city || "Unknown City"}
                                                </p>
                                                <p className="text-gray-500 text-xs lg:text-sm">
                                                    {formatDate(leg.departureTime) || "Unknown Date"}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Middle Section */}
                                        <div className="text-center">
                                            <p className="text-gray-500 text-xs lg:text-sm">{formatDuration(flight.segments[0].totalTime) || "N/A"}</p>
                                            <p className="lg:text-xl">➡️</p>
                                        </div>

                                        {/* Right Section */}
                                        <div className="text-right">

                                            <p className="text-gray-800 font-bold  lg:text-xl">
                                                {formatTime(leg.arrivalTime) || "Unknown Date"}
                                            </p>
                                            <h3 className="text-gray-700 text-xs lg:text-sm">
                                                {leg.arrivalAirport?.city || "Unknown City"}
                                            </h3>
                                            <p className="text-gray-500 text-xs lg:text-sm">
                                                {formatDate(leg.arrivalTime) || "Unknown Date"}
                                            </p>
                                        </div>
                                    </div>
                                );
                            }
                        })
                    ) : (
                        <Lottie animationData={animationData} loop={true} className='lg:h-full lg:w-full rounded-2xl  bg-[#f8f9fa] items-center' />
                    )}

                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
}