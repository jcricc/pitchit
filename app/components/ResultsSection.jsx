import React from 'react';
import Image from 'next/image';

const ResultsSection = () => (
  <section className="results-section py-20 bg-gray-100">
    <div className="container mx-auto text-center">
      <div className="flex justify-center items-center">
        <div className="text-left">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Results In Minutes!</h2>
          <p className="text-lg text-gray-600">
            Use ScopeApp to collect field data quickly so that you can provide your customers accurate estimates and reduce costly material overages. Watch the explainer video to see how it works or download it from the App Store or Google Play and start scoping!
          </p>
          <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded">WATCH THE VIDEO</button>
          <div className="flex justify-center mt-6">
            <Image src="/assets/prodocs2468-png.png" alt="App Store" width={128} height={64} />
            <Image src="/assets/prodocs2468-png.png" alt="Google Play" width={128} height={64} />
          </div>
        </div>
        <Image src="/assets/prodocs2468-png.png" alt="Phone App" width={164} height={328} />
      </div>
    </div>
  </section>
);

export default ResultsSection;