import { dbConnect } from "@/lib/dbconnect";
import TDestination from "@/models/TDestination";

export async function GET() {

    try {
        await dbConnect();
        const tdestinations = await TDestination.find({});
        return new Response(JSON.stringify(tdestinations), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        return new Response(
          JSON.stringify({ error: "Failed to fetch tdestinations" }),
          { status: 500 }
        );
      }
    
}