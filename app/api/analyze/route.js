import axios from 'axios';
import * as turf from '@turf/turf';

const fetchGeoJSON = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

const geocodeAddress = async (address) => {
  const response = await axios.get('http://api.positionstack.com/v1/forward', {
    params: {
      access_key: process.env.POSITIONSTACK_API_KEY,
      query: address,
      limit: 1,
    },
  });
  const { latitude, longitude, region } = response.data.data[0];
  return { lat: latitude, lng: longitude, state: region };
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { address } = req.body;
  if (!address) {
    return res.status(400).json({ error: 'Address is required' });
  }

  try {
    const { lat, lng, state } = await geocodeAddress(address);
    const url = `https://storage.googleapis.com/usbuildings/usbuildings/${state}.geojson`;
    const geojsonData = await fetchGeoJSON(url);
    const point = turf.point([lng, lat]);
    const nearbyBuildings = geojsonData.features.filter(feature =>
      turf.booleanPointInPolygon(point, feature.geometry)
    );
    const roofAreas = nearbyBuildings.map(building => {
      const polygon = turf.polygon(building.geometry.coordinates);
      const area = turf.area(polygon);
      return area * 10.7639; // Convert to square feet
    });

    res.status(200).json({ roofAreas, coordinates: { lat, lng } });
  } catch (error) {
    console.error('Error during analysis:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
