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
import Navbar from '@/components/Navbar';




const SuccessHotel = ({ booking }) => {
    const ticketRef = useRef();
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading1, setLoading1] = useState();
     const [showNavbar, setShowNavbar] = useState(false);
    

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

     const handleToggleNavbar = () => {
        setShowNavbar((prev) => !prev);
      };
    
    
      const handleClickOutside = (event) => {
        if (!event.target.closest('.navbar-container') && showNavbar) {
          setShowNavbar(false);
        }
      };
    
      useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, [showNavbar]);


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
        setLoading2(true);
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
            setLoading2(false); // ✅ Now resets state AFTER email is sent
        }
    };

    return (
        <>

         {/* Clickable Area */}
                <div
                  className="fixed top-0 left-0 w-full h-[7vh] z-50 bg-transparent "
                  onClick={handleToggleNavbar}
                ></div>
        
                {/* Navbar */}
                <div
                  className={`fixed top-0 left-0 w-full   z-50 bg-gray-900 text-white navbar-container transition-all duration-200 ${showNavbar ? 'visible opacity-100' : 'invisible opacity-0'
                    }`}
                >
                  <Navbar />
                </div>


            <div className="lg:max-w-4xl mx-auto p-2 lg:p-6 bg-gray-50 shadow-2xl m-3 rounded-2xl border text-black">
                <ToastContainer />
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-800">Hotel Booking</h1>
                    <p className="text-lg text-gray-600 mt-2">
                        Hotel Booked by ExploreIND and explore nearby attractions.
                    </p>
                </header>

                {/* Ticket Section */}
                <div ref={ticketRef} className="lg:p-4 p-1  bg-gray-100 rounded-lg border-2 border-gray-800">
                    <h2 className="text-lg text-gray-600 font-bold text-center mb-4">Hotel Ticket</h2>
                    <p className="font-bold text-gray-600 p-2">hotel_id: {hotel_id}</p>
                    <div className="border border-gray-500 rounded-xl p-1 lg:p-3">
                        <div className="w-full lg:mb-0 mb-2 flex lg:items-center justify-between">
                            <div>
                                <p className="lg:p-2 p-1 text-sm lg:text-base text-gray-600 font-light">Name: {session?.user?.username || "User"}</p>
                                <p className="lg:p-2 p-1 text-sm lg:text-base text-gray-600 font-light">arrival_date: {arrival_date}</p>
                                <p className="lg:p-2 p-1 text-sm lg:text-base text-gray-600 font-light">address: {address}</p>

                            </div>
                            <div>
                                <p className="lg:p-2 p-1 text-sm lg:text-base text-gray-600 font-light">city: {city}</p>
                                <p className="lg:p-2 p-1 text-sm lg:text-base text-gray-600 font-light">depart_date: {departure_date}</p>
                                <p className="lg:p-2 p-1 text-sm lg:text-base text-gray-600 font-light">hotel_name: {hotel_name}</p>

                            </div>
                        </div>
                        <p className="text-center text-sm lg:text-base font-bold text-gray-600">Total Price: ₹{price / 100}</p>
                        <p className="text-center text-sm lg:text-base font-bold text-gray-600">Status: <span className="text-green-600">Confirm</span></p>
                    </div>
                    <p className="text-center font-bold text-gray-600 my-4">Hotel Booked by ExploreIND</p>
                </div>

                {/* Buttons */}
                <button
                    onClick={downloadPDF}
                    className="lg:m-4  m-1 bg-white border border-sky-800 text-sky-800 px-6 py-2 rounded-md hover:bg-[#007bff] hover:text-white transition"
                    disabled={loading}
                >
                    {loading ? "Downloading..." : "Download PDF"}
                </button>

                <button
                    onClick={sendEmail}
                    className="lg:m-4 m-1 bg-white border border-sky-800 text-sky-800 px-6 py-2 rounded-md hover:bg-[#007bff] hover:text-white transition"
                    disabled={loading2}
                >
                    {loading2 ? "Sending..." : "Send Email"}
                </button>

                 <button
                    onClick={handlebook}
                    className="lg:m-4 m-1 bg-white border border-sky-800 text-sky-800 px-6 py-2 rounded-md hover:bg-[#007bff] hover:text-white transition "
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
