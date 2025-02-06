import Stripe from "stripe";
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.NEXT_SECRET_STRIPE_SECRET_KEY);

export async function POST(req) {
  const { price, supplierId, supplierName, vehicleType, departureDate, time, to } = await req.json(); 
  const price1 = price.amount * 80 * 100; // Convert INR to paise
  const successUrl = `${process.env.HOST_URL}CarBook/Success?name=${encodeURIComponent(supplierName)}&id=${encodeURIComponent(supplierId)}&price=${encodeURIComponent(price1)}&vehicleType=${encodeURIComponent(vehicleType)}&departureDate=${encodeURIComponent(departureDate)}&time=${encodeURIComponent(time)}&to=${encodeURIComponent(to)}`;



  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        { 
          price_data: { 
            currency: "inr", 
            product_data: { name: "Car Rental" }, 
            unit_amount: price1 // Now correctly in paise
          }, 
          quantity: 1 
        }
      ],
      mode: "payment",
      success_url: successUrl, // Redirect after success
      cancel_url: `${process.env.HOST_URL}ServicePage/`,
    });

    return NextResponse.json({ id: session.id }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
