'use client';

import React from 'react'; // Add this line
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 z-40 w-full">
      <nav className="bg-black text-white p-4 md:max-w-[800px] md:mx-auto md:mt-[35px] md:rounded-[15px] flex justify-between items-center" style={{ boxShadow: 'inset 0 0 10px #d0c779' }}>
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/comb-overs-logo.png"
            alt="The Comb Overs Logo"
            width={46}
            height={40}
            className="h-10 w-[46px] sm:ml-5"
          />
        </Link>

        {/* Hamburger Icon and Menu */}
        <div className="sm:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? (
              <svg
                className="h-8 w-8 text-[#55858b]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-8 w-8 text-[#55858b]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex space-x-7 pr-5">
          <Link href="/" className="hover:underline text-[18px] focus:text-[#55858b]">
            Home
          </Link>
          <Link href="/products" className="hover:underline text-[18px] focus:text-[#55858b]">
            Merch
          </Link>
          <Link href="/tours" className="hover:underline text-[18px] focus:text-[#55858b]">
            Tours
          </Link>
          <Link href="/bio" className="hover:underline text-[18px] focus:text-[#55858b]">
            Bio
          </Link>
          <Link href="/cart" className="hover:underline text-[18px] focus:text-[#55858b]">
            Cart
          </Link>
        </div>
      </nav>

      {/* Mobile Menu (Expanded) */}
      {isMenuOpen && (
        <div className={`sm:hidden bg-[rgba(0,0,0,.75)] text-white p-4 transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-screen' : 'max-h-0'}`}>
          <div className="flex flex-col space-y-2 text-right">
            <Link href="/" onClick={toggleMenu} className="text-2xl active:text-[#55858b] focus:text-[#55858b] focus:underline focus:underline-offset-4 transition-colors duration-300 py-1">
              Home
            </Link>
            <Link href="/products" onClick={toggleMenu} className="text-2xl active:text-[#55858b] focus:text-[#55858b] focus:underline focus:underline-offset-4 transition-colors duration-300 py-1">
              Merch
            </Link>
            <Link href="/tours" onClick={toggleMenu} className="text-2xl active:text-[#55858b] focus:text-[#55858b] focus:underline focus:underline-offset-4 transition-colors duration-300 py-1">
              Tours
            </Link>
            <Link href="/bio" onClick={toggleMenu} className="text-2xl active:text-[#55858b] focus:text-[#55858b] focus:underline focus:underline-offset-4 transition-colors duration-300 py-1">
              Bio
            </Link>
            <Link href="/cart" onClick={toggleMenu} className="text-2xl active:text-[#55858b] focus:text-[#55858b] focus:underline focus:underline-offset-4 transition-colors duration-300 py-1">
              Cart
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}