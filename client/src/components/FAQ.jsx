import React, { useState } from 'react';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'Is Capital Life Research SEBI Registered?',
      answer: 'Yes. Capital Life Research is a SEBI Registered Research Analyst committed to providing compliant and research-based market recommendations.'
    },
    {
      question: 'Do you guarantee profits?',
      answer: 'No. Investments in the securities market are subject to market risks. We provide research-based recommendations, but returns cannot be guaranteed.'
    },
    {
      question: 'Which markets do you cover?',
      answer: 'We provide research across Equity, Futures, Options, Commodities, and Indices.'
    },
    {
      question: 'How will I receive recommendations?',
      answer: 'Recommendations are shared through our official communication channels with complete trade details.'
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-20 border-b border-gray-150">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
            HAVE QUESTIONS?
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="mt-4 w-20 h-1 bg-[#25a544] mx-auto rounded-full"></div>
        </div>

        {/* Accordions List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm transition duration-200"
              >
                {/* Accordion Trigger Button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-gray-800 hover:bg-gray-50 transition focus:outline-none"
                >
                  <span className="text-sm sm:text-base">{faq.question}</span>
                  <span className={`ml-4 text-gray-400 transform transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#25a544]' : 'rotate-0'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                {/* Accordion Content Panels */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? 'max-h-40 border-t border-gray-100' : 'max-h-0'
                  }`}
                >
                  <div className="p-6 text-xs sm:text-sm text-gray-500 leading-relaxed bg-white">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
