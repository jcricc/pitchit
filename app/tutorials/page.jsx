import React from 'react';
import Header from '../components/Header';

const Tutorials = () => (
    <div>
        <Header />
  <div className="container mx-auto p-8">
    <h1 className="text-4xl font-bold mb-6">Tutorials</h1>
    
    <section className="mb-12">
      <h2 className="text-3xl font-semibold mb-4">Embedding the Estimator Section</h2>
      <p className="text-lg text-white mb-4">
        Follow these steps to embed the Estimator Section component into your website. Make sure to replace `YOUR_COMPANY_ID` with your actual company ID:
      </p>
      <pre className="bg-gray-200 p-4 mb-4 text-black">
        <code>
          {`<div id="estimator-section" data-company-id="YOUR_COMPANY_ID"></div>
    <script src="https://yourdomain.com/path/to/estimator.js"></script>`}
        </code>
      </pre>

      <h3 className="text-2xl font-semibold mb-2">Step 2: Initialize the Component</h3>
      <p className="text-lg text-gray-700 mb-4">
        Add the following script to initialize the Estimator Section component:
      </p>
      <pre className="bg-gray-200 p-4 mb-4 text-black">
        <code>
          {`<script>
  window.onload = function() {
    const companyId = document.getElementById('estimator-section').dataset.companyId;
    EstimatorSection.init({
      container: '#estimator-section',
      companyId: companyId,
      apiKey: 'your-api-key',
    });
  };
</script>`}
        </code>
      </pre>

      <h3 className="text-2xl font-semibold mb-2">Admin Portal Integration</h3>
      <p className="text-lg text-white mb-4">
        Use the Admin Portal to manage and customize the Estimator Section. Log in to your account, navigate to the
        Estimator Section settings, and configure the available options according to your needs.
      </p>
      <p className="text-lg text-white mb-4">
        For more detailed instructions, refer to our Admin Portal documentation or contact our support team.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-3xl font-semibold mb-4">General Tutorials</h2>
      <p className="text-lg text-white mb-4">
        Here you can find tutorials on various topics to help you get the most out of our tools and features.
      </p>
      <ul className="list-disc list-inside text-lg text-white">
        <li className="mb-2">How to Set Up Your Account</li>
        <li className="mb-2">Using the Dashboard</li>
        <li className="mb-2">Managing Your Projects</li>
        <li className="mb-2">Customizing Your Settings</li>
        <li className="mb-2">Integrating with Other Tools</li>
      </ul>
    </section>

    <section className="mb-12">
      <h2 className="text-3xl font-semibold mb-4">FAQ</h2>
      <p className="text-lg text-white mb-4">
        Have questions? Check out our frequently asked questions for quick answers.
      </p>
      <ul className="list-disc list-inside text-lg text-white">
        <li className="mb-2">How do I reset my password?</li>
        <li className="mb-2">How do I contact support?</li>
        <li className="mb-2">Where can I find my API key?</li>
        <li className="mb-2">How do I update my billing information?</li>
        <li className="mb-2">Can I integrate with other platforms?</li>
      </ul>
    </section>
  </div>
    </div>
);

export default Tutorials;
