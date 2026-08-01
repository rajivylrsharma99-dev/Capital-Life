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
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Payment from './components/Payment';

function App() {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });
  const [currentPage, setCurrentPage] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? 'dashboard' : 'home';
    } catch (e) {
      return 'home';
    }
  });
  const [dashboardTab, setDashboardTab] = useState('risk');


  const showHeaderFooter = currentPage !== 'login' && currentPage !== 'signup' && currentPage !== 'dashboard';

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans antialiased text-gray-700 selection:bg-green-150">
      {showHeaderFooter && (
        <div className="bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#e3ff54] via-[#f8ffdf] to-white to-80%">
          <Header currentPage={currentPage} setCurrentPage={setCurrentPage} user={user} setUser={setUser} />
          {currentPage === 'home' && <Hero setCurrentPage={setCurrentPage} user={user} />}
        </div>
      )}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <>
            <Partners />
            <Awards />
            <Stats />
            <WhyChooseUs />
            <Services setCurrentPage={setCurrentPage} />
            <ResearchProcess />
            <WhyInvestorsChooseCapitalLife setCurrentPage={setCurrentPage} />
            <Testimonials />
            <FAQ />
            <CTA setCurrentPage={setCurrentPage} user={user} />
          </>
        )}
        {currentPage === 'pricing' && <Pricing setCurrentPage={setCurrentPage} />}
        {currentPage === 'contact' && <Contact setCurrentPage={setCurrentPage} />}
        {currentPage === 'offers' && <Offers setCurrentPage={setCurrentPage} />}
        {(currentPage === 'login' || currentPage === 'signup') && (
          <Login setCurrentPage={setCurrentPage} user={user} setUser={setUser} initialSignUp={currentPage === 'signup'} />
        )}
        {currentPage === 'dashboard' && (
          <Dashboard 
            setCurrentPage={setCurrentPage} 
            user={user} 
            setUser={setUser} 
            initialTab={dashboardTab} 
            setInitialTab={setDashboardTab} 
          />
        )}
        {currentPage === 'payment' && (
          <Payment setCurrentPage={setCurrentPage} />
        )}
      </main>
      {showHeaderFooter && <Footer />}
    </div>
  );
}

export default App;

