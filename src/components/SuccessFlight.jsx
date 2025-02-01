"use client";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Footer from "@/components/Footer";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import SuccessCar from "./SuccessCar";

const SuccessFlight = () => {
    const ticketRef = useRef();
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);

    const tripType = searchParams.get("tripType") || "Unknown tripeType";
    const seat = searchParams.get("seat") || "N/A";
    const flightNumber = searchParams.get("flightNumber") || "0";
    const departureTime = searchParams.get("departureTime") || "Unknown";
    const departureAirport = searchParams.get("departureAirport") || "N/A";
    const arrivalTime = searchParams.get("arrivalTime") || "N/A";
    const arrivalAirport = searchParams.get("arrivalAirport") || "N/A";
    const baggage = searchParams.get("baggage") || "N/A";
    const price = searchParams.get("price") || "N/A";
    const cabinclass = searchParams.get("cabinclass") || "N/A";
    const airline = searchParams.get("airline") || "N/A";

    const [ticket, setTicket] = useState({
        passenger: "John Doe",
        bookingRef: "EXP123456",
        flightNumber: "AI202",
        airline: "Air India",
        departure: {
            dateTime: "2025-02-10 10:30 AM",
            airport: "Indira Gandhi International Airport, Delhi (DEL)"
        },
        arrival: {
            dateTime: "2025-02-10 2:30 PM",
            airport: "Chhatrapati Shivaji International Airport, Mumbai (BOM)"
        },
        seat: "12A",
        class: "Economy",
        baggage: "20kg Checked + 7kg Cabin",
        price: "₹5,500",
        status: "Confirmed"
    });

    const downloadPDF = async () => {
        setLoading(true);
        const input = ticketRef.current;
        if (!input) return;

        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF();
                pdf.addImage(imgData, "PNG", 14, 20, 180, 100);
                pdf.save(`Car_Rental_Ticket_${tripType}.pdf`);
            })
            .finally(() => setLoading(false)); // ✅ Now resets state AFTER PDF is saved
    };

    const sendEmail = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/FlightBook/sendemail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tripType,
                    seat,
                    flightNumber,
                    departureTime,
                    departureAirport,
                    arrivalTime,
                    arrivalAirport,
                    baggage,
                    price,
                    cabinclass,
                    airline,
                    name: session?.user?.username
                }
                ),
            });

            if (response.ok) alert("Email sent successfully!");
            else alert("Failed to send email.");
        } catch (error) {
            console.error("Error sending email:", error);
        } finally {
            setLoading(false); // ✅ Now resets state AFTER email is sent
        }
    };




    return (
        <>
            <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow-2xl m-3 rounded-2xl border text-black">
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-800">Flight Booking</h1>
                    <p className="text-lg text-gray-600 mt-2">
                        Flight Booked by ExploreIND and explore nearby attractions.
                    </p>
                </header>

                {/* Ticket Section */}
                <div ref={ticketRef} className="p-4 bg-gray-100 rounded-lg border-2 border-gray-800">
                    <h2 className="text-lg text-gray-600 font-bold text-center mb-4">Flight Ticket</h2>
                    <p className="font-bold text-gray-600 p-2">Booking Type: {tripType}</p>
                    <div className="border border-gray-500 rounded-xl p-3">
                        <div className="w-full flex items-center justify-between">
                            <div>
                                <p className="p-2 text-base text-gray-600 font-light">Passenger Name: {session?.user?.username || "User"}</p>
                                <p className="p-2 text-base text-gray-600 font-light">FlightNo: {flightNumber}</p>
                                <p className="p-2 text-base text-gray-600 font-light">Airline: {airline}</p>
                                <p className="p-2 text-base text-gray-600 font-light">Departure: {departureTime}</p>
                                <p className="p-2 text-base text-gray-600 font-light">Airport: {departureAirport}</p>
                            </div>
                            <div>
                                <p className="p-2 text-base text-gray-600 font-light">Arrival: {arrivalTime}</p>
                                <p className="p-2 text-base text-gray-600 font-light">Airport: {arrivalAirport}</p>
                                <p className="p-2 text-base text-gray-600 font-light">Seat: {seat}</p>
                                <p className="p-2 text-base text-gray-600 font-light">Class: {cabinclass}</p>
                                <p className="p-2 text-base text-gray-600 font-light">Baggage: 33/KG</p>
                            </div>
                        </div>
                        <p className="text-center font-bold text-gray-600">Total Price: ₹{price / 100}</p>
                        <p className="text-center font-bold text-gray-600">Status: <span className="text-green-600">Confirm</span></p>
                    </div>
                    <p className="text-center font-bold text-gray-600 my-4">Flight Booked by ExploreIND</p>
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
            </div>




           
            <Footer />
        </>
    );
};

export default SuccessFlight;
