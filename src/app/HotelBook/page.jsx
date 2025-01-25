'use client';
import Footer from '@/components/Footer';

import React, { useState } from 'react';

export default function HotelBooking() {
  const [form, setForm] = useState({ location: "", checkIn: "", checkOut: "", dest1: "", dest2: [] });
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data1, setData1] = useState();
  const [data2, setData2] = useState([]);


  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Fetch Destination ID
      const response1 = await fetch("/api/HotelBook/SearchHotelDest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response1.ok) throw new Error('Failed to fetch destination data');
      const data1 = await response1.json();

      // Extract the first destination's `dest_id`
      const firstDestination = data1.data?.[0]; // Assuming `data1.data` is an array
      if (!firstDestination) throw new Error('No destinations found');

      const destId = firstDestination.dest_id;

      // Step 2: Fetch Hotels Based on Destination ID
      const response2 = await fetch("/api/HotelBook/SearchHotel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, dest1: destId }), // Pass the updated form with dest1
      });

      if (!response2.ok) throw new Error('Failed to fetch hotels');
      const data2 = await response2.json();

      const blockIds = data2.data?.hotels?.map((element) => element.property.id);
      if (!blockIds || blockIds.length === 0) throw new Error('No destinations found');
      // Set all the IDs as an array

      const response3 = await fetch("/api/HotelBook/GetHotelDetail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, dest2: blockIds }), // Pass the updated form with dest1
      });

      if (!response3.ok) throw new Error('Failed to fetch hotels');
      const data3 = await response3.json();
      setHotels(data3);
     


    } catch (error) {

      alert('An error occurred while fetching hotel data.');
    } finally {
      setLoading(false);
    }
  };


  const handleBookNow = async (hotelId) => {
    try {
      const response = await fetch(`/api/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hotelId }),
      });

      if (!response.ok) throw new Error('Booking failed');
      const data = await response.json();
      alert(`Booking successful: ${data.confirmationId}`);
    } catch (error) {

      alert('Booking failed. Please try again.');
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 text-black p-6">
        <div className="max-w-screen-lg mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Hotel Booking</h1>
          <form className="bg-white p-6 rounded-lg shadow-2xl mb-8" onSubmit={handleSearch}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <input
                type="text"
                placeholder="Enter location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                required
                className="border border-gray-300 rounded-lg p-3"
              />
              <input
                type="date"
                value={form.checkIn}
                onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
                required
                className="border border-gray-300 rounded-lg p-3"
              />
              <input
                type="date"
                value={form.checkOut}
                onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
                required
                className="border border-gray-300 rounded-lg p-3"
              />
            </div>
            <button
              type="submit"
              className="mt-4 mx-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search Hotels'}
            </button>
          </form>



          {/* Display hotels */}
          {hotels?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6  h-[60vh] overflow-y-auto hide-scrollbar">
              {hotels.map((hotel) => (
                <div key={hotel.data.hotel_id} className="bg-white p-6 rounded-lg shadow-md">
                  {/* Display hotel photos */}
                  {Object.keys(hotel.data.rooms).map((roomId) => (
                    <div key={roomId} className="">
                      {hotel.data.rooms[roomId]?.photos?.[0] && (
                        <img
                          src={hotel.data.rooms[roomId].photos[0].url_max1280} // Adjust this key if needed
                          alt={`${hotel.data.name} Room`}
                          className="w-full h-[20vh] object-cover rounded-lg"
                        />
                      )}
                    </div>
                  ))}
                  <div className=' flex p-2 flex-col items-start w-full h-[25vh] justify-around'>
                    <h2 className="text-base font-bold text-gray-700">{hotel.data.hotel_name}</h2>
                    <p className=' text-xs text-gray-600'>{hotel.data.address}</p>
                    <p className=" text-xs text-gray-700">Arrival: {hotel.data.arrival_date}</p>
                    <p className=" text-xs text-gray-700">Departure: {hotel.data.departure_date}</p>
                  </div>



                  <button
                    onClick={() => handleBookNow(hotel.data.hotel_id)}
                    className=" bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Book Now
                  </button>

                </div>
              ))}
            </div>
          ) : (
            !loading && <p className='w-full  text-center font-normal text-lg'>No hotels found. Try a different search.</p>
          )}




        </div>
      </div>
      <Footer />
    </>
  );
}
