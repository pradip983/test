"use client"
import { time } from "framer-motion";
import React from "react";
import { useState } from "react";


const CarRentalPage = () => {
    const [form, setForm] = useState({ from: '', to: '', departureDate: '', time: '', type: '', firstid: "", secondid: "" });
    const [cars, setCars] = useState();
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Mock API call
            const response1 = await fetch('/api/CarBook/SearchCar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!response1.ok) throw new Error('Failed to fetch flights');

            const data1 = await response1.json();

            const firstid = data1[0].data[0].googlePlaceId; // Assuming `data1.data` is an array
            if (!firstid) throw new Error('No destinations found');
            const secondid = data1[1].data[0].googlePlaceId; // Assuming `data1.data` is an array
            if (!secondid) throw new Error('No destinations found');

            const response2 = await fetch('/api/CarBook/SearchDest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, firstid: firstid, secondid: secondid }),
            });

            if (!response2.ok) throw new Error('Failed to fetch flights');

            const data2 = await response2.json();
            setCars(data2);


        } catch (error) {
            
            alert('An error occurred while searching for flights.');
        } finally {
            setLoading(false);
        }
    };











    return (
        <div className="p-8 bg-[#f8f9fa] text-gray-700  min-h-screen">
            <h1 className="text-3xl text-gray-700 font-bold mb-6">Car Rental</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-white shadow-lg rounded-2xl">
                    <h2 className="text-xl font-semibold mb-4">Find Your Rental Car</h2>

                    <form onSubmit={handleSearch} >
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Pickup Location</label>
                                <input
                                    type="text"
                                    placeholder="City or Airport"
                                    value={form.from}
                                    onChange={(e) => setForm({ ...form, from: e.target.value })}
                                    required
                                    className="w-full p-2 border rounded-lg" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Drop-off Location</label>
                                <input type="text" placeholder="City or Airport"
                                    value={form.to}
                                    onChange={(e) => setForm({ ...form, to: e.target.value })}
                                    required
                                    className="w-full p-2 border rounded-lg" />
                            </div>

                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-full">
                                    <label className="block text-sm font-medium mb-2">Pickup Date</label>
                                    <input type="date"
                                        value={form.departureDate}
                                        onChange={(e) => setForm({ ...form, departureDate: e.target.value })}
                                        required
                                        className="w-full p-2 border rounded-lg" />
                                </div>

                                <div className="w-full">
                                    <label className="block text-sm font-medium mb-2">Drop-off Date</label>
                                    <input type="time"
                                        value={form.time}
                                        onChange={(e) => setForm({ ...form, time: e.target.value })}
                                        required
                                        className="w-full p-2 border rounded-lg" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Car Type</label>
                                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} required className="w-full p-2 border rounded-lg" >
                                    <option value="">Select a car type</option>
                                    <option value="Economy">Economy</option>
                                    <option value="Sedan">Sedan</option>
                                    <option value="Suv">SUV</option>
                                    <option value="Luxury">Luxury</option>
                                </select>
                            </div>

                            <button type="submit" disabled={loading} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"> {loading ? 'Searching...' : 'Search Cars'}</button>
                        </div>
                    </form>
                </div>

                <div className="col-span-2">
                    <h2 className="text-xl font-semibold ">Available Cars</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4  h-[58vh] p-6 overflow-y-auto hide-scrollbar  ">
                        {cars?.[0]?.data?.results?.map((car, i) => (
                            <div key={i} className="p-4 bg-white h-[25vh] shadow-md rounded-2xl">
                                <div className="flex items-center justify-start  gap-4">
                                    <img
                                        src={car.imageUrl}
                                        alt={`Car ${i + 1}`}
                                        className="w-24 h-16 object-contain rounded-lg"
                                    />
                                    <div>
                                        <h3 className="text-lg font-bold">{car.supplierName}</h3>
                                        <p className="text-sm ml-1 text-gray-600">{form?.type} | {car.passengerCapacity} seats</p>
                                        <p className="text-sm ml-1 text-gray-600">₹{car.price.amount * 107}</p>
                                    </div>
                                </div>
                                <button className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg">
                                    Book Now
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarRentalPage;













