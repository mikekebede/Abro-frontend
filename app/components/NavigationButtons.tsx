"use client"

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const NavigationButtons = () => {
  return (
    <div className='px-10 md:px-20 lg:px-50'>
      <Link href="/login">
        <Button
          size="default"
          variant="ghost"
          className="hover:text-blue-500 mr-4 hover:bg-transparent font-semibold"
        >
          Sign in
        </Button>
      </Link>
      
      <Link href="/signup">
        <Button 
          size="default" 
          className="mt-2 ml-3 px-5 py-4 border border-blue-500 text-blue-500 font-semibold
           hover:bg-blue-500 hover:border-blue-600 hover:text-white" 
          variant="outline"
        >
          Join
        </Button>
      </Link>
    </div>
  );
};

export default NavigationButtons;