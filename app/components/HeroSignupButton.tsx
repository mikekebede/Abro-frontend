"use client"

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const HeroSignupButton=()=>{
  return (
    <Link href="/signup">
      <Button 
        className="mt-8 text-xl sm:text-2xl font-syne px-3 py-4 rounded-lg bg-gradient-to-r from-[#1E90FF] to-[#0066CC] text-white shadow-lg hover:brightness-110 transition"
      >
        Join Now
      </Button>
    </Link>
  );
}
export default HeroSignupButton