import React from 'react';
import Image from 'next/image';

const PartnersSection = () => (
  <section className="partners-section py-20 bg-gray-100">
    <div className="container mx-auto text-center">
      <h2 className="text-5xl font-bold text-gray-800 mb-10">Our Integrated Partners</h2>
      <p className="text-lg text-gray-600 mb-10">
        PitchIt works with leading construction, insurance, technology, and distribution companies to integrate our reporting data into your workflow.
      </p>
      <div className="grid grid-cols-4 gap-10">
        <Image src="/assets/CorelogicLogoSvg.svg" alt="Corelogic" width={177} height={100} />
        <Image src="/assets/jobnimbus-png.png" alt="JobNimbus" width={177} height={100} />
        <Image src="/assets/DWS-med-logo-final-png.png" alt="DWS" width={177} height={100} />
        <Image src="/assets/ZapierLogoSvg.svg" alt="Zapier" width={177} height={100} />
      </div>
      <button className="mt-10 px-6 py-3 bg-blue-500 text-white rounded">BECOME A PARTNER</button>
    </div>
  </section>
);

export default PartnersSection;
