"use client"
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white p-6 mt-29">
  <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
    
    {/* Company Info */}
    <div>
      <h3 className="text-xl font-semibold">Stock Maintenance System</h3>
      <p className="mt-2 text-gray-300">
        Efficiently manage and track your inventory with ease.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-xl font-semibold">Quick Links</h3>
      <ul className="mt-2">
        <li><a href="#" className="hover:underline">Dashboard</a></li>
        <li><a href="#" className="hover:underline">Products</a></li>
        <li><a href="#" className="hover:underline">Reports</a></li>
        <li><a href="#" className="hover:underline">Settings</a></li>
      </ul>
    </div>

    {/* Contact Info */}
    <div>
      <h3 className="text-xl font-semibold">Contact Us</h3>
      <p className="mt-2 text-gray-300">Email: support@stockms.com</p>
      <p className="text-gray-300">Phone: +91 0000000000</p>
    </div>

  </div>

  {/* Copyright Section */}
  <div className="text-center mt-6 border-t border-gray-700 pt-4">
    <p className="text-gray-300">© 2025 Stock Maintenance System. All rights reserved.</p>
  </div>
</footer>
  )
}

export default Footer
