import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ResultsSection = () => (
  <section className="results-section py-20 bg-gray-100">
    <div className="container mx-auto text-center">
      <div className="flex justify-center items-center">
        <div className="text-left">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Results In Minutes!</h2>
          <p className="text-lg text-gray-600">
            Use PitchIt to collect field data quickly so that you can provide your customers accurate estimates and reduce costly material overages. Watch the explainer video to see how it works or download it from the App Store or Google Play and start scoping!
          </p>
          <Link href="/#hero-section" legacyBehavior>
            <a className="mt-6 px-6 py-3 bg-blue-500 text-white rounded inline-block">Get Results!</a>
          </Link>
          <div className="flex justify-center mt-6">
            <Image src="/assets/thumbnail.png" alt="App Store" width={350} height={350} />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ResultsSection;
