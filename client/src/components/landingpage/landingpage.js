import React from 'react';
import Footer from './Footer';
import HeroSection from './HeroSection';
//import Header from './Header';
import AboutUs from './AboutUs';
import Features from './Features';
import Details from './Details';
import './styles.css';

function LandingPage() {
  return (
    <div className='landing-page'>
      
      <HeroSection />
      <Features/>
      <AboutUs />
      <Details/>
      <Footer />
    </div>
  );
}

export default LandingPage;
