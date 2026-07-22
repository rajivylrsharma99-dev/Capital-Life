import React, { useState } from 'react';
import officeMap from '../assets/office-map.png';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-[#fcfdfe] min-h-screen">
      
      {/* Section 1: Hero Section */}
      <div className="relative py-16 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] border-b border-gray-100 flex flex-col items-center justify-center text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-extrabold bg-[#dafd44]/20 border border-[#cee551]/30 text-green-800 uppercase tracking-widest">
            Support Center
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
            Get in <span className="text-[#25a544]">Touch</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto leading-relaxed font-medium">
            Our experts are here to help you navigate your wealth creation journey. Reach out to us for any queries or expert assistance.
          </p>
        </div>
      </div>

      {/* Section 2: Form & Contact Info Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Send us a Message Form */}
          <div className="lg:col-span-7 bg-white rounded-[24px] border border-gray-200 p-8 sm:p-10 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-black text-gray-955 mb-8 tracking-tight">Send us a Message</h2>
              
              {submitted ? (
                <div className="bg-green-50 border border-green-205 text-green-800 p-8 rounded-2xl text-center space-y-4">
                  <svg className="w-16 h-16 text-[#25a544] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-bold">Message Sent Successfully!</h3>
                  <p className="text-xs text-green-700 leading-relaxed font-medium">Thank you, {formData.name}. We have received your query regarding "{formData.subject}" and will respond to you via email within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-250 focus:border-[#25a544] focus:ring-1 focus:ring-green-500 focus:outline-none text-sm transition font-medium text-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-250 focus:border-[#25a544] focus:ring-1 focus:ring-green-500 focus:outline-none text-sm transition font-medium text-gray-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">Mobile Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 00000 00000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-250 focus:border-[#25a544] focus:ring-1 focus:ring-green-500 focus:outline-none text-sm transition font-medium text-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">Subject</label>
                      <div className="relative">
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-250 focus:border-[#25a544] focus:ring-1 focus:ring-green-500 focus:outline-none text-sm transition font-medium text-gray-800 appearance-none bg-white"
                        >
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Advisory Queries">Advisory Queries</option>
                          <option value="Billing & Pricing">Billing & Pricing</option>
                          <option value="Grievance / Support">Grievance / Support</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-450">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">Message</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="How can we help you today?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-250 focus:border-[#25a544] focus:ring-1 focus:ring-green-500 focus:outline-none text-sm transition font-medium text-gray-800"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-xs font-extrabold rounded-xl text-gray-900 bg-[#dafd44] hover:bg-[#cee551] shadow-sm transition duration-150 tracking-wider uppercase"
                    >
                      Send Message
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>

                </form>
              )}
            </div>
          </div>

          {/* Right Column: Direct Contact & Registered Office */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Direct Contact Card (Charcoal Dark) */}
            <div className="bg-[#0f1115] rounded-[24px] p-8 text-white shadow-sm relative overflow-hidden">
              <h3 className="text-lg font-bold mb-6 tracking-tight">Direct Contact</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 bg-[#1a1c22] border border-gray-800 rounded-2xl p-5 hover:bg-[#20232a] transition">
                  <div className="w-10 h-10 rounded-xl bg-[#dafd44]/10 border border-[#dafd44]/20 flex items-center justify-center text-[#dafd44] flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 00.9-.045L9.61 7.21a1.2 1.2 0 00-1.42 0l-1.17 1.17a9.045 9.045 0 003.44 3.44l1.17-1.17a1.2 1.2 0 000-1.42l-.548-.548a1 1 0 00-.045-.9l2.2-.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest block font-bold leading-none mb-1">CALL US</span>
                    <a href="tel:+918109081040" className="text-base font-extrabold text-white hover:text-[#dafd44] transition">
                      +91 81090 81040
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 bg-[#1a1c22] border border-gray-800 rounded-2xl p-5 hover:bg-[#20232a] transition">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest block font-bold leading-none mb-1">EMAIL US</span>
                    <a href="mailto:rajivylrsharma89@gmail.com" className="text-sm font-extrabold text-white hover:text-[#dafd44] transition truncate block">
                      rajivylrsharma89@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 bg-[#1a1c22] border border-gray-800 rounded-2xl p-5 hover:bg-[#20232a] transition">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest block font-bold leading-none mb-1">SEBI REGISTRATION</span>
                    <span className="text-sm font-extrabold text-white">
                      INH000022163
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Registered Office Card (Light Gray) */}
            <div className="bg-[#f8fafc] rounded-[24px] p-8 border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center tracking-tight">
                  <div className="w-8 h-8 rounded-lg bg-green-50 border border-green-150 flex items-center justify-center mr-2 text-[#25a544] shadow-sm">
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  Registered Office
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6 font-semibold">
                  Office No 103, 1st Floor, Aditya Apartment, Shree Nagar Main, Above G3 Royal, Indore, Madhya Pradesh - 452010
                </p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest block mb-4">FOLLOW OUR GROWTH</span>
                <div className="flex space-x-3">
                  <span className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#25a544] hover:border-[#25a544] cursor-pointer transition shadow-sm">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M18 13v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-12a1 1 0 011-1h6M18 2h4v4M12 12L22 2"/>
                    </svg>
                  </span>
                  <span className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#25a544] hover:border-[#25a544] cursor-pointer transition shadow-sm">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2L2 22h20L12 2zM12 6l6 12H6L12 6z"/>
                    </svg>
                  </span>
                  <span className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#25a544] hover:border-[#25a544] cursor-pointer transition shadow-sm">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z"/>
                    </svg>
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Section 3: Visit Our Offices */}
      <div className="bg-[#f8fafc] border-t border-b border-gray-200/80 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-flex items-center text-xs font-bold text-[#25a544] uppercase tracking-wider">
                <svg className="w-4.5 h-4.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                GLOBAL HQ
              </span>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Visit Our Offices
              </h2>
              
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-md font-medium">
                Our doors are open for financial consultations and market discussions. Schedule a visit to our corporate headquarters in the heart of Indore.
              </p>

              {/* Office Hours Capsule */}
              <div className="inline-flex items-center space-x-4 bg-white border border-gray-200 px-5 py-4 rounded-2xl shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-green-50 border border-green-150 flex items-center justify-center text-[#25a544] flex-shrink-0">
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-bold block leading-none mb-1">OFFICE HOURS</span>
                  <span className="text-xs sm:text-sm font-bold text-gray-800">Mon-Fri: 9:00 AM - 6:30 PM</span>
                </div>
              </div>
            </div>

            {/* Right Map Image */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="relative rounded-[24px] overflow-hidden border border-gray-200 bg-white p-3 shadow-lg">
                <img
                  src={officeMap}
                  alt="Indore Office Location HQ Map"
                  className="rounded-[18px] max-w-full h-auto object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Section 4: Trusted & Featured By Strip */}
      <div className="bg-[#dafd44] py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 text-center">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block w-full lg:w-auto lg:mr-4">
              TRUSTED & FEATURED BY
            </span>
            <span className="text-sm font-black text-gray-900 italic tracking-wider">FINANCIAL EXPRESS</span>
            <span className="text-sm font-black text-gray-900 italic tracking-wider">ECONOMIC TIMES</span>
            <span className="text-sm font-black text-gray-900 italic tracking-wider">ZEE BUSINESS</span>
            <span className="text-sm font-black text-gray-900 italic tracking-wider">MONEYCONTROL</span>
            <span className="text-sm font-black text-gray-900 italic tracking-wider">CNBC TV18</span>
          </div>
        </div>
      </div>

    </div>
  );
}
