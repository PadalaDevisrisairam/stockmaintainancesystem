"use client";
import { useState,useEffect } from 'react';
import React from 'react'
import Navbar2 from '@/components/Navbar2';
const admindashboard = () => {
  const [products, setProducts] = useState([]); // Store products
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


  return (
    <div>
       <Navbar2/>
        {/* Product List in Card Format */}
      <div className="p-6 bg-gray-200 h-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Hello Admin Welcome ! </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white h-50 p-4 rounded-lg shadow-lg text-black"
            >
              <h3 className="text-2xl text-center font-semibold p-3">{product.name}</h3>
              <p className="text-lg text-gray-600 text-center p-3">Quantity: {product.quantity}</p>
              <p className="text-lg text-gray-600 text-center p-3">Price: {product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
   
  )
}

export default admindashboard