'use client';

import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from './AdminPortal.module.css';

const AdminPortal = () => {
  const { user } = useAuth();
  const [asphaltPrice, setAsphaltPrice] = useState('');
  const [metalPrice, setMetalPrice] = useState('');
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    if (user) {
      fetchPrices();
      fetchSubmissions();
    }
  }, [user]);

  const fetchPrices = async () => {
    try {
      const response = await axios.get(`/api/pricing?companyId=${user.uid}`);
      setAsphaltPrice(response.data.asphaltPrice);
      setMetalPrice(response.data.metalPrice);
    } catch (error) {
      console.error('Error fetching prices:', error);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const response = await axios.get(`/api/submissions?companyId=${user.uid}`);
      setSubmissions(response.data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  const handlePriceChange = (e, material) => {
    const value = e.target.value.replace(/[^\d.]/g, ''); // Allow only numbers and decimal point
    if (material === 'asphalt') {
      setAsphaltPrice(value ? value : '');
    } else {
      setMetalPrice(value ? value : '');
    }
  };

  const savePrices = async () => {
    try {
      await axios.post('/api/pricing', {
        companyId: user.uid,
        asphaltPrice: parseFloat(asphaltPrice),
        metalPrice: parseFloat(metalPrice),
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
              placeholder="Asphalt Price per Square Foot"
              value={asphaltPrice}
              onChange={(e) => handlePriceChange(e, 'asphalt')}
              className={styles.inputAddress}
            />
          </div>
          <div className={styles.priceInputContainer}>
            <span className={styles.priceInputPrefix}>$</span>
            <input
              type="text"
              placeholder="Metal Price per Square Foot"
              value={metalPrice}
              onChange={(e) => handlePriceChange(e, 'metal')}
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
                  <td>{`Lat: ${submission.coordinates.lat}, Lng: ${submission.coordinates.lng}`}</td>
                  <td>{submission.material}</td>
                  <td>{`$${submission.pricePerSqFt}`}</td>
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
