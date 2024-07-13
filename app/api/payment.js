import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { stripe } from '../../utils/stripe';

const db = getFirestore();

const handlePayment = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { paymentMethodId, product } = req.body;

  try {
    let paymentIntent;

    if (product.subscription) {
      paymentIntent = await stripe.paymentIntents.create({
        amount: product.price,
        currency: 'usd',
        payment_method: paymentMethodId,
        confirm: true,
      });
    } else {
      paymentIntent = await stripe.paymentIntents.create({
        amount: product.price,
        currency: 'usd',
        payment_method: paymentMethodId,
        confirm: true,
      });
    }

    await setDoc(doc(db, 'payments', paymentIntent.id), {
      product,
      paymentIntent,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default handlePayment;
