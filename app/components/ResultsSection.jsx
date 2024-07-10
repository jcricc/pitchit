import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ResultsSection = () => (
  <section className="results-section py-20 bg-gray-100">
    <div className="container mx-auto text-center">
      <div className="flex justify-center items-center">
        <div className="text-left">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Instant Roof Estimate</h2>
          <p className="text-lg text-gray-600">
            Enter your address and receive an instant estimate for your roofing project. Our tool calculates the total cost based on your selected materials and roof pitch, giving you an accurate and quick estimate.
          </p>
            <a href="#estimator-section" className="mt-6 px-6 py-3 bg-blue-500 text-white rounded inline-block">Get Instant Estimate</a>
        </div>
      </div>
    </div>
  </section>
);

export default ResultsSection;
