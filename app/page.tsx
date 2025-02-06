import React from 'react';
import HeroNavbar from "./components/HeroNavbar";
import HeroSignupButton from './components/HeroSignupButton';
import { Syne, Roboto } from "next/font/google";

const syne = Syne({ subsets: ["latin"], weight: ["400", "800"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export default function Home() {
  return (
    <div className="bg-slate-50 relative">
      <HeroNavbar />
      <section className="px-6 md:px-12 flex flex-row items-center md:text-left">
        <div className="md:w-2/3 my-20 ml-4 flex flex-col items-center md:items-start">
          <div className="my-6">
            <h1 className={`${roboto.className} text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-wide bg-gradient-to-r from-[#1E90FF] to-[#0066CC] text-transparent bg-clip-text drop-shadow-lg`}>
              Work <br />
              Learn <br />
              Earn
            </h1>
          </div>

          <div className="max-w-2xl">
            <h3 className={`${syne.className} text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-700 dark:text-gray-300 leading-snug tracking-wide`}>
              Become part of 
              <span className="text-blue-600 dark:text-blue-400 font-bold"> skilled college professionals</span>.
            </h3>

            <div>
              <HeroSignupButton />
            </div>
          </div>
        </div>

        <div className="md:w-full my-8 ml-5 flex justify-center">
          <img
            src="/images/hero-image.png"
            alt="Freelancing Community"
            className="w-full md:w-[75%] lg:w-[70%] xl:w-[65%] "
          />
        </div>
      </section>
    </div>
  );
}