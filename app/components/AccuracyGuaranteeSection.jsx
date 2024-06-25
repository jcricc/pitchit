import React from 'react';
import Image from 'next/image';

const AccuracyGuaranteeSection = () => (
  <section className="accuracy-section py-20 bg-gray-100">
    <div className="container mx-auto text-center">
      <div className="flex justify-center items-center">
        <div className="ml-10">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">99% Accuracy Guarantee</h2>
          <p className="text-lg text-gray-600">
            Confidence In Your Bids & Bottom Line. Our expert CAD technicians and quality assurance professionals work together to ensure that every report is certified for absolute data precision. With a track record of 99% accuracy, you can be confident in the reliability of our measurements. Don’t let inaccurate estimates hold you back from winning bids and growing your business. Choose RoofScope for the most accurate and reliable aerial measurement reports available.
          </p>
          <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded">DOWNLOAD SAMPLE REPORT</button>
        </div>
      </div>
    </div>
  </section>
);

export default AccuracyGuaranteeSection;
