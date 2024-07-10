import React from 'react';
import Header from '../components/Header';
import EstimatorSection from '../components/EstimatorSection';
import Footer from '../components/Footer';

const EstimatorPage = () => (
  <section id="estimator-section">
    <div>
      <Header />
      <main className="p-4">
        <EstimatorSection />
      </main>
      <Footer />
    </div>
  </section>
);

export default EstimatorPage;
