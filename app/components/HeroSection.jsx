"use client";

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import styles from './HeroSection.module.css';
import { loadGoogleMapsScript } from '../utils/loadGoogleMapsScript';
import * as turf from '@turf/turf';

const HeroSection = () => {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [aerialImageUrl, setAerialImageUrl] = useState('');
  const [buildingData, setBuildingData] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    loadGoogleMapsScript()
      .then(() => {
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

    if (!coordinates) {
      console.error('Coordinates not available');
      return;
    }

    try {
      const state = await getStateFromCoordinates(coordinates.lat, coordinates.lng);
      const geojsonUrl = `https://storage.googleapis.com/usbuildings/usbuildings/${state}.geojson`;

      let geojsonData;
      try {
        const geojsonResponse = await axios.get(geojsonUrl);
        geojsonData = geojsonResponse.data;

        if (!geojsonData || geojsonData.type !== 'FeatureCollection' || !Array.isArray(geojsonData.features)) {
          throw new Error('Invalid GeoJSON data');
        }
      } catch (error) {
        console.error('GeoJSON data not found or invalid, fetching data from Solar API', error);
        geojsonData = null;
      }

      let closeFeatures = [];
      if (geojsonData) {
        closeFeatures = findCloseFeatures(geojsonData, coordinates);
      }

      if (closeFeatures.length === 0) {
        const solarData = await fetchSolarData(coordinates.lat, coordinates.lng);
        if (solarData) {
          closeFeatures = solarData.solarPotential.roofSegmentStats.map(segment => ({
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [segment.boundingBox.sw.longitude, segment.boundingBox.sw.latitude],
                  [segment.boundingBox.ne.longitude, segment.boundingBox.sw.latitude],
                  [segment.boundingBox.ne.longitude, segment.boundingBox.ne.latitude],
                  [segment.boundingBox.sw.longitude, segment.boundingBox.ne.latitude],
                  [segment.boundingBox.sw.longitude, segment.boundingBox.sw.latitude]
                ]
              ]
            },
            properties: {
              areaMeters2: segment.stats.areaMeters2,
              pitchDegrees: segment.pitchDegrees,
            }
          }));
        }
      }

      if (closeFeatures.length === 0) {
        throw new Error('No data found for the given address.');
      }

      const buildingInfoPromises = closeFeatures.map(async feature => {
        const area = calculateArea(feature);
        const pitch = feature.properties.pitchDegrees;
        console.log('Feature pitch:', pitch);  // Debug statement
        return { feature, area, pitch };
      });

      const buildingInfo = await Promise.all(buildingInfoPromises);
      console.log('Building Info:', buildingInfo);  // Debug statement
      setBuildingData(buildingInfo);

      const path = generatePathParameter(closeFeatures);

      const highQualityUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${coordinates.lat},${coordinates.lng}&zoom=19&size=400x700&maptype=satellite&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&path=weight:2|color:red|${path}`;
      const mediumQualityUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${coordinates.lat},${coordinates.lng}&zoom=18&size=400x700&maptype=satellite&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&path=weight:2|color:red|${path}`;

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
    } catch (error) {
      console.error('Error fetching or processing data:', error);
    }
  };

  const getStateFromCoordinates = async (lat, lng) => {
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
    const response = await axios.get(geocodingUrl);
    const result = response.data.results.find(result =>
      result.types.includes('administrative_area_level_1')
    );
    return result ? result.address_components[0].long_name.replace(/\s/g, '') : null;
  };

  const findCloseFeatures = (geojsonData, coordinates) => {
    const point = turf.point([coordinates.lng, coordinates.lat]);
    return geojsonData.features.filter(feature => {
      try {
        const polygon = turf.polygon(feature.geometry.coordinates);
        const centroid = turf.centroid(polygon);
        const distance = turf.distance(point, centroid, { units: 'meters' });
        return distance < 50;
      } catch (error) {
        console.error('Error processing feature:', feature, error);
        return false;
      }
    });
  };

  const calculateArea = (feature) => {
    try {
      const polygon = turf.polygon(feature.geometry.coordinates);
      const area = turf.area(polygon);
      return (area * 10.764).toFixed(2);
    } catch (error) {
      console.error('Error calculating area for feature:', feature, error);
      return 0;
    }
  };

  const fetchSolarData = async (lat, lng) => {
    try {
      const response = await axios.get(`/api/solar?lat=${lat}&lng=${lng}`);
      const solarData = response.data.solarPotential.roofSegmentStats;
      return solarData;
    } catch (error) {
      console.error('Error fetching solar data:', error);
      return null;
    }
  };

  const generatePathParameter = (features) => {
    return features.flatMap(feature =>
      feature.geometry.coordinates[0].map(coord => `${coord[1]},${coord[0]}`)
    ).join('|');
  };

  const calculatePitch = (pitchDegrees) => {
    const rise = Math.tan(pitchDegrees * (Math.PI / 180)) * 12;
    return Math.round(rise);
  };

  return (
    <section className={`${styles.heroSection} bg-cover bg-center py-20`}>
      <div className={`${styles.container} text-center text-white`}>
        <h1 className="text-blue-400 text-6xl font-bold">Let&apos;s get started.</h1>
        <p className="text-gray-300 text-2xl mt-4">Enter the address or coordinates of a structure you&apos;d like to measure.</p>
        <div className="mt-4 flex justify-center space-x-4" id="place-picker-box">
          <div id="place-picker-container" className="w-80 text-left">
            <input
              ref={inputRef}
              type="text"
              placeholder="Enter Address"
              className={`${styles.inputAddress} py-2 px-4 w-full border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800 text-black`}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button
            className={`${styles.button} py-2 px-6 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-300`}
            onClick={handleGenerateReport}
          >
            SEARCH ADDRESS
          </button>
        </div>
        {buildingData.length > 0 && (
          <div className="mt-12 p-8 border border-gray-500 rounded-md bg-white text-black shadow-lg max-w-4xl mx-auto relative">
            <h2 className="text-2xl font-semibold text-center">Roof Measurement Results</h2>
            <Image
              src="/assets/PitchItLogo.png"
              alt="Logo"
              width={250}
              height={250}
              className="absolute top-[-2rem] right-[-2rem]"
            />
            <div className={styles.locationBox}>
              <p className="text-lg font-semibold">{address}</p>
            </div>
            <p className={styles.coordinates}>Latitude: {coordinates.lat}, Longitude: {coordinates.lng}</p>
            <div className="w-full text-left space-y-8 mt-8">
              {buildingData.map((data, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-lg font-bold">Building {index + 1} Footprint Area</h3>
                  <p>Area: {data.area} ft²</p>
                  <p>Roof Pitch: {data.pitch ? `${calculatePitch(data.pitch)} /12` : 'N/A'}</p>
                  <p>Total Squares: {(data.area / 100).toFixed(2)} squares</p>
                </div>
              ))}
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
