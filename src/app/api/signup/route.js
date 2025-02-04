import User from "@/models/User";
import { dbConnect } from "@/lib/dbconnect";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    // Parse the incoming request body
    const { username, password ,email, location, image, bio } = await req.json();
 

    // Validate input fields
    if (!username || !password || !email || !location || !image || !bio) {
      return new Response(
        JSON.stringify({ error: "All fields  are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } } // Bad Request
      );
    }

    // Connect to the database
    await dbConnect();

    // Check if the username already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "Email already exists. Please choose another email." }),
        { status: 409, headers: { "Content-Type": "application/json" } } // Conflict
      );
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const user = new User({
      username,
      password: hashedPassword,
      email,
      location,
      image,
      bio
    });

    // Save the new user to the database
    await user.save();

    // Set a secure cookie for the newly signed-up user
    const headers = new Headers();
    const cookieOptions = [
      `user=${user.username}`,
      "HttpOnly",
      "Path=/",
      `Max-Age=${3600}`, // 1 hour
      process.env.NODE_ENV === "production" ? "Secure" : null, // Add Secure flag in production
      "SameSite=Strict", // Prevent CSRF
    ]
      .filter(Boolean)
      .join("; ");
    headers.set("Set-Cookie", cookieOptions);

    // Return a success response
    return new Response(
      JSON.stringify({ message: "User created successfully" }),
      { status: 201, headers }
    );
  } catch (error) {
    // Handle any unexpected errors
    return new Response(
      JSON.stringify({ error: error.message || "An error occurred" }),
      { status: 500, headers: { "Content-Type": "application/json" } } // Internal Server Error
    );
  }
}
