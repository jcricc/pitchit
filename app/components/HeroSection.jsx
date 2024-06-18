import React from 'react';
import Image from 'next/image';

const HeroSection = () => (
  <section className="hero-section bg-cover bg-center" style={{ backgroundImage: 'url(/main.svg)' }}>
    <div className="container mx-auto text-center py-20">
      <h1 className="text-blue-500 text-6xl font-bold">Let's get started.</h1>
      <p className="text-gray-300 text-2xl mt-4">
        Enter the address or coordinates of a structure you'd like to measure.
      </p>
      <div className="mt-8 flex justify-center space-x-4">
        <input
          type="text"
          placeholder="Enter Address"
          className="input-address py-2 px-4 w-80 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
        />
        <button className="btn-search-address py-2 px-6 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-300">
          SEARCH ADDRESS
        </button>
        <button className="btn-upload-blueprint py-2 px-6 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300">
          UPLOAD BLUEPRINT
        </button>
      </div>
      <Image
        src="/assets/ToolBoxreport.png"
        alt="Report"
        width={578}
        height={558}
        className="mx-auto mt-12 border border-black rounded-md"
      />
    </div>
  </section>
);

export default HeroSection;
