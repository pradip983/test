import nodemailer from "nodemailer";
import { NextResponse } from 'next/server';
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function POST(req) {
  
  const session = await getServerSession( authOptions );

  const userEmail = session?.user?.email;
 

  const { tripType,
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
    name } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: "exploreind142@gmail.com", pass: "zmedjegbraqauwmr" },
  });

  const mailOptions = {
    from: '"ExploreIND" <vasanpradip06@gmail.com>',
    to: userEmail,
    subject: "Your Flight Ticket",
    text: `Hello ${name},\n\nHere is your Flight ticket:\n\nTripType: ${tripType}\n\nFlightNumber: ${flightNumber}\n\nSeat: ${seat}\n\nDepartureTime: ${departureTime}\n\nDepartureAirport: ${departureAirport}\n\nArrivalTime: ${arrivalTime}\n\nArrivalAirport: ${arrivalAirport}\n\nBaggage: 33/KG\n\nCabinclass: ${cabinclass}\n\nAirline: ${airline}\n\nTotal Price: ₹${price / 100}\n\nThank you for choosing us!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
   
  } catch (error) {
    return NextResponse.json(
        { error: 'An error occurred while processing your request.' },
        { status: 500 }
    );
  }
}
