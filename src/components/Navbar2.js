"use client";
import { useEffect, useState } from "react";

export default function Navbar2() {
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isSupplierOpen, setIsSupplierOpen] = useState(false);
  
  const [productData, setProductData] = useState({
    name: "",
    quantity: 0,
    price: "",
  });

    const handleProductChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://stockmaintainancesystem-oebb.onrender.com/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      if (response.ok) {
        alert("Product added successfully");
        setIsProductOpen(false);
        setProductData({ name: "", quantity: 0, price: "" });

        // Refresh the product list
        const newResponse = await fetch("https://stockmaintainancesystem-oebb.onrender.com/api/products");
        const newData = await newResponse.json();
        setProducts(newData);
      } else {
        alert("Product not added");
      }
    } catch (error) {
      console.log("Error adding the product:", error);
    }
  };

  return (
    <div>
      <nav className="bg-blue-900 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
       <img src="/stockmaintainance.jpg" alt="Logo" className="h-20 w-20" />
      </div>
        <div className="flex space-x-6">
          <div className="flex flex-col items-center">
            <span>Add</span>
            <button
              onClick={() => setIsProductOpen(true)}
              className="text-l hover:bg-gray-200 hover:text-black hover:cursor-pointer"
            >
              Product
            </button>
          </div>
         
        </div>
      </nav>

      {/* Add Product Modal */}
      {isProductOpen && (
        <div className="fixed inset-0 bg-blur bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4 text-black">Add Product</h2>
            <form onSubmit={handleProductSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={productData.name}
                onChange={handleProductChange}
                className="w-full p-2 border mb-2 text-black"
                required
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={productData.quantity}
                onChange={handleProductChange}
                className="w-full p-2 border mb-2 text-black"
                required
              />
              <input
                type="text"
                name="price"
                placeholder="Price"
                value={productData.price}
                onChange={handleProductChange}
                className="w-full p-2 border mb-2 text-black"
                required
              />
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                >
                  Add Product
                </button>
                <button
                  type="button"
                  onClick={() => setIsProductOpen(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

     
    </div>
  );
}
