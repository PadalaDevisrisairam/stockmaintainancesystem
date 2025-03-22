import dbconnect from "@/utils/dbconnect";
import customers from "@/context/models/customers";

export async function GET(req) {
  try {
    await dbconnect(); // Ensure DB is connected

    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");
    const password = searchParams.get("password");

    if (username && password) {
      // Check if the user exists with the given username and password
      const customer = await customers.findOne({ username, password });
      if (customer) {
        return new Response(JSON.stringify({ message: "Login successful", customer }), {
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
    return new Response(JSON.stringify({ error: "Failed to fetch customer data" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    await dbconnect(); // Ensure DB is connected
   
    const body = await req.json(); // Parse request body
    console.log(body);
    
    // Create a new customer document using the Customers schema
    const newCustomer = new customers({
      username: body.username,
      phone: body.phone,
      password: body.password, // Optional field
      confirmpassword: body.confirmpassword  // Optional field
    });

    // Save the new customer to the database
    await newCustomer.save();
    console.log("The new data added to backend is", newCustomer);
    return new Response(JSON.stringify({ message: "Customer added successfully!", customer: newCustomer }), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
    
  } catch (error) {
    console.log("Error adding customer:", error);
    return new Response(JSON.stringify({ error: "Failed to add customer" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
