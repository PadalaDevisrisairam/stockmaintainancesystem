import dbconnect from "@/utils/dbconnect";
import products from "@/context/models/products";

export async function GET() {
  try {
    await dbconnect(); // Ensure DB is connected

    const productslist = await products.find();
    console.log("Fetched products:", productslist);

    return new Response(JSON.stringify(productslist), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
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
    const newProduct = new products({
      name: body.name,
      quantity: body.quantity,
      price: body.price, // Optional field
    });

    // Save the new customer to the database
    await newProduct.save();
    console.log("The new data added to backend is", newProduct);
    return new Response(JSON.stringify({ message: "product added successfully!", product: newProduct }), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
    
  } catch (error) {
    console.log("Error adding customer:", error);
    return new Response(JSON.stringify({ error: "Failed to add product" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}

export async function PATCH(req) {
  try {
    await dbconnect(); // Ensure DB is connected

    const { name,value } = await req.json(); // Extract name from request body

    if (!name) {
      return new Response(JSON.stringify({ error: "Product name is required" }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }

    const updatedProduct = await products.findOneAndUpdate(
      { name }, // Find product by name
      { $inc: { quantity: -(value) } }, // Decrease quantity by 10
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        headers: { "Content-Type": "application/json" },
        status: 404,
      });
    }

    return new Response(JSON.stringify(updatedProduct), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Error updating product quantity:", error);
    return new Response(JSON.stringify({ error: "Failed to update product" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
