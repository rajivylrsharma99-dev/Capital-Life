import React from 'react';
import wealthGrowth from '../assets/wealth-growth.png';

export default function Stats() {
  const statsList = [
    { value: '5000+', label: 'Research Recommendations Delivered', darkBg: false },
    { value: '10+ Years', label: 'Combined Market Experience', darkBg: true },
    { value: 'SEBI Registered', label: 'Research Analyst', darkBg: true },
    { value: 'Thousands', label: 'of Investors Served Across India', darkBg: false }
  ];

  return (
    <section className="bg-white py-20 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Trusted by Investors Who Value Research
          </h2>
          <div className="mt-3 w-20 h-1 bg-[#25a544] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Stats */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            {/* Grid of Stat Cards */}
            <div className="grid grid-cols-2 gap-4">
              {statsList.map((stat, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl shadow-sm border transition hover:shadow-md duration-300 flex flex-col justify-center min-h-[140px] ${
                    stat.darkBg
                      ? 'bg-[#186a2f] border-[#135425] text-white'
                      : 'bg-[#dafd44] border-[#cee551] text-gray-900'
                  }`}
                >
                  <div className="text-2xl sm:text-3xl font-extrabold mb-2 leading-tight">
                    {stat.value}
                  </div>
                  <div className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider leading-relaxed ${
                    stat.darkBg ? 'text-green-200' : 'text-gray-700'
                  }`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-gray-50 transform hover:scale-[1.01] transition duration-300">
              <img
                src={wealthGrowth}
                alt="Sustainable Wealth Growth Chart"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
