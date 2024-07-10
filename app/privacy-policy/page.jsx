import React from 'react';
import Header from '../components/Header';

const PrivacyPolicy = () => (
    <div>
        <Header/>
  <div className="container mx-auto p-8">
    <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
    <p className="text-lg text-gray-700">
      We take your privacy seriously. Read our privacy policy to learn more about how we handle your data.
    </p>
    {/* Add more content as needed */}
  </div>
    </div>
);

export default PrivacyPolicy;
