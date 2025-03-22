"use client";
import { useState, useEffect } from "react";
import React from "react";

const CustomerDashboard = () => {
  const [products, setProducts] = useState([]); // Store products
  const [quantities, setQuantities] = useState({}); // Store entered quantities

  // Fetch products from backend when the component loads
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data); // Store fetched products
        } else {
          console.log("Failed to fetch products");
        }
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to run only on mount

  // Handle quantity change
  const handleQuantityChange = (productId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: value,
    }));
  };

  // Handle Buy action
  const handleBuy = async (product) => {
    const enteredQuantity = parseInt(quantities[product._id]) || 0;
    if (enteredQuantity <= 0) {
      alert("Please enter a valid quantity!");
      return;
    }
    if (enteredQuantity > product.quantity) {
      alert("Not enough stock available!");
      return;
    }

    // Send PATCH request to update backend
    try {
      const response = await fetch("http://localhost:3000/api/products", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: product.name,
          value: enteredQuantity,
        }),
      });

      if (response.ok) {
        alert("Your order is on the way! 🚀");

        // Update UI to reflect new stock
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p._id === product._id ? { ...p, quantity: p.quantity - enteredQuantity } : p
          )
        );

        // Clear the input field after purchase
        setQuantities((prev) => ({ ...prev, [product._id]: "" }));
      } else {
        alert("Failed to place order. Try again!");
      }
    } catch (error) {
      console.log("Error updating product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Hello Customer, Welcome! 🎉
      </h2>
      <h3 className="text-xl font-semibold text-gray-700 text-center mb-6">
        Get Your Desired Products 🛍️
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white p-6 rounded-lg shadow-xl transform hover:scale-105 transition duration-300"
          >
            <h3 className="text-2xl text-center font-bold text-gray-800 mb-3">
              {product.name}
            </h3>
            <p className="text-lg text-gray-600 text-center">
              Quantity: {product.quantity}
            </p>
            <p className="text-lg text-gray-600 text-center mb-4">
              Price: ₹{product.price}
            </p>

            {/* Quantity Input */}
            <input
              type="number"
              min="1"
              className="w-full p-2 border rounded-md text-center"
              placeholder="Enter quantity"
              value={quantities[product._id] || ""}
              onChange={(e) => handleQuantityChange(product._id, e.target.value)}
            />

            {/* Buy Button */}
            <button
              onClick={() => handleBuy(product)}
              className="w-full mt-4 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerDashboard;
