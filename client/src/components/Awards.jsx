import React from 'react';

export default function Awards() {
  const awardList = [
    {
      category: 'Recognised for Quality',
      title: 'Best MSME Award',
      description: 'Awarded by MSME India for excellence in financial consulting.',
      icon: (
        <svg aria-hidden="true" className="w-16 h-16 text-[#dafd44]" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="8" r="5" fill="#facc15" />
          <path d="M7 13l-2 9 7-4 7 4-2-9" fill="#eab308" />
          <circle cx="12" cy="8" r="3" fill="#fef08a" />
          <path d="M12 5v6M10 8h4" stroke="#ca8a04" strokeWidth="1" />
        </svg>
      )
    },
    {
      category: 'Innovation Excellence',
      title: 'Best Innovation Award',
      description: 'Recognition for pioneering algorithmic trading research.',
      icon: (
        <svg aria-hidden="true" className="w-16 h-16 text-[#25a544]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L4 5v6c0 5.25 3.42 10.18 8 11.5 4.58-1.32 8-6.25 8-11.5V5l-8-3z" fill="#22c55e" />
          <path d="M12 6v10" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M9 9l3-3 3 3" stroke="white" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      )
    },
    {
      category: 'Industry Leadership',
      title: 'Top 100 BFSI Leaders',
      description: 'Named among the most influential leaders in Indian finance.',
      icon: (
        <svg aria-hidden="true" className="w-16 h-16 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
          <rect x="5" y="3" width="14" height="18" rx="2" fill="#1f2937" />
          <path d="M9 7h6M9 11h6M9 15h4" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
          <circle cx="15" cy="15" r="2" fill="#25a544" />
        </svg>
      )
    }
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            National & International Awards
          </h2>
          <div className="mt-4 w-24 h-1 bg-[#25a544] mx-auto rounded-full"></div>
        </div>

        {/* Awards Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {awardList.map((award, index) => (
            <div
              key={index}
              className="bg-white border border-gray-150 rounded-xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 flex flex-col items-center text-center"
            >
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                {award.category}
              </span>
              {award.title && (
                <h3 className="text-xl font-bold text-gray-800 mb-6" aria-label={award.title}>
                  {award.title}
                </h3>
              )}
              
              {/* Award Visual Wrapper */}
              <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-6 border border-gray-100">
                {award.icon}
              </div>

              <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
                {award.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
