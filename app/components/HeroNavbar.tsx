import React from "react";
import Image from "next/image";
import Link from "next/link";
import NavigationButtons from "./NavigationButtons";

const HeroNavbar = () => {
  return (
    <div className="py-3 bg-white px-10 md:px-20 lg:px-30 flex justify-between border-b border-gray-300 
      fixed top-0 left-0 w-full z-50 shadow-md">
      <Link href="/">
        <Image src="/images/Abrologo.png" alt="Abro logo" width={80} height={90} />
      </Link>
      <NavigationButtons />
    </div>
  );
};

export default HeroNavbar;
