import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import StepsSection from './StepsSection';
import AccuracyGuaranteeSection from './AccuracyGuaranteeSection';
import ResultsSection from './ResultsSection';
import TestimonialsSection from './TestimonialsSection';
import WhyPitchItSection from './WhyPitchItSection';
import CallToActionSection from './CallToActionSection';
import Footer from './Footer';
import EstimatorSection from './EstimatorSection';

const HomePage = () => (
  <div>
    <Header />
    <HeroSection />
    <EstimatorSection />
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
