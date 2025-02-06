import User from "@/models/User";
import { dbConnect } from "@/lib/dbconnect";
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { id } = await req.json();
        console.log(id);

        // Check if the id is provided
        if (!id) {
            return NextResponse.json(
                { error: "ID is required" },
                { status: 400 }
            );
        }

        // Connect to database
        await dbConnect();

        // Find the user by ID and populate the booking data
        const user = await User.findById(id).populate("booking");
        
        // Handle user not found scenario
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Return the booking data
        console.log(user.booking)
        return NextResponse.json(user.booking, { status: 200 });
        
    } catch (error) {
        return NextResponse.json(
            { error: error.message || "An error occurred" },
            { status: 500 }
        );
    }
}
