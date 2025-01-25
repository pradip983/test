import { NextResponse } from 'next/server';

export async function POST(req) {
  const { location, checkIn, checkOut } = await req.json();
  

  // Construct the URL dynamically
  const url = new URL('https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination');
  url.searchParams.append('query', location); 
//   url.searchParams.append('adults', '1');
//   url.searchParams.append('room_qty', '1');
//   url.searchParams.append('units', 'metric');
//   url.searchParams.append('temperature_unit', 'c');
//   url.searchParams.append('languagecode', 'en-us');
//   url.searchParams.append('currency_code', 'EUR');
//   url.searchParams.append('arrival_date', checkIn); 
//   url.searchParams.append('departure_date', checkOut);

  
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': process.env.X_RAPIDAPI_KEY, // Replace with actual API key
    'x-rapidapi-host': process.env.X_RAPIDAPI_HOS,
  },
};

  try {
    // Fetch data from the API
    const response = await fetch(url, options);

    // Check if the response is OK
    if (!response.ok) {
     
      return NextResponse.json(
        { error: 'Failed to fetch hotel details' },
        { status: response.status }
      );
    }

    // Parse JSON response
    const data = await response.json();
    

    return NextResponse.json(data);
  } catch (error) {
   
    return NextResponse.json(
      { error: 'An error occurred while fetching data' },
      { status: 500 }
    );
  }
}
