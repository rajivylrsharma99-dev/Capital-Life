import React, { useState } from 'react';
import logo from '../assets/logo.png';

export default function Header({ currentPage, setCurrentPage }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <button
            type="button"
            className="flex-shrink-0 flex items-center cursor-pointer select-none focus:outline-none"
            onClick={() => setCurrentPage('home')}
          >
            <img src={logo} alt="Capital Life Logo" className="h-11 w-auto object-contain" />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex space-x-10">
            <button
              type="button"
              onClick={() => setCurrentPage('home')}
              className={`text-[15px] font-semibold transition focus:outline-none cursor-pointer ${
                currentPage === 'home' ? 'text-[#15803d]' : 'text-gray-600 hover:text-[#15803d]'
              }`}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage('pricing')}
              className={`text-[15px] font-semibold transition focus:outline-none cursor-pointer ${
                currentPage === 'pricing' ? 'text-[#15803d]' : 'text-gray-600 hover:text-[#15803d]'
              }`}
            >
              Plans & Pricing
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage('contact')}
              className={`text-[15px] font-semibold transition focus:outline-none cursor-pointer ${
                currentPage === 'contact' ? 'text-[#15803d]' : 'text-gray-600 hover:text-[#15803d]'
              }`}
            >
              Contact Us
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage('offers')}
              className={`text-[15px] font-semibold transition focus:outline-none cursor-pointer ${
                currentPage === 'offers' ? 'text-[#15803d]' : 'text-gray-600 hover:text-[#15803d]'
              }`}
            >
              Offers
            </button>
          </nav>



          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              type="button"
              onClick={() => { setCurrentPage('home'); setIsOpen(false); }}
              className={`w-full text-left block px-3 py-2 rounded-md text-base font-medium focus:outline-none cursor-pointer ${
                currentPage === 'home' ? 'text-[#15803d] bg-gray-50' : 'text-gray-600 hover:bg-gray-50 hover:text-[#15803d]'
              }`}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => { setCurrentPage('pricing'); setIsOpen(false); }}
              className={`w-full text-left block px-3 py-2 rounded-md text-base font-medium focus:outline-none cursor-pointer ${
                currentPage === 'pricing' ? 'text-[#15803d] bg-gray-50' : 'text-gray-600 hover:bg-gray-50 hover:text-[#15803d]'
              }`}
            >
              Plans & Pricing
            </button>
            <button
              type="button"
              onClick={() => { setCurrentPage('contact'); setIsOpen(false); }}
              className={`w-full text-left block px-3 py-2 rounded-md text-base font-medium focus:outline-none cursor-pointer ${
                currentPage === 'contact' ? 'text-[#15803d] bg-gray-50' : 'text-gray-600 hover:bg-gray-50 hover:text-[#15803d]'
              }`}
            >
              Contact Us
            </button>
            <button
              type="button"
              onClick={() => { setCurrentPage('offers'); setIsOpen(false); }}
              className={`w-full text-left block px-3 py-2 rounded-md text-base font-medium focus:outline-none cursor-pointer ${
                currentPage === 'offers' ? 'text-[#15803d] bg-gray-50' : 'text-gray-600 hover:bg-gray-50 hover:text-[#15803d]'
              }`}
            >
              Offers
            </button>
          </div>


        </div>
      )}
    </header>
  );
}
