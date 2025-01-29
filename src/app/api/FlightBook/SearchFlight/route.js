import { NextResponse } from 'next/server';
import fs from 'fs';

export async function POST(req) {
    const { from, to, departureDate, returnDate, firstid, secondid } = await req.json();

    

   

    // Function to fetch flight details
    const fetchFlightDetails = async (firstid, secondid, departure, returnDate) => {
        const url = new URL('https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights');
    url.searchParams.append('fromId', firstid);
    url.searchParams.append('toId', secondid);
     url.searchParams.append('adults', '1');
     url.searchParams.append('cabinClass', 'ECONOMY');
     url.searchParams.append('currency_code', 'INR');
     url.searchParams.append('departDate', departure);
     url.searchParams.append('returnDate', returnDate);

        const options = {
            method: 'GET',
            headers: {
              'x-rapidapi-key': process.env.X_RAPIDAPI_KEY, // Replace with actual API key
              'x-rapidapi-host': process.env.X_RAPIDAPI_HOS,
            },
          };

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                
                return { error: `Failed to fetch flight details: ${response.statusText}` };
            }

            const data = await response.json();

            
           

            return data;
        } catch (error) {
            
            return { error: 'An error occurred while fetching flight details.' };
        }
    };

    try {
        // Step 1: Get the access token
       // const token = await getAccessToken();

        // Step 2: Fetch flight details for the provided origin and destination
        //const flightDetails = await fetchFlightDetails(firstid, secondid, departureDate, returnDate);
        const FlightDetails = await Promise.all([fetchFlightDetails(firstid, secondid, departureDate, returnDate)]);
        // Step 3: Return the flight details as a response
     
        return NextResponse.json(FlightDetails);
    } catch (error) {
       
        return NextResponse.json(
            { error: 'An error occurred while processing your request.' },
            { status: 500 }
        );
    }
}
