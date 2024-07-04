'use client';

import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import styles from './AdminPortal.module.css';

const AdminPortal = () => {
  const { user } = useAuth(); // Destructure the user from the context
  const [asphaltPriceLow, setAsphaltPriceLow] = useState('');
  const [asphaltPriceMed, setAsphaltPriceMed] = useState('');
  const [asphaltPriceHigh, setAsphaltPriceHigh] = useState('');
  const [metalPriceLow, setMetalPriceLow] = useState('');
  const [metalPriceMed, setMetalPriceMed] = useState('');
  const [metalPriceHigh, setMetalPriceHigh] = useState('');
  const [submissions, setSubmissions] = useState([]);

  const fetchPrices = useCallback(async () => {
    try {
      const pricesDoc = await getDocs(collection(db, `companies/${user.uid}/pricing`));
      pricesDoc.forEach(doc => {
        const data = doc.data();
        if (data.material === 'asphalt') {
          setAsphaltPriceLow(data.low);
          setAsphaltPriceMed(data.medium);
          setAsphaltPriceHigh(data.steep);
        } else if (data.material === 'metal') {
          setMetalPriceLow(data.low);
          setMetalPriceMed(data.medium);
          setMetalPriceHigh(data.steep);
        }
      });
    } catch (error) {
      console.error('Error fetching prices:', error);
    }
  }, [user]);

  const fetchSubmissions = useCallback(async () => {
    try {
      const q = query(collection(db, `companies/${user.uid}/submissions`));
      const querySnapshot = await getDocs(q);
      const submissionsList = querySnapshot.docs.map(doc => doc.data());
      setSubmissions(submissionsList);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchPrices();
      fetchSubmissions();
    }
  }, [user, fetchPrices, fetchSubmissions]);

  const handlePriceChange = (e, material, type) => {
    const value = e.target.value.replace(/[^\d.]/g, ''); // Allow only numbers and decimal point
    if (material === 'asphalt') {
      if (type === 'low') setAsphaltPriceLow(value ? `$${value}` : '');
      if (type === 'medium') setAsphaltPriceMed(value ? `$${value}` : '');
      if (type === 'steep') setAsphaltPriceHigh(value ? `$${value}` : '');
    } else if (material === 'metal') {
      if (type === 'low') setMetalPriceLow(value ? `$${value}` : '');
      if (type === 'medium') setMetalPriceMed(value ? `$${value}` : '');
      if (type === 'steep') setMetalPriceHigh(value ? `$${value}` : '');
    }
  };

  const savePrices = async () => {
    try {
      await axios.post('/api/pricing', {
        companyId: user.uid,
        pricing: {
          asphalt: {
            low: parseFloat(asphaltPriceLow.replace('$', '')),
            medium: parseFloat(asphaltPriceMed.replace('$', '')),
            steep: parseFloat(asphaltPriceHigh.replace('$', '')),
          },
          metal: {
            low: parseFloat(metalPriceLow.replace('$', '')),
            medium: parseFloat(metalPriceMed.replace('$', '')),
            steep: parseFloat(metalPriceHigh.replace('$', '')),
          },
        },
      });
      alert('Prices saved successfully!');
    } catch (error) {
      console.error('Error saving prices:', error);
      alert('Failed to save prices!');
    }
  };

  if (!user) {
    return <div className={styles.authMessage}>You need to be authenticated to view this page.</div>;
  }

  return (
    <section className={styles.adminSection}>
      <div className={styles.container}>
        <h1 className={styles.title}>Admin Portal</h1>
        <div className={styles.pricingSection}>
          <h2 className={styles.subtitle}>Set Prices</h2>
          <div className={styles.priceInputContainer}>
            <span className={styles.priceInputPrefix}>$</span>
            <input
              type="text"
              placeholder="Asphalt Price per Square Foot (Low Pitch)"
              value={asphaltPriceLow}
              onChange={(e) => handlePriceChange(e, 'asphalt', 'low')}
              className={styles.inputAddress}
            />
          </div>
          <div className={styles.priceInputContainer}>
            <span className={styles.priceInputPrefix}>$</span>
            <input
              type="text"
              placeholder="Asphalt Price per Square Foot (Medium Pitch)"
              value={asphaltPriceMed}
              onChange={(e) => handlePriceChange(e, 'asphalt', 'medium')}
              className={styles.inputAddress}
            />
          </div>
          <div className={styles.priceInputContainer}>
            <span className={styles.priceInputPrefix}>$</span>
            <input
              type="text"
              placeholder="Asphalt Price per Square Foot (Steep Pitch)"
              value={asphaltPriceHigh}
              onChange={(e) => handlePriceChange(e, 'asphalt', 'steep')}
              className={styles.inputAddress}
            />
          </div>
          <div className={styles.priceInputContainer}>
            <span className={styles.priceInputPrefix}>$</span>
            <input
              type="text"
              placeholder="Metal Price per Square Foot (Low Pitch)"
              value={metalPriceLow}
              onChange={(e) => handlePriceChange(e, 'metal', 'low')}
              className={styles.inputAddress}
            />
          </div>
          <div className={styles.priceInputContainer}>
            <span className={styles.priceInputPrefix}>$</span>
            <input
              type="text"
              placeholder="Metal Price per Square Foot (Medium Pitch)"
              value={metalPriceMed}
              onChange={(e) => handlePriceChange(e, 'metal', 'medium')}
              className={styles.inputAddress}
            />
          </div>
          <div className={styles.priceInputContainer}>
            <span className={styles.priceInputPrefix}>$</span>
            <input
              type="text"
              placeholder="Metal Price per Square Foot (Steep Pitch)"
              value={metalPriceHigh}
              onChange={(e) => handlePriceChange(e, 'metal', 'steep')}
              className={styles.inputAddress}
            />
          </div>
          <button onClick={savePrices} className={styles.button}>
            Save Prices
          </button>
        </div>
        <div className={styles.submissionsSection}>
          <h2 className={styles.subtitle}>View Submissions</h2>
          <table className={styles.submissionsTable}>
            <thead>
              <tr>
                <th>Address</th>
                <th>Coordinates</th>
                <th>Material</th>
                <th>Pitch</th>
                <th>Price per Sq Ft</th>
                <th>Total Cost</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission, index) => (
                <tr key={index}>
                  <td>{submission.address}</td>
                  <td>{`Lat: ${submission.coordinates?.lat || 'N/A'}, Lng: ${submission.coordinates?.lng || 'N/A'}`}</td>
                  <td>{submission.material}</td>
                  <td>{submission.pitch}</td>
                  <td>{`$${submission.price}`}</td>
                  <td>{`$${submission.totalCost}`}</td>
                  <td>{submission.email}</td>
                  <td>{submission.phone}</td>
                  <td>{submission.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminPortal;
