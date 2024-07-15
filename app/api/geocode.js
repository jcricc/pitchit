import axios from 'axios';

export default async function handler(req, res) {
  const { address } = req.query;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params: {
        address,
        key: apiKey,
      },
    });

    if (response.data.status === 'OK') {
      const location = response.data.results[0].geometry.location;
      res.status(200).json({ lat: location.lat, lng: location.lng });
    } else {
      res.status(400).json({ error: 'Geocoding API error', status: response.data.status });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch geocoding data', details: error.message });
  }
}
