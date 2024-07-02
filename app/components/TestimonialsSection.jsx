import React from 'react';

const TestimonialsSection = () => (
  <section className="testimonials-section py-20 bg-gray-800 text-white">
    <div className="container mx-auto text-center">
      <h2 className="text-5xl font-bold mb-10">What Our Customers Are Saying</h2>
      <div className="grid grid-cols-3 gap-10">
        <div className="testimonial bg-white text-gray-800 p-6 rounded-lg">
          <p>“PitchIt has been a game-changer for us, seamlessly integrating into our workflow and significantly boosting our efficiency. Their precise measurements and quick turnaround times have enabled us to complete projects faster and more accurately. The support team is always responsive and helpful, making PitchIt an invaluable asset to our company.”</p>
          <div className="mt-4">
            <p className="font-bold text-red-600">Rachel Simmons - Project Manager</p>
            <p className="text-gray-600">Precision Roofing Solutions</p>
          </div>
        </div>
        <div className="testimonial bg-white text-gray-800 p-6 rounded-lg">
          <p>“Using PitchIt has elevated our service quality to a whole new level. The accuracy and detail of the roof measurements provided are outstanding, and the ease of use is a huge plus. This tool has allowed us to save time and resources, ultimately increasing our profitability. The customer support is top-notch, ensuring we get the most out of the software.”</p>
          <div className="mt-4">
            <p className="font-bold text-red-600">Michael Thompson - Director of Operations</p>
            <p className="text-gray-600">Elite Roofing Services, Inc.</p>
          </div>
        </div>
        <div className="testimonial bg-white text-gray-800 p-6 rounded-lg">
          <p>“PitchIt has transformed the way we approach our roofing projects. The ability to quickly obtain accurate roof dimensions has streamlined our planning and estimation processes. This has not only improved our efficiency but also enhanced our customer satisfaction by delivering on time and within budget. The support from PitchIt has been exceptional, making it an indispensable part of our business.”</p>
          <div className="mt-4">
            <p className="font-bold text-red-600">Linda Martinez - Senior Architect</p>
            <p className="text-gray-600">Skyline Construction Group</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
