"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminModalOpen,setIsAdminModalOpen]=useState(false);
  const [registerData, setRegisterData] = useState({
    username: '',
    phone: '',
    password: '',
    confirmpassword: ''
  });
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [adminData,setAdminData]=useState({
    username:'',
    password:''
  })

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const handleAdminChange=(e)=>{
    setAdminData({...adminData,[e.target.name]:e.target.value});
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmpassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });
      if (response.ok) {
        alert("Registration successful");
        setIsRegisterModalOpen(false);
        setRegisterData({ username: '', phone: '', password: '', confirmpassword: '' });
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.log("Error registering customer:", error);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/customers?username=${loginData.username}&password=${loginData.password}`);
      
      if (response.ok) {
        alert("customer entered ");
        setIsLoginModalOpen(false);
        setLoginData({ username: '', password: '' });
        router.push("/customerdashboard")
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.log("Error logging in:", error);
    }
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/admins?username=${adminData.username}&password=${adminData.password}`);
      if (response.ok) {
        alert("admin Login successful");
        setIsAdminModalOpen(false);
        setLoginData({ username: '', password: '' });
        router.push("/admindashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.log("Error logging in:", error);
    }
  };

  return (
    <>
      <nav className="bg-blue-900 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
       <img src="/stockmaintainance.jpg" alt="Logo" className="h-20 w-20" />
      </div>
        <div className="flex space-x-6">
          <div className="flex flex-col items-center">
            <span>Customer</span>
            <button onClick={() => setIsLoginModalOpen(true)} className="text-l hover:bg-gray-200 hover:text-black hover:cursor-pointer">Login</button>
          </div>
          <div className="flex flex-col items-center">
            <span>Admin</span>
            <button onClick={()=> setIsAdminModalOpen(true)} className="text-l hover:bg-gray-200 hover:text-black hover:cursor-pointer">Login</button>
          </div>
          
          <div className="flex flex-col items-center">
            <span>Customer</span>
            <button onClick={() => setIsRegisterModalOpen(true)} className="text-l hover:bg-gray-200 hover:text-black hover:cursor-pointer">Register</button>
          </div>
        </div>
      </nav>

      {isRegisterModalOpen && (
        <div className="fixed inset-0 bg-blur bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Register</h2>
            <form onSubmit={handleRegisterSubmit}>
              <input type="text" name="username" placeholder="Username" value={registerData.username} onChange={handleRegisterChange} className="w-full p-2 border mb-2" required />
              <input type="text" name="phone" placeholder="Phone" value={registerData.phone} onChange={handleRegisterChange} className="w-full p-2 border mb-2" required />
              <input type="password" name="password" placeholder="Password" value={registerData.password} onChange={handleRegisterChange} className="w-full p-2 border mb-2" required />
              <input type="password" name="confirmpassword" placeholder="Confirm Password" value={registerData.confirmpassword} onChange={handleRegisterChange} className="w-full p-2 border mb-2" required />
              <div className="flex justify-between">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
                <button type="button" onClick={() => setIsRegisterModalOpen(false)} className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-blur bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Customer Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <input type="text" name="username" placeholder="Username" value={loginData.username} onChange={handleLoginChange} className="w-full p-2 border mb-2" required />
              <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} className="w-full p-2 border mb-2" required />
              <div className="flex justify-between">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
                <button type="button" onClick={() => setIsLoginModalOpen(false)} className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      
{isAdminModalOpen && (
  <div className="fixed inset-0 bg-blur bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-lg font-bold mb-4">Admin Login</h2>
      <form onSubmit={handleAdminSubmit}>
        <input type="text" name="username" placeholder="Username" value={adminData.username} onChange={handleAdminChange} className="w-full p-2 border mb-2" required />
        <input type="password" name="password" placeholder="Password" value={adminData.password} onChange={handleAdminChange} className="w-full p-2 border mb-2" required />
        <div className="flex justify-between">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Admin Login</button>
          <button type="button" onClick={() => setIsAdminModalOpen(false)} className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      </form>
    </div>
  </div>
)}

    </>
  );
}
