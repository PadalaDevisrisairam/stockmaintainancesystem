"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default function Home() {
  

  return (
    <main className=" bg-gray-200">
      <Navbar/>
      <h1 className="text-black text-4xl text-center font-bold p-5 mt-15">WELCOME TO </h1>
      <h1 className="text-black text-4xl text-center font-bold p-5">STOCK MAINTAINANCE SYSTEM</h1>
      <Footer/>
      
    </main>
   
    
  );
}
