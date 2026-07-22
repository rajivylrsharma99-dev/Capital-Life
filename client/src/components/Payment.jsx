import React, { useState } from 'react';
import qr from '../assets/qr.png';

export default function Payment({ setCurrentPage }) {
  const [copiedField, setCopiedField] = useState('');

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(fieldName);
      setTimeout(() => {
        setCopiedField('');
      }, 1500);
    });
  };

  // Payment Details
  const details = {
    bankName: 'Indian Overseas Bank',
    accountName: 'CAPITAL LIFE RESEARCH',
    accountNumber: '150502000001245',
    ifscCode: 'IOBA0001505',
    branch: '-',
    upiId: 'rajivylrsharma89-3@oksbi'
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen text-slate-800 antialiased font-sans py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Title Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Secure Payment</h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-semibold">
            Complete your transaction with confidence. Choose your preferred payment method from the options provided below to start your investment journey.
          </p>
        </div>

        {/* Payment Methods Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* LEFT CARD: NEFT / RTGS / Bank Transfer */}
          <div 
            style={{ borderRadius: '24px', padding: '40px' }}
            className="bg-white border border-slate-200 shadow-lg text-left space-y-6"
          >
            {/* Title Block */}
            <div className="flex items-center space-x-4 border-b border-slate-100 pb-5">
              <div className="w-12 h-12 rounded-xl bg-[#dafd44]/20 border border-[#dafd44]/35 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-emerald-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-xl font-black text-slate-900">NEFT / RTGS / Bank Transfer</h2>
            </div>

            {/* Fields List */}
            <div className="space-y-4">
              
              {/* Field 1: Bank Name */}
              <div className="relative group bg-slate-50 border border-slate-200 rounded-xl p-4 flex justify-between items-center">
                <div>
                  <span className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-wider mb-0.5">Bank Name</span>
                  <span className="text-xs font-bold text-slate-800">{details.bankName}</span>
                </div>
                <button 
                  onClick={() => copyToClipboard(details.bankName, 'bankName')}
                  className="p-2 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition relative"
                >
                  {copiedField === 'bankName' ? (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-2 py-1 rounded font-bold uppercase tracking-wider shadow">Copied!</span>
                  ) : null}
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                </button>
              </div>

              {/* Field 2: Account Name */}
              <div className="relative group bg-slate-50 border border-slate-200 rounded-xl p-4 flex justify-between items-center">
                <div>
                  <span className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-wider mb-0.5">Account Name</span>
                  <span className="text-xs font-bold text-slate-800">{details.accountName}</span>
                </div>
                <button 
                  onClick={() => copyToClipboard(details.accountName, 'accountName')}
                  className="p-2 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition relative"
                >
                  {copiedField === 'accountName' ? (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-2 py-1 rounded font-bold uppercase tracking-wider shadow">Copied!</span>
                  ) : null}
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                </button>
              </div>

              {/* Field 3: Account Number */}
              <div className="relative group bg-slate-50 border border-slate-200 rounded-xl p-4 flex justify-between items-center">
                <div>
                  <span className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-wider mb-0.5">Account Number</span>
                  <span className="text-xs font-bold text-slate-800">{details.accountNumber}</span>
                </div>
                <button 
                  onClick={() => copyToClipboard(details.accountNumber, 'accountNumber')}
                  className="p-2 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition relative"
                >
                  {copiedField === 'accountNumber' ? (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-2 py-1 rounded font-bold uppercase tracking-wider shadow">Copied!</span>
                  ) : null}
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                </button>
              </div>

              {/* Double Column Grid: IFSC Code & Branch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Field 4: IFSC Code */}
                <div className="relative group bg-slate-50 border border-slate-200 rounded-xl p-4 flex justify-between items-center">
                  <div>
                    <span className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-wider mb-0.5">IFSC Code</span>
                    <span className="text-xs font-bold text-slate-800">{details.ifscCode}</span>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(details.ifscCode, 'ifscCode')}
                    className="p-2 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition relative"
                  >
                    {copiedField === 'ifscCode' ? (
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-2 py-1 rounded font-bold uppercase tracking-wider shadow">Copied!</span>
                    ) : null}
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  </button>
                </div>

                {/* Field 5: Branch */}
                <div className="relative group bg-slate-50 border border-slate-200 rounded-xl p-4 flex justify-between items-center">
                  <div>
                    <span className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-wider mb-0.5">Branch</span>
                    <span className="text-xs font-bold text-slate-800">{details.branch}</span>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(details.branch, 'branch')}
                    className="p-2 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition relative"
                  >
                    {copiedField === 'branch' ? (
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-2 py-1 rounded font-bold uppercase tracking-wider shadow">Copied!</span>
                    ) : null}
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  </button>
                </div>

              </div>

            </div>
          </div>

          {/* RIGHT CARD: UPI Payment */}
          <div 
            style={{ borderRadius: '24px', padding: '40px' }}
            className="bg-white border border-slate-200 shadow-lg text-left space-y-6"
          >
            {/* Title Block */}
            <div className="flex items-center space-x-4 border-b border-slate-100 pb-5">
              <div className="w-12 h-12 rounded-xl bg-[#dafd44]/20 border border-[#dafd44]/35 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-emerald-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </div>
              <h2 className="text-xl font-black text-slate-900">UPI Payment</h2>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed font-semibold">
              Scan the QR code below or use the UPI ID to pay instantly via Google Pay, PhonePe, or Paytm.
            </p>

            {/* UPI ID Field with Highlighted Copy Button */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex justify-between items-center">
              <div>
                <span className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-wider mb-0.5">UPI ID</span>
                <span className="text-xs font-bold text-slate-800 font-mono">{details.upiId}</span>
              </div>
              <button 
                onClick={() => copyToClipboard(details.upiId, 'upiId')}
                style={{ backgroundColor: '#25a544', color: '#ffffff' }}
                className="px-4 py-2 hover:opacity-90 font-black text-[10px] uppercase tracking-wider rounded-lg shadow-sm cursor-pointer select-none transition relative"
              >
                {copiedField === 'upiId' ? 'Copied!' : 'Copy'}
              </button>
            </div>

            {/* QR Code Graphic Frame Container */}
            <div className="flex flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded-[20px] p-6 space-y-4">
              <div className="bg-white border border-slate-150 p-4 rounded-2xl shadow-sm">
                
                {/* QR Code image */}
                <img src={qr} alt="UPI Payment QR Code" className="w-64 h-64 object-contain mx-auto" />

              </div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">SCAN TO PAY SECURELY</span>
              
              {/* Payment App Logos (Static mockup labels) */}
              <div className="flex items-center space-x-3 text-[9px] font-bold text-slate-400">
                <span className="px-2 py-1 bg-white border border-slate-150 rounded shadow-xs">GPay</span>
                <span className="px-2 py-1 bg-white border border-slate-150 rounded shadow-xs">Paytm</span>
                <span className="px-2 py-1 bg-white border border-slate-150 rounded shadow-xs">PhonePe</span>
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM NOTICE BANNER */}
        <div 
          style={{ borderRadius: '16px', backgroundColor: '#fcfdeb', borderColor: '#e1e3b5' }}
          className="border p-6 text-left flex items-start space-x-3"
        >
          <div className="p-1 rounded-full bg-amber-50 text-amber-700 mt-0.5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
              Once payment is done, please share the screenshot on WhatsApp{' '}
              <a href="https://wa.me/918109081040" target="_blank" rel="noopener noreferrer" className="text-[#25a544] hover:underline font-black">
                +91 81090 81040
              </a>{' '}
              or email{' '}
              <a href="mailto:rajivylrsharma89@gmail.com" className="text-[#25a544] hover:underline font-black">
                rajivylrsharma89@gmail.com
              </a>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
