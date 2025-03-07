import React from "react";
import RegisterForm from "./form";
import Link from "next/link";
import Image from "next/image";
import SignLogNavbar from "../components/SignLogNavbar";

const Page = () => {
  return (
    <div className="h-screen">
      <SignLogNavbar />     
      
      {/* ✅ Added margin-top to create space between Navbar & Form */}
      <div className="h-screen w-screen flex justify-center items-center bg-blue-200 mt-16">  
        <div className="shadow-xl px-8 pb-8 pt-12 bg-white rounded-xl space-y-10">
          {/* ✅ Flexbox for Logo + Header */}
          <div className="flex items-center space-x-3">
            <Image src="/images/Abrologo.png" alt="Abro logo" width={50} height={50} />
            <h1 className="px-6 font-semibold text-2xl">Create Your Account</h1>
          </div>

          <RegisterForm />

          <p className="text-center">
            Have an account?
            <Link className="text-indigo-500 hover:underline ml-1" href="./login">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
