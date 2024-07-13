"use client";

import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import StepsSection from '../components/StepsSection';
import AccuracyGuaranteeSection from '../components/AccuracyGuaranteeSection';
import ResultsSection from '../components/ResultsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import WhyPitchItSection from '../components/WhyPitchItSection';
import CallToActionSection from '../components/CallToActionSection';
import Footer from '../components/Footer';

const HomePage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // or a loading spinner
  }

  return (
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
};

export default HomePage;
