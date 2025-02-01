import nodemailer from "nodemailer";
import { NextResponse } from 'next/server';

export async function POST(req) {



    const { 
        hotel_id,
        arrival_date,
        departure_date,
        hotel_name,
        address,
        city,
        price,
        name } = await req.json();

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: "vasanpradip06@gmail.com", pass: "pebehyoksyvpgsrd" },
    });

    const mailOptions = {
        from: '"ExploreIND" <vasanpradip06@gmail.com>',
        to: "vasanpradip3@gmail.com",
        subject: "Your Hotel Ticket",
        text: `Hello ${name},\n\nHere is your Hotel ticket:\n\nHotel_Id: ${hotel_id}\n\nArrival_Date: ${arrival_date}\n\nDeparture_Date: ${departure_date}\n\nHotel_Name: ${hotel_name}\n\nAddress: ${address}\n\nCity: ${city}\n\nTotal Price: ₹${price / 100}\n\nThank you for choosing us!`,
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
