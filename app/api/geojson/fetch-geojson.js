import axios from 'axios';
import * as turf from '@turf/turf';

export default async function handler(req, res) {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: 'Address is required' });
  }

  try {
    // Get geocoding data (latitude and longitude) from the address
    const geocodingResponse = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address,
        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      },
    });

    if (geocodingResponse.data.status !== 'OK') {
      return res.status(400).json({ error: 'Invalid address' });
    }

    const { lat, lng } = geocodingResponse.data.results[0].geometry.location;

    // Extract state from address using geocoding data
    const state = geocodingResponse.data.results[0].address_components.find(
      (component) => component.types.includes('administrative_area_level_1')
    )?.short_name;

    if (!state) {
      return res.status(400).json({ error: 'Could not extract state from address' });
    }

    const filename = `${state.replace(/ /g, '')}.geojson`;

    // Fetch geojson data from Google Cloud Function
    const geojsonResponse = await axios.get(
      'https://us-central1-gold-gateway-426821-n8.cloudfunctions.net/fetchbuildings',
      {
        params: { filename },
      }
    );

    const geojsonData = geojsonResponse.data;

    // Process the geojson data to find the relevant building
    const point = turf.point([lng, lat]);
    let building = null;

    for (const feature of geojsonData.features) {
      const polygon = turf.polygon(feature.geometry.coordinates);
      if (turf.booleanPointInPolygon(point, polygon)) {
        building = polygon;
        break;
      }
    }

    if (building) {
      const areaMeters2 = turf.area(building);
      const areaFeet2 = (areaMeters2 * 10.7639).toFixed(2); // Convert to square feet
      res.status(200).json({ area: areaFeet2 });
    } else {
      res.status(404).json({ error: 'Building not found' });
    }
  } catch (error) {
    console.error('Error fetching geocoding or solar data:', error); // Log the error
    res.status(500).json({ error: 'Internal server error' });
  }
}
