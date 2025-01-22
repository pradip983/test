import Search from "@/models/Search";
import { dbConnect } from "@/lib/dbconnect";



export async function POST(req) {
  try {
    // Parse the incoming request body
    const { title } = await req.json();

    

    // Validate input fields
    if (!title) {
      return new Response(
        JSON.stringify({ error: "title not exist" }),
        { status: 400, headers: { "Content-Type": "application/json" } } // Bad Request
      );
    }

    // Connect to the database
    await dbConnect();

    // Check if the username already exists in the database
    const SearchUser = await Search.findOne({title});
    

    if (SearchUser) {
      return new Response(
        JSON.stringify(SearchUser),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
        );
    }
    
    return new Response(
      JSON.stringify({ message: "title not match" }),
      { status: 201 }
    );

  } catch (error) {
    // Handle any unexpected errors
    return new Response(
      JSON.stringify({ error: error.message || "An error occurred" }),
      { status: 500, headers: { "Content-Type": "application/json" } } // Internal Server Error
    );
  }
}