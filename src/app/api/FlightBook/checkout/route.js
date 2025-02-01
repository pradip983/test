import Stripe from "stripe";
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.NEXT_SECRET_STRIPE_SECRET_KEY);

export async function POST(req) {
  const { tripType, segments, priceBreakdown } = await req.json(); 

 
 

  const seat = segments[0].legs[0].carriers[0];
  const number = segments[0].legs[0].flightInfo.flightNumber;
  const departure = segments[0].departureTime;
  const departureAirport = segments[0].departureAirport.code;
  const arrival = segments[0].arrivalTime;
  const arrivalAirport = segments[0].arrivalAirport.code;
  const baggage = segments[0].travellerCheckedLuggage[0].luggageAllowance.maxWeightPerPiece;
  const price1 = priceBreakdown.total.units * 100;
  const airline = segments[0].legs[0].carriersData[0].name
  const cabinclass = segments[0].legs[0].cabinClass 

  const successUrl = `${process.env.HOST_URL}FlightBook/Success?tripType=${encodeURIComponent(tripType)}&seat=${encodeURIComponent(seat)}&flightNumber=${encodeURIComponent(number)}&departureTime=${encodeURIComponent(departure)}&departureAirport=${encodeURIComponent(departureAirport)}&arrivalTime=${encodeURIComponent(arrival)}&arrivalAirport=${encodeURIComponent(arrivalAirport)}&baggage=${encodeURIComponent(baggage)}&price=${encodeURIComponent(price1)}&airline=${encodeURIComponent(airline)}&cabinclass=${encodeURIComponent(cabinclass)}`;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        { 
          price_data: { 
            currency: "inr", 
            product_data: { name: "Flight Book" }, 
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
