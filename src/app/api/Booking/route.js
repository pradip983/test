import { dbConnect } from "@/lib/dbconnect";
import Booking from "@/models/Booking";
import User from "@/models/User";

export async function POST(req) {

   

        try {
           

           const {user, name, id, date, price, place  } = await req.json();

           if (!user || !name || !id || !date || !price || !place) {
            return new Response(
                JSON.stringify({ error: "all fields  are required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        await dbConnect();

            
            const newBooking = await Booking.create({
                user: user,
                name,
                id,
                date,
                price,
                place
            });

           
            await User.findByIdAndUpdate(user, {
                $push: { booking: newBooking._id },
            });

            return new Response(
                JSON.stringify({ message: "Booking saved successfully", Booking: newBooking }),
                { status: 200, headers: { "Content-Type": "application/json" } }
            );

           
        } catch (error) {
            return new Response(
                JSON.stringify({ error: error.message || "An error occurred" }),
                { status: 500, headers: { "Content-Type": "application/json" } }
            );
        }
    
}
