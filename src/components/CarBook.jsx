"use client";

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Footer from "@/components/Footer";
import Lottie from "lottie-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CarRentalPage() {
    const [form, setForm] = useState({ from: '', to: '', departureDate: '', time: '', type: '', firstid: "", secondid: "" });
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(false);
    const [animationData, setAnimationData] = useState(null);
    const [animationData1, setAnimationData1] = useState(null);
    const [stripe, setStripe] = useState(null);

    // Load Stripe on the client side
    useEffect(() => {
        if (typeof window !== "undefined") {
            loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY).then(setStripe);
        }
    }, []);

    // Fetch animations safely
    useEffect(() => {
        if (typeof window !== "undefined") {
            fetch("/car.json")
                .then((response) => response.json())
                .then((data) => setAnimationData(data))
                .catch((error) => console.error("Error loading animation:", error));

            fetch("/loadingp.json")
                .then((response) => response.json())
                .then((data) => setAnimationData1(data))
                .catch((error) => console.error("Error loading animation:", error));
        }
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response1 = await fetch('/api/CarBook/SearchCar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!response1.ok) throw new Error('Failed to fetch cars');

            const data1 = await response1.json();
            const firstid = data1[0]?.data[0]?.googlePlaceId;
            const secondid = data1[1]?.data[0]?.googlePlaceId;

            if (!firstid || !secondid) throw new Error('No destinations found');

            const response2 = await fetch('/api/CarBook/SearchDest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, firstid, secondid }),
            });

            if (!response2.ok) throw new Error('Failed to fetch destinations');

            const data2 = await response2.json();
            setCars(data2);
        } catch (error) {
            toast.warn('An error occurred while searching for cars.');
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = async (Car) => {
        if (!stripe) {
            toast.warn("Stripe is not loaded yet. Please wait.");
            return;
        }

        const response = await fetch("/api/CarBook/checkout", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...Car, ...form }),
        });

        const session = await response.json();
        const result = await stripe.redirectToCheckout({ sessionId: session.id });

        if (result.error) {
            toast.error(result.error.message);
        }
    };

    return (
        <>
            <div className="p-8 bg-[#f8f9fa] text-gray-700 min-h-screen">
                <ToastContainer />
                <h1 className="text-3xl text-gray-700 font-bold mb-6">Car Rental</h1>

                <div className="grid grid-cols-1  md:grid-cols-3 gap-6">
                    {/* 🚗 Car Rental Form */}
                    <div className="p-4 bg-[#f8f9fa] lg:h-[70vh] rounded-2xl">
                        <form onSubmit={handleSearch}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Pickup Location</label>
                                    <input
                                        type="text"
                                        placeholder="City or Airport"
                                        value={form.from}
                                        onChange={(e) => setForm({ ...form, from: e.target.value })}
                                        required
                                        className="w-full p-2 border rounded-lg"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Drop-off Location</label>
                                    <input
                                        type="text"
                                        placeholder="City or Airport"
                                        value={form.to}
                                        onChange={(e) => setForm({ ...form, to: e.target.value })}
                                        required
                                        className="w-full p-2 border rounded-lg"
                                    />
                                </div>

                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="w-full">
                                        <label className="block text-sm font-medium mb-2">Pickup Date</label>
                                        <input
                                            type="date"
                                            value={form.departureDate}
                                            onChange={(e) => setForm({ ...form, departureDate: e.target.value })}
                                            required
                                            className="w-full p-2 border rounded-lg"
                                        />
                                    </div>

                                    <div className="w-full">
                                        <label className="block text-sm font-medium mb-2">Drop-off Time</label>
                                        <input
                                            type="time"
                                            value={form.time}
                                            onChange={(e) => setForm({ ...form, time: e.target.value })}
                                            required
                                            className="w-full p-2 border rounded-lg"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Car Type</label>
                                    <select
                                        value={form.type}
                                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                                        required
                                        className="lg:w-full p-2 border rounded-lg"
                                    >
                                        <option value="">Select a car type</option>
                                        <option value="Economy">Economy</option>
                                        <option value="Sedan">Sedan</option>
                                        <option value="Suv">SUV</option>
                                        <option value="Luxury">Luxury</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
                                >
                                    {loading ? 'Searching...' : 'Search Cars'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* 🚙 Available Cars */}
                    <div className="col-span-2">
                        <h2 className="text-2xl mt-4 font-semibold">Available Cars</h2>
                        {loading ? (
                            <div className="flex justify-center items-center lg:h-full h-[40.8vh]" >
                                <Lottie animationData={animationData1} loop className="lg:h-[30vh] h-[15vh]" />
                            </div>
                        ) : cars?.length > 0 ? (
                            <div className="grid grid-cols-2    md:grid-cols-2 lg:gap-4 h-[39vh] lg:h-[70vh] lg:p-6 overflow-y-auto">
                                {cars[0]?.data?.results?.map((car, i) => (
                                    <div key={i} className="lg:p-4  bg-white lg:h-[20vh]  grid h-[12vh]  p-2 m-1  shadow-md rounded-2xl">
                                        <div className="flex items-center gap-1  lg:gap-4">
                                            {car.imageUrl && (
                                                <img src={car.imageUrl} alt="Car" className="lg:w-24 w-16 lg:h-16 object-contain rounded-lg" />
                                            )}
                                            <div>
                                                <h3 className="lg:text-lg text-[13px] h-[2vh] lg:h-full overflow-hidden font-bold">{car.supplierName}</h3>
                                                <p className="lg:text-sm text-[10px] text-gray-600">{form?.type} | {car.passengerCapacity} seat</p>
                                            </div>
                                        </div>
                                        <button onClick={() => handlePayment(car)} className=" w-full  text-xs lg:text-base    bg-green-500 hover:bg-green-600 text-white  rounded-lg">
                                            Pay Now
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <Lottie animationData={animationData} loop className="lg:h-[70vh] bg-[#f8f9fa]" />
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
