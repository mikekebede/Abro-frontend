import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


const SignLogNavbar=() => {
  return (
    <div className="py-3 bg-white px-10 md:px-20 lg:px-30 flex justify-between border-b border-gray-300">
      <Link href='/'>
        <Image src="/images/Abrologo.png" alt='Abro logo' width={80} height={90}/>
      </Link>
    </div>
  );
}
export default SignLogNavbar