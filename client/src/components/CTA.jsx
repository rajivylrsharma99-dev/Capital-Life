import React from 'react';

export default function CTA({ setCurrentPage, user }) {
  return (
    <section className="bg-[#1f232c] text-white py-20 text-center relative overflow-hidden">
      
      {/* Decorative backdrop blobs */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500 rounded-full filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-64 h-64 bg-[#dafd44] rounded-full filter blur-3xl opacity-10"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          Ready to Invest With Confidence?
        </h2>
        
        <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto leading-relaxed mb-6">
          Partner with a SEBI-Registered Research Analyst committed to disciplined market research, transparency, and long-term investor success.
        </p>

        <p className="text-xs font-bold text-[#dafd44] uppercase tracking-wider mb-8">
          Start Your Investment Journey Today
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); setCurrentPage(user ? 'dashboard' : 'login'); }}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-transparent rounded-xl text-base font-bold text-gray-900 bg-[#dafd44] hover:bg-[#cee551] shadow-lg transform hover:-translate-y-0.5 transition duration-150"
          >
            {user ? 'Dashboard' : 'Get Started'}
          </a>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); }}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-gray-600 rounded-xl text-base font-bold text-white hover:bg-gray-800 transition duration-150"
          >
            Contact Our Team
          </a>
        </div>

      </div>
    </section>
  );
}
