import React from 'react';
import Svg from '../../public/assets/Svg.svg';
import Image2 from 'next/image';
import Svg1 from '../../public/assets/Svg1.svg';
import "./StepsSection.module.css"

const StepsSection = () => (
  <section className="steps-section py-20 bg-gray-100">
    <div className="container mx-auto text-center px-4">
      <h2 className="text-5xl font-bold text-gray-800 mb-10">Get Your Roof Measurements in 3 Easy Steps</h2>
      <div className="steps-container grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="step text-black flex flex-col items-center">
          <Svg className="icon mb-4" />
          <p className="text-lg">Enter the address of the property you want to measure and confirm the location on the map.</p>
        </div>
        <div className="step text-black flex flex-col items-center">
          <div className="relative mb-2">
            <Image2 src="/assets/99.png" alt="Step 2 Image" width={300} height={300} className="step-image mx-auto rounded-lg shadow-lg" />
          </div>
        </div>
        <div className="step text-black flex flex-col items-center">
          <Svg1 className="icon mb-4" />
          <p className="text-lg">Choose the type of roofing material and pitch, then receive an instant estimate directly to your email!</p>
        </div>
      </div>
    </div>
  </section>
);

export default StepsSection;
