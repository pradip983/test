// app/api/signup/route.js

import User from "@/models/User";
import { dbConnect } from "@/lib/dbconnect";

export async function POST(req) {
  await dbConnect();

  const { username, password } = await req.json(); // Get the request body

  if (!username || !password) {
    return new Response(
      JSON.stringify({ error: "Username and password are required" }),
      { status: 400 }
    );
  }

  try {
    const user = new User({
      username,
      password, // Save password as plain text (not recommended for production)
    });

    await user.save();
    return new Response(
      JSON.stringify({ message: "User created successfully" }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
