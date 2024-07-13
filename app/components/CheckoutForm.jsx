import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutForm = ({ product }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error(error);
      return;
    }

    const paymentData = {
      paymentMethodId: paymentMethod.id,
      product,
    };

    const response = await axios.post('/api/payment', paymentData);

    if (response.data.error) {
      console.error(response.data.error);
      return;
    }

    alert('Payment successful!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe} className="px-6 py-3 bg-blue-500 text-white rounded mt-4 hover:bg-blue-600 transition duration-300">
        {product.subscription ? 'Subscribe' : 'Buy Now'}
      </button>
    </form>
  );
};

export default CheckoutForm;
