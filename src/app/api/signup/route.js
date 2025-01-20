// app/api/signup/route.js

import User from "@/models/User";
import { dbConnect } from "@/lib/dbconnect";

export async function POST(req) {
  // Parse the incoming request body
  const { username, password } = await req.json();

  // Validate input fields
  if (!username || !password) {
    return new Response(
      JSON.stringify({ error: "Username and password are required" }),
      { status: 400 } // Bad Request
    );
  }

  try {
    // Connect to the database
    await dbConnect();

    // Check if the username already exists in the database
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "Username already exists. Please choose another username." }),
        { status: 409 } // Conflict
      );
    }

    // Create a new user instance
    const user = new User({
      username,
      password, // Note: Hash the password in a real application
    });

    // Save the new user to the database
    await user.save();

    // Set a cookie for the newly signed-up user
    const headers = new Headers();
    headers.set("Set-Cookie", `user=${user.username}; HttpOnly; Path=/; Max-Age=3600;`);

    // Return a success response
    return new Response(
      JSON.stringify({ message: "User created successfully" }),
      { status: 201, headers }
    );

  } catch (error) {
    // Handle any unexpected errors
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 } // Internal Server Error
    );
  }
}
