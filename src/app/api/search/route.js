import Search from "@/models/Search";
import { dbConnect } from "@/lib/dbconnect";



export async function GET(req) {
  try {
 

    // Connect to the database
    await dbConnect();

    // Check if the username already exists in the database
    const SearchUser = await Search.find({});
    
    

    if (SearchUser) {
      return new Response(
        JSON.stringify(SearchUser),
        {
          status: 200,
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