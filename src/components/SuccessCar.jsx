"use client";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Footer from "@/components/Footer";
import { useSearchParams } from "next/navigation";

const SuccessCar = () => {
  const ticketRef = useRef();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  // Get query parameters from URL
  const name = searchParams.get("name") || "Unknown Supplier";
  const id = searchParams.get("id") || "N/A";
  const price = searchParams.get("price") || "0";
  const vehicleType = searchParams.get("vehicleType") || "Unknown";
  const departureDate = searchParams.get("departureDate") || "N/A";
  const time = searchParams.get("time") || "N/A";

  // Function to Download PDF
  const downloadPDF = async () => {
    setLoading(true);
    const input = ticketRef.current;
    if (!input) return;

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 14, 20, 180, 100);
        pdf.save(`Car_Rental_Ticket_${id}.pdf`);
      })
      .finally(() => setLoading(false)); // ✅ Now resets state AFTER PDF is saved
  };

  // Function to Send Email
  const sendEmail = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/CarBook/sendemail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, id, price, vehicleType, departureDate, time }),
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
          <h1 className="text-4xl font-extrabold text-gray-800">Car Booking</h1>
          <p className="text-lg text-gray-600 mt-2">
            Car Booked by ExploreIND and explore nearby attractions.
          </p>
        </header>

        {/* Ticket Section */}
        <div ref={ticketRef} className="p-4 bg-gray-100 rounded-lg border-2 border-gray-800">
          <h2 className="text-lg text-gray-600 font-bold text-center mb-4">Car Rental Ticket</h2>
          <p className="font-bold text-gray-600 p-2">Booking ID: {id}</p>
          <div className="border border-gray-500 rounded-xl p-3">
            <div className="w-full flex items-center justify-between">
              <div>
                <p className="p-2 text-base text-gray-600 font-light">Supplier Name: {name}</p>
                <p className="p-2 text-base text-gray-600 font-light">Vehicle Type: {vehicleType}</p>
              </div>
              <div>
                <p className="p-2 text-base text-gray-600 font-light">Pickup Time: {time}</p>
                <p className="p-2 text-base text-gray-600 font-light">Pickup Date: {departureDate}</p>
              </div>
            </div>
            <p className="text-center font-bold text-gray-600">Total Price: ₹{price / 100}</p>
          </div>
          <p className="text-center font-bold text-gray-600 my-4">Car Booked by ExploreIND</p>
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

export default SuccessCar;