import React from 'react';
import Header from '../components/Header';

const TermsOfUse = () => (
    <div>
        <Header/>
  <div className="container mx-auto p-8">
    <h1 className="text-4xl font-bold mb-4">Terms of Use</h1>
    <p className="text-lg text-gray-700">
      By using our services, you agree to our terms of use. Read more about them here.
    </p>
    {/* Add more content as needed */}
  </div>
    </div>
);

export default TermsOfUse;
