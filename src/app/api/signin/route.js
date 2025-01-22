import User from "@/models/User";
import { dbConnect } from "@/lib/dbconnect";
import bcrypt from "bcrypt";

// Named export for POST method (handles sign-in)
export async function POST(req) {
  try {
    // Parse JSON body
    const { username, password } = await req.json();

    // Ensure the username and password are provided
    if (!username || !password) {
      return new Response(
        JSON.stringify({ error: "Username and password are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Connect to the database
    await dbConnect();

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid credentials" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ error: "Invalid credentials" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Set the cookie with user session information (HttpOnly and Secure for production)
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

    // Return a success response with message
    return new Response(
      JSON.stringify({ message: "Signed in successfully" }),
      { status: 200, headers }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || "An error occurred" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
