import React from 'react';
import heroPhones from '../assets/hero-phones.png';

export default function Hero({ setCurrentPage, user }) {
  return (
    <section className="relative overflow-hidden bg-transparent pt-12 pb-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* SEBI Badge */}
            <div className="inline-flex items-center space-x-2 bg-[#d7f573] border border-[#bee255] px-3 py-1.5 rounded-full text-xs font-bold text-gray-800 uppercase tracking-wider shadow-sm">
              <svg className="h-2.5 w-2.5 text-green-600 fill-current animate-pulse" viewBox="0 0 8 8">
                <circle cx="4" cy="4" r="3" />
              </svg>
              <span>SEBI Registered Research Analyst | INH000022163</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Build Wealth Through<br />
              <span className="text-[#25a544]">Research</span>, Not<br />
              <span className="text-[#25a544]">Speculation.</span>
            </h1>

            {/* Subtitle / Subheading */}
            <h2 className="text-xl font-bold text-gray-800 tracking-tight max-w-xl">
              Professional equity research and market insights designed to help investors make informed decisions with confidence.
            </h2>

            {/* Paragraph Text */}
            <p className="max-w-xl text-sm text-gray-600 leading-relaxed">
              At Capital Life Research, every recommendation is backed by technical analysis, market research, and disciplined risk management. Whether you're a long-term investor or an active trader, our goal is to help you navigate the markets with clarity—not guesswork.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); setCurrentPage(user ? 'dashboard' : 'login'); }}
                className="inline-flex items-center justify-center px-6 py-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gray-900 hover:bg-gray-800 shadow-md transition duration-150 text-center"
              >
                {user ? 'Dashboard' : 'Get Started'}
              </a>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); }}
                className="inline-flex items-center justify-center px-6 py-4 border border-gray-300 text-sm font-bold rounded-xl text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition duration-150 text-center"
              >
                Talk to an Analyst
              </a>
            </div>

          </div>

          {/* Right Column: Visual */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Soft decorative glow background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-green-350 rounded-full filter blur-3xl opacity-25 animate-pulse"></div>
            <img
              src={heroPhones}
              alt="Capital Life Research App"
              className="relative max-w-full h-auto drop-shadow-2xl z-10 transform hover:rotate-1 hover:scale-102 transition duration-300"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
