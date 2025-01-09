// app/api/signin/route.js


import User from "@/models/User";
import { dbConnect } from "@/lib/dbconnect";


// Named export for POST method (handles sign-in)
export async function POST(req) {
  // Parse JSON body
  const { username, password } = await req.json();

  // Ensure the username and password are provided
  if (!username || !password) {
    return new Response(
      JSON.stringify({ error: "Username and password are required" }),
      { status: 400 }
    );
  }

  try {
    // Connect to the database
    await dbConnect();

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return new Response(
        JSON.stringify({ error: "Invalid credentials" }),
        { status: 401 }
      );
    }

    // Set the cookie with user session information (HttpOnly)
    const headers = new Headers();
    headers.set("Set-Cookie", `user=${user.username}; HttpOnly; Path=/; Max-Age=3600;`);

    // Return a success response with message
    return new Response(
      JSON.stringify({ message: "Signed in successfully" }),
      { status: 200, headers }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400 }
    );
  }
}
