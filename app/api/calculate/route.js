import { NextResponse } from 'next/server';
import axios from 'axios';
import * as turf from '@turf/turf';

const geojsonFiles = {
  Alabama: 'https://storage.googleapis.com/usbuildings/usbuildings/Alabama.geojson',
  Alaska: 'https://storage.googleapis.com/usbuildings/usbuildings/Alaska.geojson',
  // Add URLs for all other states...
  Wyoming: 'https://storage.googleapis.com/usbuildings/usbuildings/Wyoming.geojson'
};

export async function POST(request) {
  try {
    const { address, state } = await request.json();
    const geojsonUrl = geojsonFiles[state];

    if (!geojsonUrl) {
      return NextResponse.json({ error: 'State not found' }, { status: 404 });
    }

    const response = await axios.get(geojsonUrl);
    const geojsonData = response.data;

    const area = calculateArea(geojsonData, address);
    return NextResponse.json({ area });
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    return NextResponse.json({ error: 'Failed to fetch or process GeoJSON data' }, { status: 500 });
  }
}

function calculateArea(geojsonData, address) {
  const targetFeature = geojsonData.features.find(feature =>
    feature.properties.address === address
  );

  if (!targetFeature) {
    return null;
  }

  const area = turf.area(targetFeature);
  return area * 10.7639; // Convert to square feet
}
