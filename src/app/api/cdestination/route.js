import { dbConnect } from "@/lib/dbconnect";
import CDestination from "@/models/CDestination";

export async function GET() {
  try {
    await dbConnect();
    const cdestinations = await CDestination.find({});
    return new Response(JSON.stringify(cdestinations), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch cdestinations" }),
      { status: 500 }
    );
  }
}
