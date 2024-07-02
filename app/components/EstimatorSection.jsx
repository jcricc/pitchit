"use client";

import React, { useState, useRef } from 'react';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import axios from 'axios';
import Image from 'next/image';
import styles from './EstimatorSection.module.css';

const libraries = ['places'];
const defaultCenter = { lat: 39.8283, lng: -98.5795 };

const EstimatorSection = () => {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState(defaultCenter);
  const [staticMapUrl, setStaticMapUrl] = useState('');
  const [roofData, setRoofData] = useState(null);
  const [material, setMaterial] = useState('asphalt');
  const [pricePerSqFt, setPricePerSqFt] = useState('');
  const autocompleteRef = useRef(null);

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

  const onPlaceChanged = async () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
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
    }
  };

  const calculateTotalCost = (areaMeters2, pricePerSqFt) => {
    const areaSqFt = areaMeters2 * 10.7639;
    return (areaSqFt * pricePerSqFt).toFixed(2);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/[^\d.]/g, ''); // Allow only numbers and decimal point
    setPricePerSqFt(value ? `$${value}` : '');
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <section className={`${styles.estimatorSection}`}>
      <div className={styles.container}>
        <h1 className={styles.title}>Instant Roof Estimate</h1>
        {step === 1 && (
          <div>
            <LoadScript
              googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
              libraries={libraries}
            >
              <Autocomplete
                onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                onPlaceChanged={onPlaceChanged}
              >
                <input
                  type="text"
                  placeholder="Enter your address"
                  className={`${styles.inputAddress} mb-4`}
                />
              </Autocomplete>
            </LoadScript>
            <button onClick={nextStep} className={styles.button}>
              Next
            </button>
          </div>
        )}
        {step === 2 && staticMapUrl && (
          <div>
            <div className={`${styles.mapContainer} mt-4`}>
              <img src={staticMapUrl} alt="Selected location" className="mx-auto" />
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
            <h2 className={styles.subtitle}>Set Price per Square Foot</h2>
            <div className={styles.priceInputContainer}>
              <input
                type="text"
                placeholder="Enter price per square foot"
                value={pricePerSqFt}
                onChange={handlePriceChange}
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
        {step === 5 && roofData && (
          <div>
            <h2 className={styles.subtitle}>Estimated Cost</h2>
            <p>Total Roof Area: {roofData.areaMeters2} m²</p>
            <p>Price per Square Foot: {pricePerSqFt}</p>
            <p>Total Cost: ${calculateTotalCost(roofData.areaMeters2, parseFloat(pricePerSqFt.replace('$', '')))}</p>
            <div className={styles.buttonGroup}>
              <button onClick={prevStep} className={styles.buttonSecondary}>
                Previous
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EstimatorSection;


