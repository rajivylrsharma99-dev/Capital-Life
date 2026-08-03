import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Partners from './components/Partners';
import Awards from './components/Awards';
import Stats from './components/Stats';
import WhyChooseUs from './components/WhyChooseUs';
import Services from './components/Services';
import ResearchProcess from './components/ResearchProcess';
import WhyInvestorsChooseCapitalLife from './components/WhyInvestorsChooseCapitalLife';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Offers from './components/Offers';


function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans antialiased text-gray-700 selection:bg-green-150">
      <div className="bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#e3ff54] via-[#f8ffdf] to-white to-80%">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
        {currentPage === 'home' && <Hero setCurrentPage={setCurrentPage} />}
      </div>
      <main className="flex-grow">
        {currentPage === 'home' && (
          <>
            <Partners setCurrentPage={setCurrentPage} />
            <Awards />
            <Stats />
            <WhyChooseUs />
            <Services setCurrentPage={setCurrentPage} />
            <ResearchProcess />
            <WhyInvestorsChooseCapitalLife setCurrentPage={setCurrentPage} />
            <Testimonials />
            <FAQ />
            <CTA setCurrentPage={setCurrentPage} />
          </>
        )}
        {currentPage === 'pricing' && <Pricing />}
        {currentPage === 'contact' && <Contact setCurrentPage={setCurrentPage} />}
        {currentPage === 'offers' && <Offers setCurrentPage={setCurrentPage} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;

