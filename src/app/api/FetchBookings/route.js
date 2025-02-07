import User from "@/models/User";
import { dbConnect } from "@/lib/dbconnect";
import { NextResponse } from "next/server";
import Booking from "@/models/Booking";

export async function POST(req) {
    try {
        // Parse JSON body
        const { id } = await req.json();
        console.log("Received ID:", id);

        if (!id) {
            return NextResponse.json(
                { error: "User ID is required" },
                { status: 400 }
            );
        }

        // Connect to the database
        await dbConnect();

        // Find the user by ID and populate booking details
        const user = await User.findById(id).populate("booking");

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        console.log("User found:", user.booking);
        return NextResponse.json(user.booking, { status: 200 });

    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json(
            { error: error.message || "An error occurred" },
            { status: 500 }
        );
    }
}
