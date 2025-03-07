import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SignLogNavbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md border-b border-gray-300 py-3 px-10 md:px-20 lg:px-30 flex justify-between">
      <Link href='/'>
        <Image src="/images/Abrologo.png" alt='Abro logo' width={80} height={90} />
      </Link>
    </div>
  );
}

export default SignLogNavbar;
