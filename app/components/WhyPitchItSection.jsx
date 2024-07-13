import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import "./WhyPitchItSection.module.css"

const WhyPitchItSection = () => (
  <section className="why-pitchit-section py-20 bg-gray-100">
    <div className="container mx-auto text-center px-4">
      <div className="flex flex-col md:flex-row justify-center items-center">
        <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-10">
          <Image src="/assets/laptop-(Compressify.io).png" alt="Why PitchIt" width={445} height={298} className="mx-auto md:mx-0" />
        </div>
        <div className="text-left">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Why PitchIt?</h2>
          <p className="text-lg text-gray-600 mb-6">
            PitchIt provides accurate and reliable roofing estimates in minutes. Save time and ensure your bids are accurate with our 99% accuracy guarantee.
          </p>
          <Link href="/#hero-section">
            <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded">Try Now</button>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default WhyPitchItSection;

