"use client";

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import styles from './HeroSection.module.css';
import { loadGoogleMapsScript } from '../utils/loadGoogleMapsScript';

const HeroSection = () => {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [solarData, setSolarData] = useState(null);
  const [aerialImageUrl, setAerialImageUrl] = useState('');
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    loadGoogleMapsScript()
      .then(() => {
        setIsScriptLoaded(true);
        if (inputRef.current) {
          const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
            fields: ['geometry', 'name', 'formatted_address']
          });

          autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (place && place.formatted_address) {
              setAddress(place.formatted_address);
              setCoordinates({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
              });
            }
          });
        }
      })
      .catch((error) => {
        console.error('Google Maps script failed to load:', error);
      });
  }, []);

  const handleGenerateReport = async () => {
    if (!address) {
      console.error('Address not provided');
      return;
    }

    try {
      const geocodeResponse = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: address,
          key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
        }
      });

      if (geocodeResponse.data.status === 'OK') {
        const location = geocodeResponse.data.results[0].geometry.location;
        setCoordinates(location);

        console.log('Requesting solar data for coordinates:', location);

        const solarResponse = await axios.get('/api/solar', {
          params: {
            lat: location.lat,
            lng: location.lng
          }
        });

        if (solarResponse.data && solarResponse.data.solarPotential && solarResponse.data.solarPotential.roofSegmentStats) {
          setSolarData(solarResponse.data);

          const highQualityUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=19&size=400x500&maptype=satellite&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
        
        // Generate Static Map URL for medium-quality image
        const mediumQualityUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=18&size=400x500&maptype=satellite&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
        
        // Try to fetch the high-quality image first
        try {
          const highQualityResponse = await axios.get(highQualityUrl);
          if (highQualityResponse.status === 200) {
            setAerialImageUrl(highQualityUrl);
          } else {
            throw new Error('High-quality image not available');
          }
        } catch (error) {
          console.error('High-quality image not available, falling back to medium quality', error);
          setAerialImageUrl(mediumQualityUrl);
        }
      } else {
        console.error('Invalid data format received from solar API');
      }
    } else {
      console.error('Geocoding API error:', geocodeResponse.data.status);
    }
  } catch (error) {
    console.error('Error fetching geocoding or solar data:', error);
  }
  };

  const handleUploadBlueprint = () => {
    console.log('Upload blueprint clicked');
  };

  // Helper Functions
  const convertMetersToFeet = (areaMeters2) => {
    return (areaMeters2 * 10.7639).toFixed(2);
  };

  const calculateRoofSquares = (areaMeters2) => {
    const areaFeet2 = areaMeters2 * 10.7639;
    return (areaFeet2 / 100).toFixed(2);
  };

  const calculatePitch = (pitchDegrees) => {
    const slope = Math.tan(pitchDegrees * (Math.PI / 180));
    const rise = slope * 12;
    return Math.round(rise); // Round to the nearest integer
  };

  const calculateRafterLength = (pitchDegrees, groundAreaMeters2, widthMeters) => {
    const slope = Math.tan(pitchDegrees * (Math.PI / 180));
    const run = Math.sqrt(groundAreaMeters2 / widthMeters); // Adjusted calculation
    const rise = slope * run;
    return Math.sqrt(run ** 2 + rise ** 2).toFixed(2);
  };

  const calculateMaterials = (squares) => {
    const shinglesBundles = (squares * 3 * 1.1).toFixed(0); // Including 10% waste
    const underlaymentRolls = (squares / 4).toFixed(0);
    const nails = (squares * 320).toFixed(0);
    return { shinglesBundles, underlaymentRolls, nails };
  };

  return (
    <section className={`${styles.heroSection} bg-cover bg-center py-20`}>
      <div className={`${styles.container} text-center text-white`}>
        <h1 className="text-blue-400 text-6xl font-bold">Let&apos;s get started.</h1>
        <p className="text-gray-300 text-2xl mt-4">
          Enter the address or coordinates of a structure you&apos;d like to measure.
        </p>
        <div className="mt-4 flex justify-center space-x-4" id="place-picker-box">
          <div id="place-picker-container" className="w-80 text-left">
            <input
              ref={inputRef}
              type="text"
              placeholder="Enter Address"
              className={`${styles.inputAddress} py-2 px-4 w-full border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800 text-black`}
            />
          </div>
          <button
            className={`${styles.button} py-2 px-6 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-300`}
            onClick={handleGenerateReport}
          >
            SEARCH ADDRESS
          </button>
        </div>
        {solarData && (
          <div className="mt-12 p-8 border border-gray-500 rounded-md bg-white text-black shadow-lg max-w-4xl mx-auto relative">
            <h2 className="text-2xl font-semibold text-center">Roof Measurement Results</h2>
            {isScriptLoaded && (
              <Image
                src="/assets/PitchItLogo.png"
                alt="Logo"
                width={250}
                height={250}
                className="logo-image"
              />
            )}
            <div className={styles.locationBox}>
              <p className="text-lg font-semibold">{address}</p>
            </div>
            <p className={styles.coordinates}>Latitude: {coordinates.lat}, Longitude: {coordinates.lng}</p>
            <div className="w-full text-left space-y-8 mt-8">
              {solarData.solarPotential.wholeRoofStats && (
                <div className="text-center">
                  <h3 className="text-lg font-bold">Whole Roof Stats</h3>
                  <table className={styles.table}>
                    <thead className={styles.thead}>
                      <tr>
                        <th className={styles.th}>Metric</th>
                        <th className={styles.th}>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={styles.td}>Total Area (ft²)</td>
                        <td className={styles.td}>{convertMetersToFeet(solarData.solarPotential.wholeRoofStats.areaMeters2)}</td>
                      </tr>
                      <tr>
                        <td className={styles.td}>Ground Area (ft²)</td>
                        <td className={styles.td}>{convertMetersToFeet(solarData.solarPotential.wholeRoofStats.groundAreaMeters2)}</td>
                      </tr>
                      <tr>
                        <td className={styles.td}>Total Squares</td>
                        <td className={styles.td}>{calculateRoofSquares(solarData.solarPotential.wholeRoofStats.areaMeters2)}</td>
                      </tr>
                      <tr>
                        <td className={styles.td}>Pitch</td>
                        <td className={styles.td}>{calculatePitch(solarData.solarPotential.roofSegmentStats[0].pitchDegrees)}/12</td>
                      </tr>
                      <tr>
                        <td className={styles.td}># Facets</td>
                        <td className={styles.td}>{solarData.solarPotential.roofSegmentStats.length}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              {solarData.solarPotential.roofSegmentStats[0] && (
                <div className="text-center">
                  <h3 className="text-lg font-bold">Main Roof Segment Stats</h3>
                  <table className={styles.table}>
                    <thead className={styles.thead}>
                      <tr>
                        <th className={styles.th}>Metric</th>
                        <th className={styles.th}>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={styles.td}>Pitch</td>
                        <td className={styles.td}>{calculatePitch(solarData.solarPotential.roofSegmentStats[0].pitchDegrees)}/12</td>
                      </tr>
                      <tr>
                        <td className={styles.td}>Area (ft²)</td>
                        <td className={styles.td}>{convertMetersToFeet(solarData.solarPotential.roofSegmentStats[0].stats.areaMeters2)}</td>
                      </tr>
                      <tr>
                        <td className={styles.td}>Ground Area (ft²)</td>
                        <td className={styles.td}>{convertMetersToFeet(solarData.solarPotential.roofSegmentStats[0].stats.groundAreaMeters2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              {solarData.solarPotential.wholeRoofStats && (
                <div className="text-center">
                  <h3 className="text-lg font-bold">Materials Estimation</h3>
                  <table className={styles.table}>
                    <thead className={styles.thead}>
                      <tr>
                        <th className={styles.th}>Material</th>
                        <th className={styles.th}>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        const squares = calculateRoofSquares(solarData.solarPotential.wholeRoofStats.areaMeters2);
                        const materials = calculateMaterials(squares);
                        const rafterLength = calculateRafterLength(
                          solarData.solarPotential.roofSegmentStats[0].pitchDegrees,
                          solarData.solarPotential.roofSegmentStats[0].stats.areaMeters2,
                          solarData.solarPotential.roofSegmentStats[0].stats.groundAreaMeters2
                        );
                        return (
                          <>
                            <tr>
                              <td className={styles.td}>Shingles Needed</td>
                              <td className={styles.td}>{materials.shinglesBundles} bundles</td>
                            </tr>
                            <tr>
                              <td className={styles.td}>Underlayment Needed</td>
                              <td className={styles.td}>{materials.underlaymentRolls} rolls</td>
                            </tr>
                            <tr>
                              <td className={styles.td}>Total Nails</td>
                              <td className={styles.td}>{materials.nails} nails</td>
                            </tr>
                            <tr>
                              <td className={styles.td}>Rafter Length</td>
                              <td className={styles.td}>{rafterLength} feet</td>
                            </tr>
                          </>
                        );
                      })()}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className="mt-8 text-center">
              <h3 className="text-lg font-bold">Aerial Image</h3>
              {aerialImageUrl && (
                <Image
                  src={aerialImageUrl}
                  alt="Aerial Image"
                  width={800}
                  height={800}
                  className="mx-auto border border-black rounded-md"
                />
              )}
            </div>
          </div>
        )}
        <Image
          src="/assets/ToolBoxreport.png"
          alt="Report"
          width={578}
          height={558}
          className="mx-auto mt-6 border border-black rounded-md"
        />
      </div>
    </section>
  );
};

export default HeroSection;
