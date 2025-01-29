import { NextResponse } from 'next/server';

export async function POST(req) {
  const { location, checkIn, checkOut, dest1, dest2 } = await req.json();
  

  
  // Ensure dest2 is an array
  if (!Array.isArray(dest2) || dest2.length === 0) {
    return NextResponse.json(
      { error: 'No hotel IDs provided in dest2' },
      { status: 400 }
    );
  }

  // Function to fetch hotel details for a single hotel ID
  const fetchHotelDetails = async (hotelId) => {
    const url = new URL('https://booking-com15.p.rapidapi.com/api/v1/hotels/getHotelDetails');
    url.searchParams.append('hotel_id', hotelId);
    url.searchParams.append('adults', '1');
    url.searchParams.append('room_qty', '1');
    url.searchParams.append('units', 'metric');
    url.searchParams.append('temperature_unit', 'c');
    url.searchParams.append('languagecode', 'en-us');
    url.searchParams.append('currency_code', 'EUR');
    url.searchParams.append('arrival_date', checkIn);
    url.searchParams.append('departure_date', checkOut);

   
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
    const hotelDetails = await Promise.all(dest2.map(fetchHotelDetails));

    // Return the array of hotel details
    
    return NextResponse.json(hotelDetails);
  } catch (error) {
  
    return NextResponse.json(
      { error: 'An error occurred while fetching hotel details' },
      { status: 500 }
    );
  }
}
