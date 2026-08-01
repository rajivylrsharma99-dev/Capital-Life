import React from 'react';

export default function WhyInvestorsChooseCapitalLife({ setCurrentPage }) {
  const focusAreas = [
    { title: 'Clear Entry & Exit Levels', desc: 'Precise price zones designated for entering and exiting positions to lock in gains.' },
    { title: 'Defined Stop Loss', desc: 'Strict stop-loss levels provided to protect capital and control downside risk.' },
    { title: 'Risk Management', desc: 'Structured sizing recommendations to keep portfolio risk balanced.' },
    { title: 'Timely Market Updates', desc: 'Real-time monitoring and immediate alerts on target achievements or stops.' },
    { title: 'Continuous Research', desc: 'Ongoing market scans to track structural changes, sectors, and charts.' },
    { title: 'Transparent Communication', desc: 'Direct, honest reports detailing all trade logic and historical results.' }
  ];

  return (
    <section className="bg-gray-50 py-20 border-b border-gray-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading and Subheading */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
              OUR INVESTING PHILOSOPHY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              Why Investors Choose Capital Life
            </h2>
            <p className="text-lg font-bold text-[#25a544]">
              Investing Should Be Based on Knowledge, Not Emotions.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              We believe every investment decision should be backed by research, discipline, and proper risk management. That's why our research process focuses on:
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setCurrentPage('contact')}
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-bold text-white bg-gray-900 hover:bg-gray-800 transition cursor-pointer"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Right Column: Focus List Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {focusAreas.map((area, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-start space-x-4 hover:shadow-md transition duration-300"
              >
                {/* Check Icon */}
                <div className="w-8 h-8 rounded-full bg-green-50 flex-shrink-0 flex items-center justify-center text-[#25a544]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1" aria-label={area.title}>{area.title}</h3>
                  <p className="text-[11px] text-gray-400 leading-relaxed">{area.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
