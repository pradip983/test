import User from "@/models/User";
import { dbConnect } from "@/lib/dbconnect";
import bcrypt from "bcrypt";

export async function POST(req) {
    try {
        const { username, location, bio, image, email, password } = await req.json();

        if (!email || !password) {
            return new Response(
                JSON.stringify({ error: "Email and password are required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Connect to database
        await dbConnect();

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return new Response(
                JSON.stringify({ error: "Invalid credentials" }),
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }

        // Check if password is valid
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return new Response(
                JSON.stringify({ error: "Invalid credentials" }),
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }

        // Update user details
        const updatedUser = await User.findOneAndUpdate(
            { email }, 
            { $set: { username, location, bio, image } },
            { new: true } // Return the updated document
        );

        return new Response(
            JSON.stringify({ message: "Profile updated successfully", user: updatedUser }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );

    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message || "An error occurred" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
