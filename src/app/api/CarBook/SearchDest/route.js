import { NextResponse } from 'next/server';


export async function POST(req) {
    const { from, to, departureDate, time, type, firstid, secondid } = await req.json();

   

   

    // Function to fetch flight details
    const fetchCarDetails = async (firstid, secondid, departureDate, time) => {
        const url = new URL('https://booking-com15.p.rapidapi.com/api/v1/taxi/searchTaxi');
    url.searchParams.append('pick_up_place_id', firstid);
    url.searchParams.append('drop_off_place_id', secondid);
     url.searchParams.append('currency_code', 'INR');
     url.searchParams.append('pick_up_date', departureDate);
     url.searchParams.append('pick_up_time', time);

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
       
        const CarDetails = await Promise.all([fetchCarDetails(firstid, secondid, departureDate, time)]);
        // Step 3: Return the flight details as a response
        
        return NextResponse.json(CarDetails);
    } catch (error) {
       
        return NextResponse.json(
            { error: 'An error occurred while processing your request.' },
            { status: 500 }
        );
    }
}
