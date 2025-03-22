import dbconnect from "@/utils/dbconnect";
import admins from "@/context/models/admins";

export async function GET(req) {
  try {
    await dbconnect(); // Ensure DB is connected

    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");
    const password = searchParams.get("password");

    if (username && password) {
      // Check if the user exists with the given username and password
      const admin = await admins.findOne({ username, password });
      if (admin) {
        return new Response(JSON.stringify({ message: "Login successful", admin }), {
          headers: { "Content-Type": "application/json" },
          status: 200,
        });
      } else {
        return new Response(JSON.stringify({ error: "Invalid username or password" }), {
          headers: { "Content-Type": "application/json" },
          status: 401,
        });
      }
    }

    // If no username or password is provided, return all customers
    

    return new Response(JSON.stringify("please give the query parameters "), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Error fetching customers:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch admin data" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}