import React, { useState, useEffect } from 'react';

export default function Offers({ setCurrentPage }) {
  // Live Countdown state (ends in 9 hours, 54 minutes, 26 seconds)
  const [timeLeft, setTimeLeft] = useState(35666); 
  const [selectedOfferName, setSelectedOfferName] = useState('Alpha Portfolio Special');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', capital: '2-5 Lakhs' });
  const [submitted, setSubmitted] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedReferral, setCopiedReferral] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 35666));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}h : ${mins.toString().padStart(2, '0')}m : ${secs.toString().padStart(2, '0')}s`;
  };

  const handleCopyCode = (code, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText('EP-REF-2024-WIN');
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2000);
  };

  const openClaimModal = (offerName) => {
    setSelectedOfferName(offerName);
    setIsModalOpen(true);
    setSubmitted(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone) {
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen text-slate-800 antialiased font-sans">
      
      {/* 1. Ticking Countdown Top Alert Banner */}
      <div 
        style={{ backgroundColor: '#020617' }} 
        className="text-[#dafd44] py-3.5 px-4 text-center text-xs font-bold uppercase tracking-widest border-b border-white/5 sticky top-0 z-40 shadow-sm flex items-center justify-center space-x-2"
      >
        <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse mr-1"></span>
        <span>Anniversary Sale Closes In:</span>
        <span className="font-mono bg-white/10 px-2.5 py-0.5 rounded text-white text-xs ml-1">{formatTime(timeLeft)}</span>
      </div>

      {/* Main Container using Flexbox column with a explicit gap and top/bottom page-level margins */}
      <div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '56px',
          marginTop: '48px',     // Margin between Header/Countdown and Content
          marginBottom: '80px'   // Margin between Content and Footer
        }}
      >
        
        {/* 2. Hero Card */}
        <div 
          style={{ backgroundColor: '#0f172a', padding: '90px 40px', borderRadius: '32px' }} 
          className="overflow-hidden text-white border border-slate-850 shadow-2xl text-center flex flex-col items-center justify-center space-y-6 relative"
        >
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

          {/* Luxury Badge */}
          <span 
            className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider relative z-10"
            style={{ backgroundColor: 'rgba(218, 253, 68, 0.1)', border: '1px solid rgba(218, 253, 68, 0.2)', color: '#dafd44' }}
          >
            ⭐ 21 Years of Excellence
          </span>
          
          {/* Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl text-white relative z-10">
            Financial Excellence for <br className="sm:hidden" />
            <span className="text-[#dafd44]">Two Decades.</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xs sm:text-sm text-slate-350 leading-relaxed max-w-xl relative z-10 font-medium">
            Unlock premium market research strategies and portfolio models. Take advantage of our verified limited-time anniversary rates.
          </p>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 relative z-10 w-full sm:w-auto">
            <button
              onClick={() => openClaimModal('Anniversary General Offer')}
              style={{ backgroundColor: '#dafd44', color: '#020617' }}
              className="hover:opacity-90 font-black px-8 py-4 rounded-xl text-xs uppercase tracking-wider transition-all duration-200 shadow-lg cursor-pointer border border-transparent"
            >
              Claim Offer Now
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('deals');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="border border-white/20 hover:border-white hover:bg-white/5 text-white font-extrabold px-8 py-4 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
            >
              View All Plans
            </button>
          </div>
        </div>

        {/* 3. Featured In & Trusted By Bar */}
        <div 
          style={{ backgroundColor: '#dafd44', padding: '24px 32px', borderRadius: '20px' }} 
          className="flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm border border-[#cee551]"
        >
          <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">AS FEATURED IN & TRUSTED BY</span>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-14 text-slate-900 font-extrabold text-xs tracking-wider uppercase font-mono">
            <span className="cursor-default">Forbes</span>
            <span className="font-serif italic text-sm cursor-default">Economic Times</span>
            <span className="tracking-tighter cursor-default">CNBC TV18</span>
            <span className="cursor-default">MoneyControl</span>
            <span className="font-serif cursor-default">Bloomberg</span>
          </div>
        </div>

        {/* 4. Flash Deals Section */}
        <div id="deals">
          <div className="text-center space-y-1.5 mb-10">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Flash Deals</h2>
            <p className="text-xs text-slate-400">Time-sensitive offers for rapid portfolio scaling</p>
            <div className="w-12 h-1 bg-[#25a544] mx-auto rounded-full mt-2"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Card 1: Alpha Portfolio Special */}
            <div 
              style={{ padding: '40px 32px', minHeight: '400px', borderRadius: '24px' }}
              className="bg-white border border-slate-200 flex flex-col justify-between hover:shadow-lg hover:border-slate-350 transition duration-300 text-left shadow-[0_8px_30px_rgb(0,0,0,0.02)]"
            >
              <div>
                <div className="flex justify-between items-center mb-5">
                  <span className="text-[9px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-md uppercase tracking-wider">
                    Most Popular
                  </span>
                  <span className="text-[11px] font-bold text-slate-300 font-mono">#F01</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">Alpha Portfolio Special</h3>
                <p className="text-xs text-slate-455 leading-relaxed mb-6">
                  Aggressive growth strategies for high-impact portfolios.
                </p>
                <div className="my-6">
                  <span className="text-4xl font-black text-slate-900 tracking-tight">50% OFF</span>
                </div>
              </div>
              <button
                onClick={() => openClaimModal('Alpha Portfolio Special (50% OFF)')}
                aria-label="Grab Alpha Portfolio Special (50% OFF) Offer"
                style={{ backgroundColor: '#0f172a', color: '#ffffff' }}
                className="w-full py-3.5 hover:bg-slate-800 text-xs font-bold rounded-xl transition cursor-pointer mt-4 shadow-sm border border-transparent"
              >
                Grab This Offer
              </button>
            </div>

            {/* Card 2: Multibagger Combo */}
            <div 
              style={{ padding: '40px 32px', minHeight: '400px', borderRadius: '24px' }}
              className="bg-white border border-slate-200 flex flex-col justify-between hover:shadow-lg hover:border-slate-350 transition duration-300 text-left shadow-[0_8px_30px_rgb(0,0,0,0.02)]"
            >
              <div>
                <div className="flex justify-between items-center mb-5">
                  <span className="text-[9px] font-extrabold bg-[#dafd44]/15 border border-[#dafd44]/30 text-emerald-800 px-3 py-1 rounded-md uppercase tracking-wider">
                    Best Value
                  </span>
                  <span className="text-[11px] font-bold text-slate-300 font-mono">#F02</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">Multibagger Combo</h3>
                <p className="text-xs text-slate-455 leading-relaxed mb-6">
                  Buy annual membership and get 3 months extra free.
                </p>
                <div className="my-6">
                  <span className="text-4xl font-black text-slate-900 tracking-tight">12 + 3 Free</span>
                </div>
              </div>
              <button
                onClick={() => openClaimModal('Multibagger Combo (12 + 3 Free)')}
                aria-label="Grab Multibagger Combo (12 + 3 Extra Free Months) Offer"
                style={{ backgroundColor: '#0f172a', color: '#ffffff' }}
                className="w-full py-3.5 hover:bg-slate-800 text-xs font-bold rounded-xl transition cursor-pointer mt-4 shadow-sm border border-transparent"
              >
                Grab This Offer
              </button>
            </div>

            {/* Card 3: Early Bird Bonus */}
            <div 
              style={{ padding: '40px 32px', minHeight: '400px', borderRadius: '24px' }}
              className="bg-white border border-slate-200 flex flex-col justify-between hover:shadow-lg hover:border-slate-350 transition duration-300 text-left shadow-[0_8px_30px_rgb(0,0,0,0.02)]"
            >
              <div>
                <div className="flex justify-between items-center mb-5">
                  <span className="text-[9px] font-extrabold bg-slate-50 border border-slate-100 text-slate-500 px-3 py-1 rounded-md uppercase tracking-wider">
                    New Users
                  </span>
                  <span className="text-[11px] font-bold text-slate-300 font-mono">#F03</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">Early Bird Bonus</h3>
                <p className="text-xs text-slate-455 leading-relaxed mb-6">
                  Additional welcome discount for new platform members.
                </p>
                <div className="my-6">
                  <span className="text-4xl font-black text-slate-900 tracking-tight">Extra 10%</span>
                </div>
              </div>
              <button
                onClick={() => openClaimModal('Early Bird Bonus (Extra 10%)')}
                aria-label="Apply Early Bird Bonus (Extra 10% Discount)"
                style={{ backgroundColor: '#0f172a', color: '#ffffff' }}
                className="w-full py-3.5 hover:bg-slate-800 text-xs font-bold rounded-xl transition cursor-pointer mt-4 shadow-sm border border-transparent"
              >
                Apply Bonus
              </button>
            </div>

          </div>
        </div>

        {/* 5. Smart Investor Bundles Section */}
        <div id="bundles">
          <div className="text-center space-y-1.5 mb-10">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Smart Investor <span className="text-[#25a544]">Bundles</span>
            </h2>
            <p className="text-xs text-slate-400">Consolidated packages optimized for diverse investment goals.</p>
            <div className="w-12 h-1 bg-[#25a544] mx-auto rounded-full mt-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            
            {/* Card 1: Ultimate Power Pack */}
            <div 
              style={{ padding: '40px 32px', borderRadius: '24px' }}
              className="bg-white border border-slate-200 rounded-3xl flex flex-col justify-between text-left hover:shadow-md hover:border-slate-300 transition shadow-[0_8px_30px_rgb(0,0,0,0.02)]"
            >
              <div>
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block mb-3">ULTIMATE POWER PACK</span>
                <h3 className="text-xl font-bold text-slate-900 mb-2">The Wealth Architect</h3>
                <p className="text-xs text-slate-450 leading-relaxed">
                  Premium Advisory, Algo-Signals, and Personalized Reviews for HNIs.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-sm font-extrabold text-slate-900">Save 65%</span>
                <button
                  onClick={() => openClaimModal('The Wealth Architect Bundle')}
                  aria-label="Activate The Wealth Architect Bundle"
                  className="text-xs font-bold text-[#25a544] hover:text-[#208a38] transition cursor-pointer"
                >
                  Activate
                </button>
              </div>
            </div>

            {/* Card 2: Active Trading */}
            <div 
              style={{ padding: '40px 32px', borderRadius: '24px' }}
              className="bg-white border border-slate-200 rounded-3xl flex flex-col justify-between text-left hover:shadow-md hover:border-slate-300 transition shadow-[0_8px_30px_rgb(0,0,0,0.02)]"
            >
              <div>
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block mb-3">ACTIVE TRADING</span>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Trader's Choice</h3>
                <p className="text-xs text-slate-450 leading-relaxed">
                  F&O Strategies combined with high-frequency intraday calls.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-sm font-extrabold text-slate-900">₹49,999</span>
                <button
                  onClick={() => openClaimModal('Trader\'s Choice Bundle')}
                  aria-label="View details of Trader's Choice Bundle"
                  className="text-xs font-bold text-[#25a544] hover:text-green-700 transition cursor-pointer"
                >
                  Details
                </button>
              </div>
            </div>

            {/* Card 3: Passive Growth */}
            <div 
              style={{ padding: '40px 32px', borderRadius: '24px' }}
              className="bg-white border border-slate-200 rounded-3xl flex flex-col justify-between text-left hover:shadow-md hover:border-slate-300 transition shadow-[0_8px_30px_rgb(0,0,0,0.02)]"
            >
              <div>
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block mb-3">STABILITY FOCUS</span>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Passive Growth</h3>
                <p className="text-xs text-slate-455 leading-relaxed">
                  Mutual Fund Analysis and curated Long-Term stock picks.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-sm font-extrabold text-slate-900">₹24,999</span>
                <button
                  onClick={() => openClaimModal('Passive Growth Bundle')}
                  aria-label="View details of Passive Growth Bundle"
                  className="text-xs font-bold text-[#25a544] hover:text-green-700 transition cursor-pointer"
                >
                  Details
                </button>
              </div>
            </div>

            {/* Bottom Card: Custom Corporate Plans (spans full width on grid via explicit gridColumn style) */}
            <div 
              style={{ backgroundColor: '#dafd44', padding: '32px 40px', gridColumn: '1 / -1', borderRadius: '20px' }} 
              className="flex flex-col md:flex-row justify-between items-center gap-6 text-left shadow-sm border border-[#cee551]"
            >
              <div className="space-y-1">
                <h3 className="text-lg font-black tracking-tight leading-tight text-slate-900">Custom Corporate Plans</h3>
                <p className="text-xs text-slate-800 font-bold leading-relaxed">
                  Tailored solutions for hedge funds and investment firms. Contact us for private desk routing.
                </p>
              </div>
              <button
                onClick={() => openClaimModal('Custom Corporate Plan')}
                aria-label="Inquire about Custom Corporate Plan"
                style={{ backgroundColor: '#0f172a', color: '#ffffff' }}
                className="hover:bg-slate-800 text-white font-extrabold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition flex-shrink-0 cursor-pointer shadow-sm border border-transparent"
              >
                Inquire Now
              </button>
            </div>

          </div>
        </div>

        {/* 6. Centered Refer & Earn Section */}
        <div 
          style={{ backgroundColor: '#0f172a', padding: '80px 40px', borderRadius: '32px' }} 
          className="text-white border border-slate-850 shadow-2xl text-center flex flex-col items-center justify-center space-y-6 relative overflow-hidden"
        >
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

          <div className="space-y-2.5 relative z-10 max-w-xl">
            <h3 className="text-2xl font-black text-white">
              Refer & <span className="text-[#dafd44]">Earn</span>
            </h3>
            <p className="text-xs text-slate-350 leading-relaxed font-bold">
              Refer a fellow investor and get <span className="text-[#dafd44]">1 Month Free</span> for every successful referral.
            </p>
          </div>

          {/* Code display block */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full max-w-md relative z-10 justify-center">
            <div className="bg-white/5 border border-slate-800 rounded-xl px-6 py-3 text-xs font-mono font-bold text-gray-200 flex-grow flex items-center justify-center select-all tracking-widest">
              EP-REF-2024-WIN
            </div>
            <button
              onClick={handleCopyReferral}
              aria-label={copiedReferral ? 'Referral code copied' : 'Copy referral code EP-REF-2024-WIN to clipboard'}
              style={{ backgroundColor: '#dafd44', color: '#020617' }}
              className="hover:opacity-90 font-black px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer border border-transparent shadow-md"
            >
              {copiedReferral ? 'Code Copied!' : 'Copy Code'}
            </button>
          </div>
        </div>

      </div>

      {/* 7. Interactive Claim Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full relative border border-slate-100 shadow-2xl text-left animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-650 transition focus:outline-none cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {submitted ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-xl font-black text-slate-900">Request Registered!</h4>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto text-center mb-4">
                  Thank you. Your request for the <strong className="text-slate-800">{selectedOfferName}</strong> has been secured. An analyst will contact you within 15 minutes.
                </p>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setCurrentPage('payment');
                  }}
                  style={{ backgroundColor: '#25a544', color: '#ffffff' }}
                  className="w-full py-3.5 hover:bg-emerald-700 text-xs font-black uppercase tracking-wider rounded-xl transition cursor-pointer shadow-md"
                >
                  Proceed to Secure Payment
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">Confirm Selected Promotion</span>
                  <h3 className="text-lg font-black text-slate-900 leading-tight">{selectedOfferName}</h3>
                </div>
                <div className="h-px bg-slate-100 my-4"></div>

                <div className="space-y-3.5">
                  <div>
                    <label htmlFor="offersCapital" className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1.5">Capital Range</label>
                    <select 
                      id="offersCapital"
                      value={formData.capital} 
                      onChange={(e) => setFormData({...formData, capital: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold text-slate-850 focus:outline-none focus:border-[#25a544]"
                      autoComplete="off"
                    >
                      <option value="Under 2 Lakhs">Under ₹2 Lakhs</option>
                      <option value="2-5 Lakhs">₹2 Lakhs - ₹5 Lakhs</option>
                      <option value="5-10 Lakhs">₹5 Lakhs - ₹10 Lakhs</option>
                      <option value="10 Lakhs+">₹10 Lakhs+</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="offersFullName" className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1.5">Your Full Name</label>
                    <input 
                      id="offersFullName"
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="John Doe" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#25a544]"
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label htmlFor="offersEmail" className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1.5">Email Address</label>
                    <input 
                      id="offersEmail"
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="name@email.com" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#25a544]"
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="offersPhone" className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1.5">Phone Number</label>
                    <input 
                      id="offersPhone"
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+91 98765 43210" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-850 focus:outline-none focus:border-[#25a544]"
                      autoComplete="tel"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition mt-4 cursor-pointer"
                >
                  Confirm & Secure Activation
                </button>
                <p className="text-[10px] text-slate-400 text-center mt-2">
                  🔒 Data secured. Certified SEBI Registered Analyst Team.
                </p>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
