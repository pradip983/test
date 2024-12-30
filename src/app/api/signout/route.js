// app/api/signout/route.js

// Named export for POST method (handles sign-out)
export async function POST(req) {
  // Set the cookie to expire immediately, effectively logging the user out
  const headers = new Headers();
  headers.set("Set-Cookie", "user=; HttpOnly; Path=/; Max-Age=0;");

  // Return a response with status 200 and success message
  return new Response(
    JSON.stringify({ message: "Signed out successfully" }),
    { status: 200, headers }
  );
}
