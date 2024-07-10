import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import StepsSection from '../components/StepsSection';
import AccuracyGuaranteeSection from '../components/AccuracyGuaranteeSection';
import ResultsSection from '../components/ResultsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import WhyPitchItSection from '../components/WhyPitchItSection';
import CallToActionSection from '../components/CallToActionSection';
import Footer from '../components/Footer';

const HomePage = () => (
  <div>
    <Header />
    <HeroSection />
    <StepsSection />
    <AccuracyGuaranteeSection />
    <ResultsSection />
    <TestimonialsSection />
    <WhyPitchItSection />
    <CallToActionSection />
    <Footer />
  </div>
);

export default HomePage;
