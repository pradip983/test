import { dbConnect } from "@/lib/dbconnect";
import Destination from "@/models/Destination";

export async function GET() {
  try {
    await dbConnect();
    const destinations = await Destination.find({});
    return new Response(JSON.stringify(destinations), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch destinations" }),
      { status: 500 }
    );
  }
}
