import React from 'react';
import Image from 'next/image';

const WhyPitchItSection = () => (
  <section className="why-pitchit-section py-20 bg-gray-100">
    <div className="container mx-auto text-center">
      <div className="flex justify-center items-center">
        <Image src="/assets/laptop-(Compressify.io).png" alt="Why RoofScope" width={445} height={298} />
        <div className="ml-10 text-left">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Why PitchIt?</h2>
          <p className="text-lg text-gray-600">
            With a 99% accuracy rate and 12 hours or less turnaround time guarantees, PitchIt aerial measurement reports save you time and the hassles of having to re-measure a roof, recalculate data or hand-draft aerial takeoff reports.
          </p>
          <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded">Try Now</button>
        </div>
      </div>
    </div>
  </section>
);

export default WhyPitchItSection;
