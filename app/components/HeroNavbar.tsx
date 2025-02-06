"use client"

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';



const HeroNavbar = () => {
  return (
  <div className="py-3 bg-white px-10 md:px-20 lg:px-30 flex justify-between border-b border-gray-300">
    <Link href='/'>
    <Image src="/images/Abrologo.png" alt='Abro logo' width={80} height={90}/>
    </Link>

  <div className='px-10 md:px-20 lg:px-50'>
    <Button
    size="default"  variant="ghost"
    className="hover:text-blue-500 mr-4 hover:bg-transparent font-semibold"
    >
      Sign Up
    </Button>
    <Button 
    size="default" 
    className="mt-2 ml-3 px-5 py-4 border border-blue-500 text-blue-500 font-semibold
     hover:bg-blue-500 hover:border-blue-600 hover:text-white" 
     variant="outline">Join</Button>
  </div>



  </div>
  );
};

export default HeroNavbar;
