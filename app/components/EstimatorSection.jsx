"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { doc, getDoc, addDoc, collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import { db } from '../firebaseConfig';
import { loadGoogleMapsScript } from '../utils/loadGoogleMapsScript';
import styles from './EstimatorSection.module.css';

const defaultCenter = { lat: 39.8283, lng: -98.5795 };

const EstimatorSection = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState(defaultCenter);
  const [staticMapUrl, setStaticMapUrl] = useState('');
  const [roofData, setRoofData] = useState(null);
  const [material, setMaterial] = useState('asphalt');
  const [pitch, setPitch] = useState('low');
  const [price, setPrice] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const autocompleteRef = useRef(null);

  const [companyId, setCompanyId] = useState(null);

  useEffect(() => {
    const element = document.getElementById('estimator-section');
    if (element) {
      setCompanyId(element.dataset.companyId || selectedCompany);
    }
  }, [selectedCompany]);
  

  const geocodeAddress = async (address) => {
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: address,
          key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        },
      });

      if (response.data.status === 'OK') {
        const location = response.data.results[0].geometry.location;
        return { lat: location.lat, lng: location.lng };
      } else {
        console.error('Geocoding API error:', response.data.status);
        return null;
      }
    } catch (error) {
      console.error('Error fetching geocoding data:', error);
      return null;
    }
  };

  const fetchRooftopData = async (location) => {
    try {
      const response = await axios.get('/api/solar', {
        params: {
          lat: location.lat,
          lng: location.lng,
        },
      });

      if (response.data?.solarPotential?.roofSegmentStats) {
        return response.data.solarPotential.wholeRoofStats;
      } else {
        console.error('Invalid data format received from Solar API');
        return null;
      }
    } catch (error) {
      console.error('Error fetching solar data:', error);
      return null;
    }
  };

  const fetchPrice = useCallback(async () => {
    if (companyId) {
      const docRef = doc(db, `companies/${companyId}/pricing`, material);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const pricingData = docSnap.data();
        setPrice(pricingData[pitch]);
      } else {
        console.log('No such document!');
      }
    }
  }, [companyId, material, pitch]);

  useEffect(() => {
    fetchPrice();
  }, [fetchPrice]);

  useEffect(() => {
    loadGoogleMapsScript().then(() => {
      if (autocompleteRef.current) {
        const autocomplete = new google.maps.places.Autocomplete(autocompleteRef.current, {
          fields: ['geometry', 'name', 'formatted_address'],
        });

        autocomplete.addListener('place_changed', async () => {
          const place = autocomplete.getPlace();
          if (place.geometry) {
            const location = place.geometry.location;
            const newCoordinates = { lat: location.lat(), lng: location.lng() };
            setCoordinates(newCoordinates);
            setAddress(place.formatted_address);

            const roofData = await fetchRooftopData(newCoordinates);
            setRoofData(roofData);

            const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${newCoordinates.lat},${newCoordinates.lng}&zoom=19&size=600x700&maptype=satellite&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
            setStaticMapUrl(mapUrl);
          }
        });
      }
    }).catch(error => console.error('Error loading Google Maps script:', error));
  }, []);

  useEffect(() => {
    const fetchCompanies = async () => {
      const companiesSnapshot = await getDocs(collection(db, 'companies'));
      const companiesList = companiesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCompanies(companiesList);
    };

    if (!companyId) {
      fetchCompanies();
    }
  }, [companyId]);

  const calculateTotalCost = () => {
    const areaSqFt = roofData.areaMeters2 * 10.7639;
    return (areaSqFt * price).toFixed(2);
  };

  const handleSubmission = async () => {
    const areaSqFt = roofData.areaMeters2 * 10.7639;
    const submission = {
      address,
      coordinates,
      material,
      pitch,
      price,
      areaSqFt,
      totalCost: calculateTotalCost(),
      email,
      phone,
      name,
    };

    try {
      await addDoc(collection(db, `companies/${companyId}/submissions`), submission);
      alert('Submission saved successfully!');
      setStep(5); // Move to the next step to display the estimate
    } catch (error) {
      console.error('Error saving submission:', error);
      alert('Failed to save submission!');
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <section className={`${styles.estimatorSection}`} data-company-id={companyId} id="estimator-section">
      <div className={styles.container}>
        <h1 className={styles.title}>Instant Roof Estimate</h1>
        {!companyId && (
          <div>
            <label htmlFor="company-select" className="block text-lg font-medium text-gray-700 mb-2">
              Select Company
            </label>
            <select
              id="company-select"
              name="company"
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="mb-4 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="" disabled>Select a company...</option>
              {companies.map(company => (
                <option key={company.id} value={company.id}>
                  {company.companyName}
                </option>
              ))}
            </select>
          </div>
        )}
        {step === 1 && (
          <div>
            <input
              ref={autocompleteRef}
              type="text"
              placeholder="Enter your address"
              className={`${styles.inputAddress} mb-4`}
            />
            <button onClick={nextStep} className={styles.button}>
              Next
            </button>
          </div>
        )}
        {step === 2 && staticMapUrl && (
          <div>
            <div className={`${styles.mapContainer} mt-4`}>
              <Image src={staticMapUrl} alt="Selected location" className="mx-auto" width={600} height={700} />
              <p>{address}</p>
            </div>
            <div className={styles.buttonGroup}>
              <button onClick={prevStep} className={styles.buttonSecondary}>
                Previous
              </button>
              <button onClick={nextStep} className={styles.button}>
                Next
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <h2 className={styles.subtitle}>Select Roofing Material</h2>
            <div className={`${styles.radioGroup} mb-4`}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="material"
                  value="asphalt"
                  checked={material === 'asphalt'}
                  onChange={(e) => setMaterial(e.target.value)}
                  className={styles.radioInput}
                />
                Asphalt Shingles
                <Image
                  src="/assets/asphalt.jpeg"
                  alt="Asphalt Shingles"
                  width={100}
                  height={100}
                  className={styles.materialImage}
                />
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="material"
                  value="metal"
                  checked={material === 'metal'}
                  onChange={(e) => setMaterial(e.target.value)}
                  className={styles.radioInput}
                />
                Metal Roofing
                <Image
                  src="/assets/metalroof.jpeg"
                  alt="Metal Roofing"
                  width={120}
                  height={120}
                  className={styles.materialImage}
                />
              </label>
            </div>
            <h2 className={styles.subtitle}>Select Roof Pitch</h2>
            <div className={`${styles.radioGroup} mb-4`}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="pitch"
                  value="low"
                  checked={pitch === 'low'}
                  onChange={(e) => setPitch(e.target.value)}
                  className={styles.radioInput}
                />
                Low (0-6/12)
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="pitch"
                  value="medium"
                  checked={pitch === 'medium'}
                  onChange={(e) => setPitch(e.target.value)}
                  className={styles.radioInput}
                />
                Medium (7-10/12)
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="pitch"
                  value="steep"
                  checked={pitch === 'steep'}
                  onChange={(e) => setPitch(e.target.value)}
                  className={styles.radioInput}
                />
                Steep (11-12/12)
              </label>
            </div>
            <div className={styles.buttonGroup}>
              <button onClick={prevStep} className={styles.buttonSecondary}>
                Previous
              </button>
              <button onClick={nextStep} className={styles.button}>
                Next
              </button>
            </div>
          </div>
        )}
        {step === 4 && (
          <div>
            <h2 className={styles.subtitle}>Enter Your Information</h2>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`${styles.inputAddress} mb-4`}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${styles.inputAddress} mb-4`}
              />
              <input
                type="tel"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`${styles.inputAddress} mb-4`}
              />
            </div>
            <div className={styles.buttonGroup}>
              <button onClick={prevStep} className={styles.buttonSecondary}>
                Previous
              </button>
              <button onClick={nextStep} className={styles.button}>
                Next
              </button>
            </div>
          </div>
        )}
        {step === 5 && roofData && price && (
          <div>
            <h2 className={styles.subtitle}>Estimated Cost</h2>
            <p>Total Roof Area: {(roofData.areaMeters2 * 10.7639).toFixed(2)} ft²</p>
            <p>Price per Square Foot: ${price}</p>
            <p>Total Cost: ${calculateTotalCost()}</p>
            <div className={styles.buttonGroup}>
              <button onClick={prevStep} className={styles.buttonSecondary}>
                Previous
              </button>
              <button onClick={handleSubmission} className={styles.button}>
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EstimatorSection;
