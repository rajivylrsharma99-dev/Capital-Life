import React, { useState } from 'react';
import logo from '../assets/logo.png';

export default function Header({ currentPage, setCurrentPage, user, setUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div
            className="flex-shrink-0 flex items-center cursor-pointer select-none focus:outline-none"
            onClick={() => setCurrentPage('home')}
          >
            <img src={logo} alt="Capital Life Logo" className="h-11 w-auto object-contain" />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex space-x-10">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}
              className={`text-[15px] font-semibold transition focus:outline-none ${
                currentPage === 'home' ? 'text-[#25a544]' : 'text-gray-600 hover:text-[#25a544]'
              }`}
            >
              Home
            </a>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setCurrentPage('pricing'); }}
              className={`text-[15px] font-semibold transition focus:outline-none ${
                currentPage === 'pricing' ? 'text-[#25a544]' : 'text-gray-600 hover:text-[#25a544]'
              }`}
            >
              Plans & Pricing
            </a>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); }}
              className={`text-[15px] font-semibold transition focus:outline-none ${
                currentPage === 'contact' ? 'text-[#25a544]' : 'text-gray-600 hover:text-[#25a544]'
              }`}
            >
              Contact Us
            </a>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setCurrentPage('offers'); }}
              className={`text-[15px] font-semibold transition focus:outline-none ${
                currentPage === 'offers' ? 'text-[#25a544]' : 'text-gray-600 hover:text-[#25a544]'
              }`}
            >
              Offers
            </a>
          </nav>


          {/* Action Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-6 relative">
            {!user ? (
              <>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); setCurrentPage('login'); }}
                  className="text-[15px] font-medium text-gray-600 hover:text-gray-900 transition focus:outline-none"
                >
                  Login
                </a>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); setCurrentPage('login'); }}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-[15px] font-semibold rounded-md text-white bg-gray-900 hover:bg-gray-805 transition duration-150 shadow-sm focus:outline-none"
                >
                  GET STARTED
                </a>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2.5 focus:outline-none cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-full bg-[#dafd44] text-slate-900 flex items-center justify-center font-black text-sm border border-slate-200 shadow-sm group-hover:opacity-95 transition">
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <span className="text-[14px] font-bold text-gray-700 group-hover:text-gray-900 transition">
                    {user.name || 'Investor'}
                  </span>
                  <svg className={`h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div 
                    style={{ borderRadius: '12px' }}
                    className="absolute right-0 mt-3.5 w-48 bg-white border border-slate-200 shadow-lg py-2 z-50 text-left animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-black text-slate-800 truncate">{user.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        setCurrentPage('dashboard');
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        setUser(null);
                        setCurrentPage('home');
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-bold text-red-650 hover:bg-red-50 transition cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

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
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setCurrentPage('home'); setIsOpen(false); }}
              className={`block px-3 py-2 rounded-md text-base font-medium focus:outline-none ${
                currentPage === 'home' ? 'text-[#25a544] bg-gray-50' : 'text-gray-655 hover:bg-gray-50 hover:text-[#25a544]'
              }`}
            >
              Home
            </a>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setCurrentPage('pricing'); setIsOpen(false); }}
              className={`block px-3 py-2 rounded-md text-base font-medium focus:outline-none ${
                currentPage === 'pricing' ? 'text-[#25a544] bg-gray-50' : 'text-gray-655 hover:bg-gray-50 hover:text-[#25a544]'
              }`}
            >
              Plans & Pricing
            </a>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); setIsOpen(false); }}
              className={`block px-3 py-2 rounded-md text-base font-medium focus:outline-none ${
                currentPage === 'contact' ? 'text-[#25a544] bg-gray-50' : 'text-gray-655 hover:bg-gray-50 hover:text-[#25a544]'
              }`}
            >
              Contact Us
            </a>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setCurrentPage('offers'); setIsOpen(false); }}
              className={`block px-3 py-2 rounded-md text-base font-medium focus:outline-none ${
                currentPage === 'offers' ? 'text-[#25a544] bg-gray-50' : 'text-gray-655 hover:bg-gray-50 hover:text-[#25a544]'
              }`}
            >
              Offers
            </a>
          </div>

          <div className="pt-4 pb-4 border-t border-gray-200 px-5 flex flex-col space-y-3">
            {!user ? (
              <>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); setCurrentPage('login'); setIsOpen(false); }}
                  className="text-center font-medium text-gray-600 hover:text-gray-900 py-2 focus:outline-none"
                >
                  Login
                </a>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); setCurrentPage('login'); setIsOpen(false); }}
                  className="text-center font-semibold rounded-md text-white bg-gray-900 hover:bg-gray-805 py-3 shadow-sm focus:outline-none"
                >
                  GET STARTED
                </a>
              </>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 px-1 py-2">
                  <div className="w-10 h-10 rounded-full bg-[#dafd44] text-slate-900 flex items-center justify-center font-black text-base border border-slate-200">
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setCurrentPage('dashboard');
                  }}
                  className="w-full py-2.5 border border-slate-200 text-slate-700 font-bold rounded-lg text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setUser(null);
                    setCurrentPage('home');
                  }}
                  className="w-full py-2.5 bg-red-50 text-red-600 hover:bg-red-100 font-bold rounded-lg text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
