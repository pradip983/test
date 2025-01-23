import Search from "@/models/Search";
import { dbConnect } from "@/lib/dbconnect";
import { headers } from "next/headers";

export async function POST(req) {

  try {

    const { title } = await req.json();


    if (!title) {
      return new Response(
        JSON.stringify({ error: "title is not exist" }),
        { status: 400, headers: { "Content-Type": "application/json" } } // Bad Request
      );
    }

    // Connect to the database
    await dbConnect();

    // Check if the username already exists in the database

    const SearchUser = await Search.findOne({ title: title });



    if (SearchUser) {
      return new Response(
        JSON.stringify(SearchUser),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    else {
      return new Response(
        JSON.stringify({ message: "title not match" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || "An error occurred" }),
      { status: 500, headers: { "Content-Type": "application/json" } } // Internal Server Error
    );
  }

}