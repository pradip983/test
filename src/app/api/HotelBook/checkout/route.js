import Stripe from "stripe";
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.NEXT_SECRET_STRIPE_SECRET_KEY);

export async function POST(req) {
  const { hotel_id, arrival_date, departure_date, hotel_name, address, city, product_price_breakdown } = await req.json(); 

const price = product_price_breakdown.charges_details.amount.value * 90 * 100 
 

  const successUrl = `${process.env.HOST_URL}HotelBook/Success?hotel_id=${encodeURIComponent(hotel_id)}&arrival_date=${encodeURIComponent(arrival_date)}&departure_date=${encodeURIComponent(departure_date)}&hotel_name=${encodeURIComponent(hotel_name)}&address=${encodeURIComponent(address)}&city=${encodeURIComponent(city)}&price=${encodeURIComponent(price)}`

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        { 
          price_data: { 
            currency: "inr", 
            product_data: { name: "Hotel Book" }, 
            unit_amount: price // Now correctly in paise
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
