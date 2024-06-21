"use client";

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

const HeroSection = () => {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [solarData, setSolarData] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const loadScript = () => {
      if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        script.onload = () => {
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
        };
      }
    };

    loadScript();
  }, []);

  const handleGenerateReport = async () => {
    if (!address) {
      console.error('Address not provided');
      return;
    }

    try {
      const geocodeResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
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

        setSolarData(solarResponse.data);
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

  return (
    <section className="hero-section bg-cover bg-center" style={{ backgroundImage: 'url(/main.svg)' }}>
      <div className="container mx-auto text-center py-20 text-white">
        <h1 className="text-blue-400 text-6xl font-bold">Let's get started.</h1>
        <p className="text-gray-300 text-2xl mt-4">
          Enter the address or coordinates of a structure you'd like to measure.
        </p>
        <div className="mt-4 flex justify-center space-x-4" id="place-picker-box">
          <div id="place-picker-container" className="w-80 text-left">
            <input
              ref={inputRef}
              type="text"
              placeholder="Enter Address"
              className="input-address py-2 px-4 w-full border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800 text-black"
            />
          </div>
          <button
            className="py-2 px-6 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-300"
            onClick={handleGenerateReport}
          >
            SEARCH ADDRESS
          </button>
        </div>
        {solarData && (
          <div className="mt-12 p-8 border border-gray-500 rounded-md bg-white text-black shadow-lg max-w-4xl mx-auto relative">
            <h2 className="text-2xl font-semibold mt-8 text-center">Roof Measurement Results</h2>
            <Image
              src="/assets/PitchItLogo.png"
              alt="Logo"
              width={250}
              height={250}
              className="absolute top-[-2rem] right-[-2rem]"
            />
            <div className="w-full text-left space-y-8 mt-24">
              <div className="flex flex-col items-center">
                <p className="text-center"><span className="font-semibold">Location:</span> {address}</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-center"><span className="font-semibold">Coordinates:</span> Latitude: {coordinates.lat}, Longitude: {coordinates.lng}</p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-lg font-bold">Whole Roof Stats:</h3>
                <div className="pl-4">
                  <p className="text-center"><span className="font-semibold">Area (m²):</span> {solarData.solarPotential.wholeRoofStats.areaMeters2}</p>
                  <p className="text-center"><span className="font-semibold">Ground Area (m²):</span> {solarData.solarPotential.wholeRoofStats.groundAreaMeters2}</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-lg font-bold">Roof Segment Stats:</h3>
                {solarData.solarPotential.roofSegmentStats.map((segment, index) => (
                  <div key={index} className="pl-4 mb-4 text-center">
                    <h4 className="text-md font-semibold">Segment {index + 1}:</h4>
                    <p><span className="font-semibold">Pitch Degrees:</span> {segment.pitchDegrees}</p>
                    <p><span className="font-semibold">Azimuth Degrees:</span> {segment.azimuthDegrees}</p>
                    <p><span className="font-semibold">Area (m²):</span> {segment.stats.areaMeters2}</p>
                    <p><span className="font-semibold">Ground Area (m²):</span> {segment.stats.groundAreaMeters2}</p>
                  </div>
                ))}
              </div>
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
