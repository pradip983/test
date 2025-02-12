'use client';
import Footer from '@/components/Footer';
import { loadStripe } from "@stripe/stripe-js";
import Lottie from "lottie-react";
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function HotelBooking() {
  const [form, setForm] = useState({ location: "", checkIn: "", checkOut: "", dest1: "", dest2: [] });
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const [animationData1, setAnimationData1] = useState(null);

  useEffect(() => {
    fetch("/hotel.json")
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
      const response1 = await fetch("/api/HotelBook/SearchHotelDest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response1.ok) throw new Error('Failed to fetch destination data');
      const data1 = await response1.json();
      const firstDestination = data1.data?.[0];
      if (!firstDestination) throw new Error('No destinations found');
      const destId = firstDestination.dest_id;

      const response2 = await fetch("/api/HotelBook/SearchHotel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, dest1: destId }),
      });

      if (!response2.ok) throw new Error('Failed to fetch hotels');
      const data2 = await response2.json();
      const blockIds = data2.data?.hotels?.map((element) => element.property.id);
      if (!blockIds || blockIds.length === 0) throw new Error('No hotels found');

      const response3 = await fetch("/api/HotelBook/GetHotelDetail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, dest2: blockIds }),
      });

      if (!response3.ok) throw new Error('Failed to fetch hotel details');
      const data3 = await response3.json();
      setHotels(data3);
    } catch (error) {
      toast.warn('An error occurred while fetching hotel data.');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (hotel) => {
    const stripe = await stripePromise;
    const response = await fetch("/api/HotelBook/checkout", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(hotel),
    });
    const session = await response.json();
    const result = await stripe.redirectToCheckout({ sessionId: session.id });
    if (result.error) {
      toast.error(result.error.message);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#f8f9fa] text-black  p-6 lg:flex">
        <ToastContainer />
        {/* Left: Booking Form */}
        <div className="lg:w-1/3 p-6 bg-[#f8f9fa]  rounded-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Hotel Booking</h1>
          <form onSubmit={handleSearch} className="">
            <label htmlFor="loaction" className='text-base  text-gray-600 font-light'>Enter Location</label>
            <input
              type="text"
              placeholder="Enter location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              required
              className="border border-gray-300 rounded-lg p-2 mb-4  w-full"
            />
            <label htmlFor="checkin" className='text-base text-gray-600 font-light'>Enter CheckIn Date</label>
            <input
              type="date"
              value={form.checkIn}
              onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
              required
              className="border border-gray-300 mb-4 rounded-lg p-2 w-full"
            />
            <label htmlFor="checkin" className='text-base text-gray-600 font-light'>Enter CheckOut Date</label>
            <input
              type="date"
              value={form.checkOut}
              onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
              required
              className="border border-gray-300 rounded-lg mb-4 p-3 w-full"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search Hotels'}
            </button>
          </form>
        </div>

        {/* Right: Hotel Listings */}
        <div className="lg:w-2/3 p-6">
          <h2 className="text-2xl font-bold mb-4 ml-2 text-gray-800">Available Hotels</h2>
          {loading ? (
            <div className="flex justify-center items-center lg:h-full h-[38vh]">
              <Lottie animationData={animationData1} loop={true} className="lg:h-[30vh] h-[15vh] items-center" />
            </div>
          ) : hotels?.length > 0 ? (
            <div className="grid  grid-cols-2 h-[54vh] lg:grid-cols-2 gap-1 p-1 lg:gap-6 lg:p-7  lg:h-[80vh] hide-scrollbar overflow-y-auto">
              {hotels.map((hotel) => (
                <div key={hotel.data.hotel_id} className="bg-white lg:p-4 p-2 max-h-[27vh] lg:max-h-full   rounded-lg shadow-md">
                  {Object.keys(hotel.data.rooms).map((roomId) => (
                    <div key={roomId}>
                      {hotel.data.rooms[roomId]?.photos?.[0] && (
                        <img
                          src={hotel.data.rooms[roomId].photos[0].url_max1280}
                          alt="Hotel Room"
                          className="w-full lg:h-[150px] object-cover rounded-lg"
                        />
                      )}
                    </div>
                  ))}
                  <div className="grid  min-h-[10vh] lg:gap-2  lg:mt-2">
                    <h2 className="lg:text-base text-xs font-bold  h-8  overflow-scroll text-gray-700">{hotel.data.hotel_name}</h2>
                    <p className="lg:block hidden text-sm text-gray-600">{hotel.data.address}</p>
                    <p className="lg:text-xs text-[10px] text-gray-700">Arrival: {hotel.data.arrival_date}</p>
                    <p className="lg:text-xs text-[10px] text-gray-700">Departure: {hotel.data.departure_date}</p>

                  </div>
                  <button
                      onClick={() => handlePayment(hotel.data)}
                      className="lg:mt-3  lg:text-base text-xs  px-1 py-1 w-full bg-green-600 text-white lg:px-4 lg:py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      Book Now
                    </button>

                </div>
              ))}
            </div>
          ) : (
            <Lottie animationData={animationData} loop={true} className="lg:h-[70vh] bg-[#f8f9fa] rounded-2xl items-center" />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
