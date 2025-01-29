import { NextResponse } from 'next/server';

export async function POST(req) {
  const { from, to, departureDate, returnDate } = await req.json();
  
 
  
  
  

  // Function to fetch hotel details for a single hotel ID
  const fetchHotelDetails = async (flightid) => {
    const url = new URL('https://booking-com15.p.rapidapi.com/api/v1/flights/searchDestination');
    url.searchParams.append('query', flightid);
    // url.searchParams.append('adults', '1');
    // url.searchParams.append('room_qty', '1');
    // url.searchParams.append('units', 'metric');
    // url.searchParams.append('temperature_unit', 'c');
    // url.searchParams.append('languagecode', 'en-us');
    // url.searchParams.append('currency_code', 'EUR');
    // url.searchParams.append('arrival_date', checkIn);
    // url.searchParams.append('departure_date', checkOut);

   
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
       
        return { error: `Failed to fetch details for hotel ID ${hotelId}` };
      }
      const data = await response.json();
      return data;
    } catch (error) {
     
      return { error: `Error fetching hotel ID ${hotelId}` };
    }
  };

  try {
    // Use Promise.all to fetch details for all hotel IDs in parallel
    const FlightDetails = await Promise.all([fetchHotelDetails(from),fetchHotelDetails(to)]);

    // Return the array of hotel details
   
    return NextResponse.json(FlightDetails);
  } catch (error) {
    
    return NextResponse.json(
      { error: 'An error occurred while fetching hotel details' },
      { status: 500 }
    );
  }
}
