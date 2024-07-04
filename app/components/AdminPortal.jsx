'use client';

import { useAuth } from '../hooks/useAuth';
import { useState, useEffect, useCallback } from 'react';
import { collection, query, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import styles from './AdminPortal.module.css';

const AdminPortal = () => {
  const { user } = useAuth();
  const [asphaltPrice, setAsphaltPrice] = useState({ low: '', medium: '', steep: '' });
  const [metalPrice, setMetalPrice] = useState({ low: '', medium: '', steep: '' });
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    if (user) {
      fetchPrices();
      fetchSubmissions();
    }
  }, [user]);

  const fetchPrices = async () => {
    try {
      const docRef = doc(db, `companies/${user.uid}/pricing`, 'asphalt');
      const asphaltSnap = await getDoc(docRef);
      if (asphaltSnap.exists()) {
        setAsphaltPrice(asphaltSnap.data());
      }

      const metalDocRef = doc(db, `companies/${user.uid}/pricing`, 'metal');
      const metalSnap = await getDoc(metalDocRef);
      if (metalSnap.exists()) {
        setMetalPrice(metalSnap.data());
      }
    } catch (error) {
      console.error('Error fetching prices:', error);
    }
  };

  const fetchSubmissions = useCallback(async () => {
    if (user) {
      const q = query(collection(db, `companies/${user.uid}/submissions`));
      const querySnapshot = await getDocs(q);
      const submissionsData = querySnapshot.docs.map(doc => doc.data());
      setSubmissions(submissionsData);
    }
  }, [user]);

  const handlePriceChange = (e, material, pitch) => {
    const value = e.target.value.replace(/[^\d.]/g, ''); // Allow only numbers and decimal point
    if (material === 'asphalt') {
      setAsphaltPrice(prevState => ({ ...prevState, [pitch]: value ? `$${value}` : '' }));
    } else {
      setMetalPrice(prevState => ({ ...prevState, [pitch]: value ? `$${value}` : '' }));
    }
  };

  const savePrices = async () => {
    try {
      await setDoc(doc(db, `companies/${user.uid}/pricing`, 'asphalt'), asphaltPrice);
      await setDoc(doc(db, `companies/${user.uid}/pricing`, 'metal'), metalPrice);
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
          <h3>Asphalt Shingles</h3>
          {['low', 'medium', 'steep'].map((pitch) => (
            <div key={pitch} className={styles.priceInputContainer}>
              <span className={styles.priceInputPrefix}>{pitch.charAt(0).toUpperCase() + pitch.slice(1)} Pitch</span>
              <input
                type="text"
                placeholder={`Asphalt ${pitch.charAt(0).toUpperCase() + pitch.slice(1)} Price per Square Foot`}
                value={asphaltPrice[pitch]}
                onChange={(e) => handlePriceChange(e, 'asphalt', pitch)}
                className={styles.inputAddress}
              />
            </div>
          ))}
          <h3>Metal Roofing</h3>
          {['low', 'medium', 'steep'].map((pitch) => (
            <div key={pitch} className={styles.priceInputContainer}>
              <span className={styles.priceInputPrefix}>{pitch.charAt(0).toUpperCase() + pitch.slice(1)} Pitch</span>
              <input
                type="text"
                placeholder={`Metal ${pitch.charAt(0).toUpperCase() + pitch.slice(1)} Price per Square Foot`}
                value={metalPrice[pitch]}
                onChange={(e) => handlePriceChange(e, 'metal', pitch)}
                className={styles.inputAddress}
              />
            </div>
          ))}
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
                  <td>
                    {submission.coordinates
                      ? `Lat: ${submission.coordinates.lat}, Lng: ${submission.coordinates.lng}`
                      : 'Coordinates not available'}
                  </td>
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
