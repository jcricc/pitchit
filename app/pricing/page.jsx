"use client";

import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import Header from '../components/Header';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const PricingPage = () => (
    <div>
        <Header />
  <div className="container mx-auto p-8">
    <h1 className="text-4xl font-bold mb-6">Pricing</h1>
    <p className="text-lg text-gray-300 mb-4">
      Choose the best plan that suits your needs. You can purchase instant roof reports a la carte or subscribe to a plan for instant estimates.
    </p>

    <section className="mb-12">
      <h2 className="text-3xl font-semibold mb-4">Instant Roof Report</h2>
      <p className="text-lg text-gray-300 mb-4">
        Purchase individual roof reports for a comprehensive analysis of a single property.
      </p>
      <ul className="list-disc list-inside text-lg text-gray-300">
        <li className="mb-2">Detailed roof analysis</li>
        <li className="mb-2">Accurate cost estimation</li>
        <li className="mb-2">Easy-to-read report</li>
      </ul>
      <p className="text-2xl font-bold mt-4">$5 per report</p>
      <Elements stripe={stripePromise}>
        <CheckoutForm product={{ name: 'Instant Roof Report', price: 500 }} />
      </Elements>
    </section>

    <section className="mb-12">
      <h2 className="text-3xl font-semibold mb-4">Instant Estimates Subscription</h2>
      <p className="text-lg text-gray-300 mb-4">
        Subscribe to our instant estimates plan and receive a set number of leads each month.
      </p>

      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-2">Basic Plan</h3>
        <p className="text-lg text-gray-300 mb-4">
          Receive up to 50 leads per month.
        </p>
        <ul className="list-disc list-inside text-lg text-gray-300">
          <li className="mb-2">Up to 50 leads</li>
          <li className="mb-2">Priority support</li>
        </ul>
        <p className="text-2xl font-bold mt-4">$25/month</p>
        <Elements stripe={stripePromise}>
          <CheckoutForm product={{ name: 'Basic Plan', price: 2500, subscription: true }} />
        </Elements>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-2">Pro Plan</h3>
        <p className="text-lg text-gray-300 mb-4">
          Receive up to 200 leads per month.
        </p>
        <ul className="list-disc list-inside text-lg text-gray-300">
          <li className="mb-2">Up to 200 leads</li>
          <li className="mb-2">Priority support</li>
        </ul>
        <p className="text-2xl font-bold mt-4">$50/month</p>
        <Elements stripe={stripePromise}>
          <CheckoutForm product={{ name: 'Pro Plan', price: 5000, subscription: true }} />
        </Elements>
      </div>
    </section>
  </div>
    </div>
);

export default PricingPage;
