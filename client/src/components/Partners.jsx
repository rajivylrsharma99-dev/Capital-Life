import React from 'react';

export default function Partners() {
  const partners = [
    { name: 'moneycontrol', label: 'moneycontrol' },
    { name: 'economic_times', label: 'The Economic Times' },
    { name: 'zee_business', label: 'ZEE BUSINESS' },
    { name: 'cnbc', label: 'CNBC TV18' },
    { name: 'livemint', label: 'livemint' }
  ];

  return (
    <section className="bg-[#dafd44] py-8 border-y border-[#cee551]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-around gap-6 md:gap-12">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="text-gray-900 font-extrabold text-lg sm:text-xl tracking-widest opacity-80 hover:opacity-100 transition cursor-pointer select-none"
            >
              {partner.label}
            </div>
          ))}
          {/* Support advisor badge */}
          <div className="bg-gray-900 text-white text-xs font-semibold py-2 px-4 rounded-full flex items-center gap-2 cursor-pointer shadow-md hover:bg-gray-800 transition">
            <svg className="w-4 w-4 text-[#dafd44]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 00.9-.045L9.61 7.21a1.2 1.2 0 00-1.42 0l-1.17 1.17a9.045 9.045 0 003.44 3.44l1.17-1.17a1.2 1.2 0 000-1.42l-.548-.548a1 1 0 00-.045-.9l2.2-.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>TALK TO AN ADVISOR</span>
          </div>
        </div>
      </div>
    </section>
  );
}
