import React from 'react';

const AccuracyGuaranteeSection = () => (
  <section className="accuracy-section py-20 bg-gray-100">
    <div className="container mx-auto text-center">
      <div className="flex justify-center items-center">
        <div className="ml-10">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">99% Accuracy Guarantee</h2>
          <p className="text-lg text-gray-600">
            At PitchIt, we understand the importance of precision in roofing measurements. Our expert CAD technicians and quality assurance professionals work together to ensure every report is certified for absolute data accuracy. With a proven track record of 99% accuracy, you can trust PitchIt to provide reliable measurements for your roofing projects. Don't let inaccurate estimates affect your bids or business growth. Choose PitchIt for the most accurate and dependable roofing measurement reports available.
          </p>
          <a
            href="/assets/pitchreport.png"
            download
            className="mt-6 px-6 py-3 bg-blue-500 text-white rounded inline-block"
          >
            DOWNLOAD SAMPLE REPORT
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default AccuracyGuaranteeSection;
