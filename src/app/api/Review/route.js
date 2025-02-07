import Review from "@/models/Review";
import { dbConnect } from "@/lib/dbconnect";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await dbConnect();

        const { name, comment: userComment, img } = await req.json();
        console.log(name, userComment, img);

        const newComment = await Review.create({ 
            username: name, 
            image: img, 
            comment: userComment 
        });

        if (!newComment) {
            return NextResponse.json({ message: "Comment not created" }, { status: 500 });
        }

        return NextResponse.json({ message: "Comment saved successfully" }, { status: 201 });

    } catch (error) {
        console.error("Error creating comment:", error);
        return NextResponse.json(
            { error: "An error occurred while processing your request." },
            { status: 500 }
        );
    }
}
