"use client"

import { useState } from "react";

export default function CustomerForm() {
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/customers", { // Adjust the endpoint if needed
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Customer added successfully:", data);
        alert("Customer added successfully!");
      } else {
        console.error("Error adding customer:", data.error);
        alert("Error adding customer!");
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("Request failed!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Add Customer</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      /><br /><br />
      
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
      /><br /><br />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      /><br /><br />

      <input
        type="password"
        name="confirmpassword"
        placeholder="Confirm Password"
        value={formData.confirmpassword}
        onChange={handleChange}
      /><br /><br />

      <button onClick={handleSubmit} style={{ padding: "10px 20px", cursor: "pointer" }}>
        Send
      </button>
    </div>
  );
}
