"use client";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Footer from "@/components/Footer";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";




const SuccessHotel = ({ booking }) => {
    const ticketRef = useRef();
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState();
    

    const hotel_id = searchParams.get("hotel_id") || "Unknown tripeType";
    const arrival_date = searchParams.get("arrival_date") || "N/A";
    const departure_date = searchParams.get("departure_date") || "0";
    const hotel_name = searchParams.get("hotel_name") || "Unknown";
    const address = searchParams.get("address") || "N/A";
    const city = searchParams.get("city") || "N/A";
    const price = searchParams.get("price") || "N/A";

    const [form, setForm] = useState({ name: "Hotel", id: hotel_id, date: departure_date, price: price, place: city, user: "" })

    useEffect(() => {

        toast.success("Payment successfully")
        toast.success("Your booking ticket")

    }, [])


   
    const handlebook = async () => {
        setLoading1(true);
        if ( session?.user?.id) {  // Ensure user ID is available before running
            const saveBooking = async () => {
                try {
                    const response = await fetch("/api/Booking", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ ...form, user: session.user.id }),
                    });

                    if (!response.ok) throw new Error("Failed to save booking");

                    const data = await response.json();
                    toast.success(data.message || "Booking saved successfully");

                   

                } catch (error) {
                    toast.error("An unexpected error occurred. Please try again.", { autoClose: 2000 });
                }
            };

            saveBooking();
        }
    }


    const downloadPDF = async () => {
        setLoading(true);
        const input = ticketRef.current;
        if (!input) return;

        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF();
                pdf.addImage(imgData, "PNG", 14, 20, 180, 100);
                pdf.save(`Car_Rental_Ticket_${hotel_id}.pdf`);
            })
            .finally(() => setLoading(false), toast.success("pdf download successfully")); // ✅ Now resets state AFTER PDF is saved
    };


    const sendEmail = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/HotelBook/sendemail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    hotel_id,
                    arrival_date,
                    departure_date,
                    hotel_name,
                    address,
                    city,
                    price,
                    name: session?.user?.username
                }
                ),
            });

            if (response.ok) toast.success("Email sent successfully!");
            else toast.warn("Failed to send email.");
        } catch (error) {
            console.error("Error sending email:", error);
        } finally {
            setLoading(false); // ✅ Now resets state AFTER email is sent
        }
    };

    return (
        <>
            <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow-2xl m-3 rounded-2xl border text-black">
                <ToastContainer />
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-800">Hotel Booking</h1>
                    <p className="text-lg text-gray-600 mt-2">
                        Hotel Booked by ExploreIND and explore nearby attractions.
                    </p>
                </header>

                {/* Ticket Section */}
                <div ref={ticketRef} className="p-4 bg-gray-100 rounded-lg border-2 border-gray-800">
                    <h2 className="text-lg text-gray-600 font-bold text-center mb-4">Hotel Ticket</h2>
                    <p className="font-bold text-gray-600 p-2">hotel_id: {hotel_id}</p>
                    <div className="border border-gray-500 rounded-xl p-3">
                        <div className="w-full flex items-center justify-between">
                            <div>
                                <p className="p-2 text-base text-gray-600 font-light">Name: {session?.user?.username || "User"}</p>
                                <p className="p-2 text-base text-gray-600 font-light">arrival_date: {arrival_date}</p>
                                <p className="p-2 text-base text-gray-600 font-light">address: {address}</p>

                            </div>
                            <div>
                                <p className="p-2 text-base text-gray-600 font-light">hotel_name: {hotel_name}</p>
                                <p className="p-2 text-base text-gray-600 font-light">departure_date: {departure_date}</p>
                                <p className="p-2 text-base text-gray-600 font-light">city: {city}</p>

                            </div>
                        </div>
                        <p className="text-center font-bold text-gray-600">Total Price: ₹{price / 100}</p>
                        <p className="text-center font-bold text-gray-600">Status: <span className="text-green-600">Confirm</span></p>
                    </div>
                    <p className="text-center font-bold text-gray-600 my-4">Hotel Booked by ExploreIND</p>
                </div>

                {/* Buttons */}
                <button
                    onClick={downloadPDF}
                    className="m-4 bg-white border border-sky-800 text-sky-800 px-6 py-2 rounded-md hover:bg-[#007bff] hover:text-white transition"
                    disabled={loading}
                >
                    {loading ? "Downloading..." : "Download PDF"}
                </button>

                <button
                    onClick={sendEmail}
                    className="m-4 bg-white border border-sky-800 text-sky-800 px-6 py-2 rounded-md hover:bg-[#007bff] hover:text-white transition"
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Send Email"}
                </button>

                 <button
                    onClick={handlebook}
                    className="m-4 bg-white border border-sky-800 text-sky-800 px-6 py-2 rounded-md hover:bg-[#007bff] hover:text-white transition "
                    disabled={loading1}
                >
                    {loading1 ? "Saved" : "Save Booking"}
                </button> 
            </div>
            <Footer />





        </>
    );
};

export default SuccessHotel;
