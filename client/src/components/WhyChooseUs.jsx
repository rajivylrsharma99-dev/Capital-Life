import React from 'react';
import teamHuddle from '../assets/team-huddle.png';
import dataInsights from '../assets/data-insights.png';
import advisorClient from '../assets/advisor-client.png';
import customerSupport from '../assets/customer-support.png';

export default function WhyChooseUs() {
  const cards = [
    {
      title: 'Research-Driven Recommendations',
      text: 'Every call is supported by detailed market analysis.',
      image: teamHuddle,
      imageLeft: true,
      alt: 'Team Huddle'
    },
    {
      title: 'Transparent Approach',
      text: 'No unrealistic promises. No guaranteed returns. Just honest research.',
      image: dataInsights,
      imageLeft: false,
      alt: 'Data Insights Screens'
    },
    {
      title: 'Real-Time Updates',
      text: 'Receive recommendations and market updates instantly.',
      image: advisorClient,
      imageLeft: true,
      alt: 'Financial Advisor Consultation'
    },
    {
      title: 'Dedicated Support',
      text: 'Our research team is available to assist you whenever you need guidance.',
      image: customerSupport,
      imageLeft: false,
      alt: 'Customer Support Representative'
    }
  ];

  return (
    <section className="bg-gray-50 py-20 border-b border-gray-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-5">
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2 block">
              OUR CORE PHILOSOPHY
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Why Capital Life Research
            </h2>
            <p className="text-lg font-bold text-[#15803d] mt-2">
              Research That Puts Your Interests First
            </p>
            <div className="mt-4 w-20 h-1 bg-[#25a544] rounded-full"></div>
          </div>
          <div className="lg:col-span-7 flex flex-col space-y-4 text-sm text-gray-600 leading-relaxed">
            <p>
              Markets move every second. Successful investing isn't about chasing every opportunity—it's about identifying the right opportunities through disciplined research.
            </p>
            <p>
              Our team combines technical analysis, market trends, and risk management to deliver actionable research across Equity, Futures, Options, Commodities, and Indices.
            </p>
          </div>
        </div>

        {/* Alternate Grid cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-150 flex flex-col sm:flex-row hover:shadow-md hover:scale-[1.01] transition duration-300"
            >
              {card.imageLeft ? (
                <>
                  <div className="sm:w-1/2 h-48 sm:h-auto overflow-hidden">
                    <img src={card.image} alt={card.alt} className="w-full h-full object-cover" />
                  </div>
                  <div className="sm:w-1/2 p-6 flex flex-col justify-center">
                    <h3 className="text-base font-bold text-gray-800 mb-2">{card.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{card.text}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="sm:w-1/2 p-6 flex flex-col justify-center order-2 sm:order-1">
                    <h3 className="text-base font-bold text-gray-800 mb-2">{card.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{card.text}</p>
                  </div>
                  <div className="sm:w-1/2 h-48 sm:h-auto overflow-hidden order-1 sm:order-2">
                    <img src={card.image} alt={card.alt} className="w-full h-full object-cover" />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
