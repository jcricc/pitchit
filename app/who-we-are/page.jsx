import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const WhoWeAre = () => (
  <div>
    <Header />
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-4">Who We Are</h1>
      <p>We are a company dedicated to saving contractors time and money by providing innovative solutions for estimating and project management.</p>
    </main>
    <Footer />
  </div>
);

export default WhoWeAre;
