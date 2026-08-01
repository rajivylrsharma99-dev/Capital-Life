import React, { useState } from 'react';
import pricingHero from '../assets/pricing-hero.png';
import dataInsights from '../assets/data-insights.png';

export default function Pricing({ setCurrentPage }) {
  // State for pricing selection on each card
  const [alphaPlan, setAlphaPlan] = useState('6m'); // '6m' or '12m'
  const [epPlan, setEpPlan] = useState('6m'); // '6m' or '12m'
  const [comboPlan, setComboPlan] = useState('12m'); // '12m' or '6m'

  // Lead Form State
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone) {
      setFormSubmitted(true);
    }
  };

  return (
    <div className="bg-[#fcfdfe] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section 1: Hero Offer Banner */}
        <div className="relative bg-gradient-to-tr from-[#991b1b] via-[#dc2626] to-[#ea580c] rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(220,38,38,0.25)] text-white mb-20 p-8 md:p-14 border border-white/10">
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
          
          {/* Glowing backlight */}
          <div className="absolute top-1/2 right-10 -translate-y-1/2 w-80 h-80 bg-orange-400 rounded-full filter blur-[100px] opacity-35 pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-extrabold bg-white/15 border border-white/20 uppercase tracking-widest text-orange-100">
                ⭐ Celebrating 20 Years of Excellence
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                Ending Tomorrow:<br />
                <span className="text-[#dafd44] drop-shadow-[0_2px_10px_rgba(218,253,68,0.2)]">UPTO 65% OFF</span>
              </h1>
              <p className="text-base text-red-50 leading-relaxed max-w-xl">
                Unlock premium market insights and research-backed portfolios at the lowest price ever. The future of your wealth starts here.
              </p>
              <div className="pt-2">
                <a
                  href="#plans"
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-sm font-extrabold rounded-xl text-gray-900 bg-[#dafd44] hover:bg-[#cee551] hover:scale-103 transition duration-150 shadow-[0_4px_25px_rgba(218,253,68,0.4)]"
                >
                  GRAB THIS OFFER
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Graphic */}
            <div className="lg:col-span-5 flex justify-center transform hover:scale-105 hover:rotate-1 transition duration-500">
              <img
                src={pricingHero}
                alt="20 Years Anniversary Trophy"
                className="max-w-[260px] sm:max-w-[300px] h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.35)] animate-pulse-slow"
              />
            </div>

          </div>
        </div>

        {/* Section 2: Investment Plans Title */}
        <div id="plans" className="text-center max-w-3xl mx-auto mb-20 scroll-mt-24">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">PRICING PACKAGES</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Investment Plans
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            Precision research. Actionable intelligence. Choose the plan that aligns with your financial goals.
          </p>
          <div className="mt-5 w-16 h-1 bg-[#25a544] mx-auto rounded-full"></div>
        </div>

        {/* Section 2: Plans Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
          
          {/* Card 1: Alpha India Portfolio */}
          <div className="bg-white rounded-[24px] border border-gray-200 p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition duration-300">
            <div>
              {/* Header block */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] font-bold text-[#25a544] bg-[#25a544]/10 py-1 px-2.5 rounded-md uppercase tracking-wider mb-2 inline-block">PORTFOLIO</span>
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">ALPHA INDIA</h3>
                  <span className="text-xs text-gray-400">Best stocks for 2026</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#fefce8] border border-[#fef08a] flex items-center justify-center text-yellow-600 shadow-sm flex-shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Features List */}
              <div className="mb-8">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-4">
                  KEY FEATURES
                </span>
                <ul className="space-y-3.5">
                  <li className="flex items-center text-xs text-gray-500 leading-relaxed">
                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Oversold, Large, Mid & Smallcaps</span>
                  </li>
                  <li className="flex items-center text-xs text-gray-500 leading-relaxed">
                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Quarterly Re-Balancing</span>
                  </li>
                  <li className="flex items-center text-xs text-gray-500 leading-relaxed">
                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Real-time Performance Updates</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pricing Selector options */}
            <div className="space-y-4">
              <div
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 ${
                  alphaPlan === '6m' ? 'border-[#25a544] bg-[#25a544]/5' : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <input
                  id="alpha-6m"
                  type="radio"
                  name="alphaOption"
                  checked={alphaPlan === '6m'}
                  onChange={() => setAlphaPlan('6m')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 flex-shrink-0 cursor-pointer"
                />
                <label
                  htmlFor="alpha-6m"
                  className="flex-grow flex items-center justify-between ml-3 cursor-pointer select-none"
                >
                  <span className="text-xs font-bold text-gray-800">6 Months</span>
                  <span className="text-right">
                    <span className="text-[10px] text-gray-400 line-through block font-medium">₹22,000</span>
                    <span className="text-sm font-black text-gray-900">₹7,987</span>
                  </span>
                </label>
              </div>

              <div
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 ${
                  alphaPlan === '12m' ? 'border-[#25a544] bg-[#25a544]/5' : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <input
                  id="alpha-12m"
                  type="radio"
                  name="alphaOption"
                  checked={alphaPlan === '12m'}
                  onChange={() => setAlphaPlan('12m')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 flex-shrink-0 cursor-pointer"
                />
                <label
                  htmlFor="alpha-12m"
                  className="flex-grow flex items-center justify-between ml-3 cursor-pointer select-none"
                >
                  <span className="text-xs font-bold text-gray-800">12 Months</span>
                  <span className="text-right">
                    <span className="text-[10px] text-gray-400 line-through block font-medium">₹44,000</span>
                    <span className="text-sm font-black text-gray-900">₹13,987</span>
                  </span>
                </label>
              </div>

              <button
                type="button"
                onClick={() => setCurrentPage('payment')}
                className="inline-flex items-center justify-center w-full px-6 py-4 rounded-2xl font-bold text-white bg-gradient-to-b from-[#334155] to-[#0f172a] hover:from-[#1e293b] hover:to-[#020617] transition duration-150 mt-4 text-xs tracking-wider uppercase cursor-pointer"
              >
                SUBSCRIBE NOW
              </button>
            </div>
          </div>

          {/* Card 2: EP Multibagger */}
          <div className="bg-white rounded-[24px] border border-gray-200 p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition duration-300">
            <div>
              {/* Header block */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 py-1 px-2.5 rounded-md uppercase tracking-wider mb-2 inline-block">TACTICAL</span>
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">EP MULTIBAGGER</h3>
                  <span className="text-xs text-gray-400">Mid-term investing focus</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-150 text-blue-600 flex items-center justify-center shadow-sm flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              {/* Features List */}
              <div className="mb-8">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-4">
                  KEY FEATURES
                </span>
                <ul className="space-y-3.5">
                  <li className="flex items-center text-xs text-gray-500 leading-relaxed">
                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>One High-Growth Stock Monthly</span>
                  </li>
                  <li className="flex items-center text-xs text-gray-500 leading-relaxed">
                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Detailed Research Reports</span>
                  </li>
                  <li className="flex items-center text-xs text-gray-500 leading-relaxed">
                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Purely Mid-term Focus</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pricing Selector options */}
            <div className="space-y-4">
              <div
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 ${
                  epPlan === '6m' ? 'border-[#25a544] bg-[#25a544]/5' : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <input
                  id="ep-6m"
                  type="radio"
                  name="epOption"
                  checked={epPlan === '6m'}
                  onChange={() => setEpPlan('6m')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 flex-shrink-0 cursor-pointer"
                />
                <label
                  htmlFor="ep-6m"
                  className="flex-grow flex items-center justify-between ml-3 cursor-pointer select-none"
                >
                  <span className="text-xs font-bold text-gray-800">6 Months</span>
                  <span className="text-right">
                    <span className="text-[10px] text-gray-400 line-through block font-medium">₹22,000</span>
                    <span className="text-sm font-black text-gray-900">₹7,987</span>
                  </span>
                </label>
              </div>

              <div
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 ${
                  epPlan === '12m' ? 'border-[#25a544] bg-[#25a544]/5' : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <input
                  id="ep-12m"
                  type="radio"
                  name="epOption"
                  checked={epPlan === '12m'}
                  onChange={() => setEpPlan('12m')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 flex-shrink-0 cursor-pointer"
                />
                <label
                  htmlFor="ep-12m"
                  className="flex-grow flex items-center justify-between ml-3 cursor-pointer select-none"
                >
                  <span className="text-xs font-bold text-gray-800">12 Months</span>
                  <span className="text-right">
                    <span className="text-[10px] text-gray-400 line-through block font-medium">₹44,000</span>
                    <span className="text-sm font-black text-gray-900">₹13,987</span>
                  </span>
                </label>
              </div>

              <button
                type="button"
                onClick={() => setCurrentPage('payment')}
                className="inline-flex items-center justify-center w-full px-6 py-4 rounded-2xl font-bold text-white bg-gradient-to-b from-[#334155] to-[#0f172a] hover:from-[#1e293b] hover:to-[#020617] transition duration-150 mt-4 text-xs tracking-wider uppercase cursor-pointer"
              >
                SUBSCRIBE NOW
              </button>
            </div>
          </div>

          {/* Card 3: Combo Service */}
          <div className="bg-white rounded-[24px] border-2 border-[#25a544] p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition duration-300 relative">
            
            {/* Corner Badge */}
            <span className="absolute top-0 right-6 -translate-y-1/2 bg-[#dafd44] border border-[#cee551] text-gray-900 font-extrabold text-[9px] uppercase tracking-widest py-1 px-3 rounded-full shadow-sm">
              MOST POPULAR
            </span>

            <div>
              {/* Header block */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] font-bold text-purple-600 bg-purple-50 py-1 px-2.5 rounded-md uppercase tracking-wider mb-2 inline-block">FULL-STACK</span>
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">COMBO SERVICE</h3>
                  <span className="text-xs text-gray-400">Alpha India + Multibagger</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-150 text-purple-650 flex items-center justify-center shadow-sm flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>

              {/* Features List */}
              <div className="mb-8">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-4">
                  KEY FEATURES
                </span>
                <ul className="space-y-3.5">
                  <li className="flex items-center text-xs text-gray-500 leading-relaxed">
                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Complete Portfolio Mastery</span>
                  </li>
                  <li className="flex items-center text-xs text-gray-500 leading-relaxed">
                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Wealth Creation Accelerated</span>
                  </li>
                  <li className="flex items-center text-xs text-gray-500 leading-relaxed">
                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Priority Customer Support</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pricing Selector options */}
            <div className="space-y-4">
              <div
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 ${
                  comboPlan === '12m' ? 'border-[#25a544] bg-[#25a544]/5' : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <input
                  id="combo-12m"
                  type="radio"
                  name="comboOption"
                  checked={comboPlan === '12m'}
                  onChange={() => setComboPlan('12m')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 flex-shrink-0 cursor-pointer"
                />
                <label
                  htmlFor="combo-12m"
                  className="flex-grow flex items-center justify-between ml-3 cursor-pointer select-none"
                >
                  <span className="text-xs font-bold text-gray-800">12 Months</span>
                  <span className="text-right">
                    <span className="text-[10px] text-gray-400 line-through block font-medium">₹84,000</span>
                    <span className="text-sm font-black text-gray-900">₹21,987</span>
                  </span>
                </label>
              </div>

              <div
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 ${
                  comboPlan === '6m' ? 'border-[#25a544] bg-[#25a544]/5' : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <input
                  id="combo-6m"
                  type="radio"
                  name="comboOption"
                  checked={comboPlan === '6m'}
                  onChange={() => setComboPlan('6m')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 flex-shrink-0 cursor-pointer"
                />
                <label
                  htmlFor="combo-6m"
                  className="flex-grow flex items-center justify-between ml-3 cursor-pointer select-none"
                >
                  <span className="text-xs font-bold text-gray-800">6 Months</span>
                  <span className="text-right">
                    <span className="text-[10px] text-gray-400 line-through block font-medium">₹44,000</span>
                    <span className="text-sm font-black text-gray-900">₹11,987</span>
                  </span>
                </label>
              </div>

              <button
                type="button"
                onClick={() => setCurrentPage('payment')}
                className="inline-flex items-center justify-center w-full px-6 py-4 rounded-2xl font-bold text-white bg-[#14532d] hover:bg-[#166534] transition duration-150 mt-4 text-xs tracking-wider uppercase cursor-pointer"
              >
                SUBSCRIBE NOW
              </button>
            </div>
          </div>

        </div>

        {/* Section 3: Premium Tier (Wealth X) */}
        <div className="bg-[#0B0D13] text-white rounded-[32px] overflow-hidden shadow-2xl p-8 md:p-14 mb-24 border border-white/5 relative">
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center px-3 py-1 bg-green-950/45 border border-green-800/60 text-xs font-bold rounded-lg text-[#25a544] tracking-wider uppercase">
                👑 PREMIUM TIER
              </span>
              
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-none text-white">
                WEALTH X
              </h2>
              
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-xl">
                The comprehensive flagship service designed for high-net-worth investors. Wealth X bridges the gap between short-term tactical opportunities and long-term strategic compounding.
              </p>

              {/* Features grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center space-x-4 bg-white/5 border border-white/10 backdrop-blur-md p-4 rounded-2xl hover:bg-white/10 hover:border-white/20 transition duration-300">
                  <div className="w-10 h-10 rounded-xl bg-[#dafd44]/15 text-[#dafd44] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold mb-0.5 text-white">Curated Portfolio</h4>
                    <span className="text-[10px] text-gray-500">Long-term wealth creation</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 bg-white/5 border border-white/10 backdrop-blur-md p-4 rounded-2xl hover:bg-white/10 hover:border-white/20 transition duration-300">
                  <div className="w-10 h-10 rounded-xl bg-[#dafd44]/15 text-[#dafd44] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold mb-0.5 text-white">Monthly Ideas</h4>
                    <span className="text-[10px] text-gray-500">Sectoral & tactical research</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 bg-white/5 border border-white/10 backdrop-blur-md p-4 rounded-2xl hover:bg-white/10 hover:border-white/20 transition duration-300">
                  <div className="w-10 h-10 rounded-xl bg-[#dafd44]/15 text-[#dafd44] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold mb-0.5 text-white">ETF Strategy</h4>
                    <span className="text-[10px] text-gray-500">Thematic & macro focus</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 bg-white/5 border border-white/10 backdrop-blur-md p-4 rounded-2xl hover:bg-white/10 hover:border-white/20 transition duration-300">
                  <div className="w-10 h-10 rounded-xl bg-[#dafd44]/15 text-[#dafd44] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold mb-0.5 text-white">Opportunity Driven</h4>
                    <span className="text-[10px] text-gray-500">Adaptive cycle strategies</span>
                  </div>
                </div>
              </div>

              {/* Price Box */}
              <div className="bg-[#14161f] border border-white/5 rounded-[20px] p-6 flex flex-col sm:flex-row justify-between items-center max-w-xl mt-8">
                <div className="mb-4 sm:mb-0 text-center sm:text-left">
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block">ANNUAL SUBSCRIPTION</span>
                  <span className="text-xs text-gray-400 line-through block">₹1,50,000</span>
                  <span className="text-3xl font-black text-[#dafd44]">₹49,999</span>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentPage('payment')}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-450 hover:to-green-550 shadow-[0_4px_25px_rgba(16,185,129,0.45)] hover:scale-103 transition duration-150 text-sm tracking-wider uppercase cursor-pointer"
                >
                  Get Wealth X
                </button>
              </div>

            </div>

            {/* Right Visual */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="absolute inset-0 bg-green-500 rounded-2xl filter blur-[40px] opacity-10 pointer-events-none"></div>
              <img
                src={dataInsights}
                alt="Widescreen charts display"
                className="rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 object-cover max-w-full h-auto"
              />
            </div>

          </div>
        </div>

        {/* Section 4: Get Expert Assistance & Callback Form */}
        <div className="bg-[#f1f5f9] rounded-[32px] p-8 md:p-14 mb-10 shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column info */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold text-[#25a544] uppercase tracking-widest block">CONNECT WITH US</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Get Expert Assistance
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
                Not sure which plan is right for you? Speak with our senior advisors for a personalized consultation.
              </p>
              
              <div className="flex items-center space-x-4 pt-6 border-t border-gray-250">
                <div className="w-12 h-12 rounded-full bg-[#186a2f] text-white flex items-center justify-center shadow-md flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 00.9-.045L9.61 7.21a1.2 1.2 0 00-1.42 0l-1.17 1.17a9.045 9.045 0 003.44 3.44l1.17-1.17a1.2 1.2 0 000-1.42l-.548-.548a1 1 0 00-.045-.9l2.2-.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-bold leading-none mb-1">CALL US DIRECTLY</span>
                  <a href="tel:+918109081040" className="text-xl font-bold text-gray-950 hover:text-[#25a544] transition">
                    +91 81090 81040
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4 pt-2">
                <div className="w-12 h-12 rounded-full bg-green-100 text-[#186a2f] flex items-center justify-center shadow-md flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-bold leading-none mb-1">SEBI REGISTRATION</span>
                  <span className="text-sm font-extrabold text-gray-800">
                    Registration No: INH000022163
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Schedule a Callback</h3>
                
                {formSubmitted ? (
                  <div className="bg-green-50 border border-green-200 text-green-800 p-8 rounded-2xl text-center space-y-4">
                    <svg className="w-16 h-16 text-[#25a544] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h4 className="text-xl font-black">Callback Confirmed!</h4>
                    <p className="text-xs text-green-700 leading-relaxed">Thank you, {formData.name}. One of our senior market researchers will contact you at {formData.phone} shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Full Name</label>
                      <input
                        id="fullName"
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-250 focus:border-[#25a544] focus:ring-4 focus:ring-green-100 focus:outline-none text-sm transition duration-150"
                        autoComplete="name"
                      />
                    </div>

                    <div>
                      <label htmlFor="emailAddress" className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Email Address</label>
                      <input
                        id="emailAddress"
                        type="email"
                        required
                        placeholder="rahul@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-250 focus:border-[#25a544] focus:ring-4 focus:ring-green-100 focus:outline-none text-sm transition duration-150"
                        autoComplete="email"
                      />
                    </div>

                    <div>
                      <label htmlFor="mobileNumber" className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Mobile Number</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-gray-250 bg-gray-50 text-gray-500 text-sm font-semibold">
                          +91
                        </span>
                        <input
                          id="mobileNumber"
                          type="tel"
                          required
                          pattern="[0-9]{10}"
                          placeholder="9876543210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-r-xl border border-gray-250 focus:border-[#25a544] focus:ring-4 focus:ring-green-100 focus:outline-none text-sm transition duration-150"
                          autoComplete="tel"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center px-6 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#186a2f] to-[#135425] hover:scale-[1.01] shadow-lg shadow-green-900/10 hover:shadow-green-900/25 transition duration-150 text-sm"
                      >
                        Get A Callback
                      </button>
                    </div>

                     <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                      By submitting, you agree to our <button type="button" onClick={() => alert("Terms & Conditions will be available soon.")} className="underline hover:text-gray-600 cursor-pointer bg-transparent border-none p-0 inline text-[10px] text-gray-400 font-normal">Terms & Conditions</button> and consent to receive calls/messages for advisory services.
                    </p>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
