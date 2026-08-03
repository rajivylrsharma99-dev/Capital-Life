import React from 'react';
import logo from '../assets/logo.png';

export default function Footer() {
  return (
    <footer className="bg-[#111317] text-gray-400 py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
          
          {/* Column 1: Brand & Compliance */}
          <div className="lg:col-span-4 flex flex-col space-y-5">
            <img src={logo} alt="Capital Life Logo" className="h-10 w-auto object-contain bg-white p-1.5 rounded-lg self-start" />
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Capital Life Research is a premier financial research firm dedicated to delivering disciplined technical and market analysis for retail and institutional investors.
            </p>
            {/* W3C HTML replication Badge */}
            <div className="pt-2">
              <div className="inline-flex items-center text-[10px] font-black border border-gray-700 rounded overflow-hidden select-none bg-white">
                <span className="bg-white text-[#005a9c] px-3 py-1.5">W3C</span>
                <span className="bg-[#f0b429] text-gray-900 px-3 py-1.5 border-l border-gray-200">WCAG 2.0 AA</span>
              </div>
            </div>
          </div>

          {/* Column 2: Contact Details */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Contact Us
            </h4>
            <div className="text-xs space-y-2.5">
              <p className="text-gray-300 font-semibold">Rajiv Sharma</p>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Proprietor Capital Life Research</p>
              
              <div className="pt-2 space-y-1.5">
                <p><span className="text-gray-400">SEBI Reg No:</span> <span className="text-white font-medium">INH000022163</span></p>
                <p><span className="text-gray-400">Type:</span> <span className="text-white">Research Analyst</span></p>
                <p><span className="text-gray-400">Email:</span> <a href="mailto:rajivylrsharma99@gmail.com" className="text-[#25a544] hover:underline">rajivylrsharma99@gmail.com</a></p>
                <p><span className="text-gray-400">Phone:</span> <a href="tel:+918109081040" className="text-white hover:text-[#25a544] font-medium">+91 81090 81040</a></p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-3 pt-3">
              {/* Twitter/X */}
              <a 
                href="https://x.com/CapLifeResearch" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-[#25a544] transition"
                aria-label="Visit our Twitter/X profile (opens in a new tab)"
              >
                <svg aria-hidden="true" className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a 
                href="https://www.instagram.com/capitalliferesearch2025/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-[#25a544] transition"
                aria-label="Visit our Instagram profile (opens in a new tab)"
              >
                <svg aria-hidden="true" className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a 
                href="https://www.youtube.com/@CapitalLifeResearch-v1s" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-[#25a544] transition"
                aria-label="Visit our YouTube channel (opens in a new tab)"
              >
                <svg aria-hidden="true" className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 3: Addresses */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Our Addresses
            </h4>
            <div className="text-xs space-y-4 leading-relaxed">
              <div>
                <span className="text-gray-400 font-bold block mb-1">Registered Address:</span>
                <p className="text-gray-300">
                  465, Sai Kripa Colony, Near Bombay Hospital, Indore, Madhya Pradesh - 452010
                </p>
              </div>

              <div>
                <span className="text-gray-400 font-bold block mb-1">Correspondence & Previous Address:</span>
                <p className="text-gray-300">
                  Office No 103, 1st Floor, Aditya Apartment, Shree Nagar Main, Above G3 Royal, Indore, Madhya Pradesh - 452010
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] text-gray-400 gap-4">
          <div>
            © 2026 Capital Life Financial Services. All Rights Reserved.
          </div>
          <div>
            SEBI Registered Research Analyst Registration No: INH000022163
          </div>
        </div>

      </div>
    </footer>
  );
}
