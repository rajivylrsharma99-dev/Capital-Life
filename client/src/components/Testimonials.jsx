import React from 'react';

export default function Testimonials() {
  const reviews = [
    {
      title: 'Professional and Transparent',
      quote: 'The research reports are detailed, easy to understand, and supported by proper market analysis.',
      clientName: 'Rajesh Kumar',
      role: 'Long-term Investor',
      initials: 'RK'
    },
    {
      title: 'Excellent Research',
      quote: 'I appreciate the disciplined approach and timely updates throughout the trading session.',
      clientName: 'Ananya Sharma',
      role: 'F&O Trader',
      initials: 'AS'
    },
    {
      title: 'Highly Responsive Team',
      quote: 'The support team is always available to clarify queries before making investment decisions.',
      clientName: 'Vikram Singh',
      role: 'Intraday Trader',
      initials: 'VS'
    }
  ];

  return (
    <section className="bg-white py-20 border-b border-gray-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2 block">
            CLIENT FEEDBACK
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Testimonials
          </h2>
          <div className="mt-4 w-20 h-1 bg-[#25a544] mx-auto rounded-full"></div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-150 rounded-2xl p-8 relative hover:shadow-md transition duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Five Star rating */}
                <div className="flex space-x-1 mb-4 text-yellow-500" aria-label="5 out of 5 stars rating" role="img">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} aria-hidden="true" className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                {/* Review Header */}
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  "{review.title}"
                </h3>
                
                {/* Quote Text */}
                <p className="text-sm text-gray-600 italic leading-relaxed mb-6">
                  {review.quote}
                </p>
              </div>

              {/* Client Profile */}
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[#186a2f] text-white flex items-center justify-center font-bold text-sm">
                  {review.initials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800 leading-none">{review.clientName}</h4>
                  <span className="text-[10px] text-gray-600 font-semibold">{review.role}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
