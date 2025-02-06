import React from "react";
import LoginForm from "./form";
import Link from "next/link";
import Image from "next/image";
import SignLogNavbar from "../components/SignLogNavbar";

const Page = () => {
  return (
    <div>
      <SignLogNavbar/> 
      
    <div className="h-screen w-screen flex justify-center items-center bg-blue-200">
      <div className="shadow-xl px-8 pb-8 pt-12 bg-white rounded-xl space-y-10">
        <div className="flex items-center space-x-3">
          <Image src="/images/Abrologo.png" alt="Abro logo" width={50} height={50} />
          <h1 className="px-6 font-semibold text-2xl"> Welcome Back</h1>
        </div>
        <LoginForm />
        <p className="text-center">
          Need to create an account?
          <Link className="text-indigo-500 hover:underline ml-1" href="./signup">
            Create Account
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Page;

