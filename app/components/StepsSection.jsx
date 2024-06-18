import React from 'react';
import Svg from '../../public/assets/Svg.svg';
import Image2 from 'next/image';
import Svg1 from '../../public/assets/Svg1.svg';

const StepsSection = () => (
  <section className="steps-section py-20 bg-gray-100">
    <div className="container mx-auto text-center">
      <h2 className="text-5xl font-bold text-gray-800 mb-10">Roof Measurements in 3 easy steps</h2>
      <div className="grid grid-cols-3 gap-10">
        <div className="step">
          <Svg className="mx-auto mb-4" />
          <p>Simply enter the address of the structure you want to be measured and confirm the pin is in the correct spot.</p>
        </div>
        <div className="step">
          <Image2 src="/assets/image2.png" alt="Step 2 Image" width={500} height={300} className="mx-auto mb-4" />
          <p>Select your structure type and add any auxiliary buildings needed (garages, sheds, pool houses, etc.).</p>
        </div>
        <div className="step">
          <Svg1 className="mx-auto mb-4" />
          <p>Select the type(s) of report you need for your structure, then add them to your cart! That’s it, you’re done.</p>
        </div>
      </div>
    </div>
  </section>
);

export default StepsSection;
