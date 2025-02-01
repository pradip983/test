import nodemailer from "nodemailer";
import { NextResponse } from 'next/server';

export async function POST(req) {
  
 

  const { name, id, price, vehicleType, departureDate, time } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: "vasanpradip06@gmail.com", pass: "pebehyoksyvpgsrd" },
  });

  const mailOptions = {
    from: '"ExploreIND" <vasanpradip06@gmail.com>',
    to: "vasanpradip3@gmail.com",
    subject: "Your Car Rental Ticket",
    text: `Hello i your supplier ${name},\n\nHere is your car rental ticket:\n\nBooking ID: ${id}\n\nCarTypr: ${vehicleType}\n\nPickupDate:  ${departureDate}\n\nTime: ${time} \n\nTotal Price: $${price/100}\n\nThank you for choosing us!`,
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
