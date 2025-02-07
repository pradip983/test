import { dbConnect } from "@/lib/dbconnect";
import Review from "@/models/Review";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();

        const reviews = await Review.find({});

        if (!reviews || reviews.length === 0) {
            return NextResponse.json({ message: "No reviews found" }, { status: 404 });
        }

        return NextResponse.json(reviews, { status: 200 });
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
