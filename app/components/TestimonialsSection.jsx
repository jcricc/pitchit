import React from 'react';
import { CheckIcon } from '@heroicons/react/outline';

const features = [
  {
    title: '99% Accuracy Guarantee',
    description: 'Our reports are certified for absolute data precision, ensuring you can trust the reliability of our measurements.',
    icon: CheckIcon,
  },
  {
    title: 'Instant Estimates',
    description: 'Get quick ballpark estimates for roofing projects by simply entering the address and selecting the materials and pitch.',
    icon: CheckIcon,
  },
  {
    title: 'Easy Embedding',
    description: 'Roofing companies can easily embed the instant estimator on their websites to attract more customers.',
    icon: CheckIcon,
  },
  {
    title: 'Detailed Roof Reports',
    description: 'Receive comprehensive roof reports directly to your email, covering area, pitch, facets, and materials estimation.',
    icon: CheckIcon,
  },
  {
    title: 'Admin Portal',
    description: 'Manage all customer submissions and project interests from a centralized admin portal.',
    icon: CheckIcon,
  },
  {
    title: 'Fast Turnaround Time',
    description: 'Get your detailed reports in less than 12 hours, helping you make quick and informed decisions.',
    icon: CheckIcon,
  },
];

const FeaturesAndBenefitsSection = () => (
  <section className="features-section py-20 bg-gray-100">
    <div className="container mx-auto text-center">
      <h2 className="text-5xl font-bold text-gray-800 mb-10">Features and Benefits</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {features.map((feature) => (
          <div key={feature.title} className="feature bg-white text-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-center mb-4">
              <feature.icon className="h-12 w-12 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
            <p className="text-lg">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesAndBenefitsSection;
