import React from 'react';

const TestimonialsSection = () => (
  <section className="testimonials-section py-20 bg-gray-800 text-white">
    <div className="container mx-auto text-center">
      <h2 className="text-5xl font-bold mb-10">What Our Customers Are Saying</h2>
      <div className="grid grid-cols-3 gap-10">
        <div className="testimonial bg-white text-gray-800 p-6 rounded-lg">
          <p>“PitchIt has revolutionized our business operations, serving as a reliable team member to streamline sales processes. Their value has been pivotal in propelling our business to exponential growth. They have transformed our business dynamics with pinpoint accuracy, exceptional turn-around times, and unparalleled support.”</p>
          <div className="mt-4">
            <p className="font-bold text-red-600">Tyrus Backer - Owner / CEO</p>
            <p className="text-gray-600">TC Backer Construction, LLC</p>
          </div>
        </div>
        <div className="testimonial bg-white text-gray-800 p-6 rounded-lg">
          <p>“PitchIt has helped my business streamline our sales process, and working with them is like having another team member I can count on to help out with any upcoming projects I am working on. I have recently begun using ProDocs to create branded estimates and work orders for my jobs, and it has brought a ton of value to my business.”</p>
          <div className="mt-4">
            <p className="font-bold text-red-600">D. Grant - Owner</p>
            <p className="text-gray-600">Grant Group Contractors</p>
          </div>
        </div>
        <div className="testimonial bg-white text-gray-800 p-6 rounded-lg">
          <p>“We have always had the best experience with PitchIt and each and every RoofScope report is 100% accurate and saves us so much time and money; both of which allow our Project Managers to keep moving forward with their day.”</p>
          <div className="mt-4">
            <p className="font-bold text-red-600">Jessica, Willard Picquelle</p>
            <p className="text-gray-600">Temecula Roofing</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
