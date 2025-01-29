'use client';

import React, { useState } from 'react';

export default function FlightBooking() {
    const [form, setForm] = useState({ from: '', to: '', departureDate: '', returnDate: '', firstid: '', secondid: '' });
    const [flights, setFlights] = useState();
    const [data1, setData1] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Mock API call
            const response1 = await fetch('/api/FlightBook/SearchFlightDest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!response1.ok) throw new Error('Failed to fetch flights');

            const data1 = await response1.json();

            const firstid = data1[0].data[0].id; // Assuming `data1.data` is an array
            if (!firstid) throw new Error('No destinations found');
            const secondid = data1[1].data[0].id; // Assuming `data1.data` is an array
            if (!secondid) throw new Error('No destinations found');

            const response2 = await fetch('/api/FlightBook/SearchFlight', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, firstid: firstid, secondid: secondid }),
            });

            if (!response2.ok) throw new Error('Failed to fetch flights');

            const data2 = await response2.json();
            setFlights(data2);


        } catch (error) {
            
            alert('An error occurred while searching for flights.');
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



    //   const handleBookNow = (flightId) => {
    //     alert(`Flight with ID: ${flightId} booked successfully!`);
    //   };

    return (
        <div className="min-h-screen bg-[#f8f9fa] p-6 text-black">
            <div className="max-w-4xl mx-auto ">
                <h1 className="text-3xl font-bold mb-3 text-gray-800">Flight Booking</h1>

                <form onSubmit={handleSearch} className="bg-white shadow-2xl h-[30vh] p-6 rounded-lg ">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="From"
                            value={form.from}
                            onChange={(e) => setForm({ ...form, from: e.target.value })}
                            required
                            className="border border-gray-300 rounded-lg p-3 w-full"
                        />
                        <input
                            type="text"
                            placeholder="To"
                            value={form.to}
                            onChange={(e) => setForm({ ...form, to: e.target.value })}
                            required
                            className="border border-gray-300 rounded-lg p-3 w-full"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                            type="date"
                            placeholder="Departure Date"
                            value={form.departureDate}
                            onChange={(e) => setForm({ ...form, departureDate: e.target.value })}
                            required
                            className="border border-gray-300 rounded-lg p-3 w-full"
                        />
                        <input
                            type="date"
                            placeholder="Return Date (optional)"
                            value={form.returnDate}
                            onChange={(e) => setForm({ ...form, returnDate: e.target.value })}
                            className="border border-gray-300 rounded-lg p-3 w-full"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-[10vw]  bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                        disabled={loading}
                    >
                        {loading ? 'Searching...' : 'Search Flights'}
                    </button>
                </form>


                {flights?.[0]?.data?.flightOffers?.length > 0 ? (
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4">Available Flights</h2>

                        <div className="grid grid-cols-1 gap-4  h-[45vh]  p-6 overflow-y-auto hide-scrollbar">
                            {flights[0].data.flightOffers.map((flight, index) => {
                                const leg = flight.segments[0].legs[0];
                                const duration = flight.segments[0].duration; // Assuming this holds the journey duration
                                const logoUrl = leg.carriersData?.[0]?.logo || "/default-logo.png"; // Replace with a placeholder if missing

                                return (
                                    <div
                                        key={index}
                                        className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between"
                                    >
                                        {/* Left Section */}
                                        <div className="flex items-center space-x-4 ">
                                           <div className='flex-col p-2'>
                                            <img
                                                src={logoUrl}
                                                alt={leg.carriersData?.[0]?.name || "Airline"}
                                                className="w-10 h-10 rounded-full object-contain"
                                            />
                                                <h3 className="text-sm font-normal">{leg.carriersData?.[0]?.name || "Unknown Airline"}</h3>
                                                </div>
                                            <div>
                                            <p className="text-gray-800 font-bold text-xl">
                                                    {formatTime(leg.departureTime) || "Unknown City"}
                                                </p>
                                                <p className="text-gray-700 text-sm">
                                                    {leg.departureAirport?.city || "Unknown City"}
                                                </p>
                                                <p className="text-gray-500 text-sm">
                                                    {formatDate(leg.departureTime) || "Unknown Date"}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Middle Section */}
                                        <div className="text-center">
                                            <p className="text-gray-500 text-sm">{formatDuration(flight.segments[0].totalTime) || "N/A"}</p>
                                            <p className="text-xl">➡️</p>
                                        </div>

                                        {/* Right Section */}
                                        <div className="text-right">

                                        <p className="text-gray-800 font-bold text-xl">
                                                {formatTime(leg.arrivalTime) || "Unknown Date"}
                                            </p>
                                            <h3 className="text-gray-700 text-sm">
                                                {leg.arrivalAirport?.city || "Unknown City"}
                                            </h3>
                                            <p className="text-gray-500 text-sm">
                                                {formatDate(leg.arrivalTime) || "Unknown Date"}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    !loading && <p className="mt-8 text-gray-600">No flights found. Try a different search.</p>
                )}






            </div>
        </div>
    );
}
