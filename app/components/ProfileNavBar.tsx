import React from "react";
import Image from "next/image";
import Link from "next/link";
import NavProfile from "./NavProfile";

interface ProfileNavBar {
  activeTab: "posting" | "community" | "messages";
  setActiveTab: (tab: "posting" | "community" | "messages") => void;
}

const ProfileNavBar = () => {
  return (
    <div className="h-16 bg-white px-10 md:px-20 lg:px-30 flex justify-between items-center 
      border-b border-gray-300 fixed top-0 left-0 w-full z-50 shadow-md">
      
      <Link href="/dashboard">
        <Image src="/images/Abrologo.png" alt="Abro logo" width={80} height={90} />
      </Link>
      <NavProfile />
    </div>
  );
};

export default ProfileNavBar;