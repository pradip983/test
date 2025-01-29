import { NextResponse } from 'next/server';


export async function POST(req) {
    const { from, to, departureDate, time, type, } = await req.json();

    

    
   

    // Function to fetch flight details
    const fetchCarDetails = async (firstid) => {
        const url = new URL('https://booking-com15.p.rapidapi.com/api/v1/taxi/searchLocation');
    url.searchParams.append('query', firstid);
    // url.searchParams.append('toId', secondid);
    //  url.searchParams.append('adults', '1');
    //  url.searchParams.append('cabinClass', 'ECONOMY');
    //  url.searchParams.append('currency_code', 'INR');
    //  url.searchParams.append('departDate', departure);
    //  url.searchParams.append('returnDate', returnDate);

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
       
        const CarDetails = await Promise.all([fetchCarDetails(from), fetchCarDetails(to)]);
        
        return NextResponse.json(CarDetails);
    } catch (error) {
        
        return NextResponse.json(
            { error: 'An error occurred while processing your request.' },
            { status: 500 }
        );
    }
}
