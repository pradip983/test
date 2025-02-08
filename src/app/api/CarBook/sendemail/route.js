import nodemailer from "nodemailer";
import { NextResponse } from 'next/server';
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function POST(req) {

  const session = await getServerSession( authOptions );

  const userEmail = session?.user?.email;
  
  const { name, id, price, vehicleType, departureDate, time } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: "exploreind142@gmail.com", pass: "zmedjegbraqauwmr" },
  });

  const mailOptions = {
    from: '"ExploreIND" <vasanpradip06@gmail.com>',
    to: userEmail,
    subject: "Your Car Rental Ticket",
    text: `Hello i your supplier ${name},\n\nHere is your car rental ticket:\n\nBooking ID: ${id}\n\nCarTypr: ${vehicleType}\n\nPickupDate:  ${departureDate}\n\nTime: ${time} \n\nTotal Price: $${price / 100}\n\nThank you for choosing us!`,
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
