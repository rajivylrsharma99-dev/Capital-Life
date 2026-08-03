import React from 'react';

export default function ResearchProcess() {
  const steps = [
    {
      num: '01',
      title: 'Market Screening',
      text: 'Thousands of market opportunities are scanned every day.'
    },
    {
      num: '02',
      title: 'Technical & Fundamental Analysis',
      text: 'Multiple indicators, price action, volumes, and sector trends are evaluated.'
    },
    {
      num: '03',
      title: 'Risk Assessment',
      text: 'Each recommendation includes defined risk parameters.'
    },
    {
      num: '04',
      title: 'Recommendation Delivery',
      text: 'Actionable research is delivered through our communication channels.'
    },
    {
      num: '05',
      title: 'Continuous Monitoring',
      text: 'Markets are monitored throughout the trading session with timely updates.'
    }
  ];

  return (
    <section className="bg-white py-20 border-b border-gray-150 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2 block">
            HOW WE WORK
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Our Research Process
          </h2>
          <div className="mt-4 w-20 h-1 bg-[#25a544] mx-auto rounded-full"></div>
        </div>

        {/* Horizontal/Vertical Connector Timeline */}
        <div className="relative">
          
          {/* Main Connector Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-[58px] left-[5%] right-[5%] h-0.5 bg-gray-250 z-0"></div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center lg:items-start text-center lg:text-left group">
                
                {/* Step Circle */}
                <div className="w-16 h-16 rounded-full bg-[#186a2f] text-white flex items-center justify-center font-extrabold text-lg mb-6 border-4 border-white shadow-md group-hover:bg-[#dafd44] group-hover:text-gray-900 transition duration-305">
                  {step.num}
                </div>

                {/* Step Content */}
                {step.title && (
                  <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight" aria-label={step.title}>
                    {step.title}
                  </h3>
                )}
                <p className="text-xs text-gray-600 leading-relaxed max-w-xs lg:max-w-none">
                  {step.text}
                </p>

                {/* Arrow Connector (Mobile/Tablet Only, between items) */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden my-4 text-[#15803d]">
                    <svg aria-hidden="true" className="w-6 h-6 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
