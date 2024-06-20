// app/api/solar/route.js

import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  if (!lat || !lng) {
    return NextResponse.json({ error: 'Missing latitude or longitude' }, { status: 400 });
  }

  try {
    const response = await axios.get('https://solar.googleapis.com/v1/buildingInsights:findClosest', {
      params: {
        'location.latitude': lat,
        'location.longitude': lng,
        'requiredQuality': 'MEDIUM',
        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      },
    });

    const data = response.data;
    const filteredData = {
      name: data.name,
      center: data.center,
      imageryDate: data.imageryDate,
      postalCode: data.postalCode,
      administrativeArea: data.administrativeArea,
      statisticalArea: data.statisticalArea,
      regionCode: data.regionCode,
      solarPotential: {
        maxArrayPanelsCount: data.solarPotential.maxArrayPanelsCount,
        maxArrayAreaMeters2: data.solarPotential.maxArrayAreaMeters2,
        maxSunshineHoursPerYear: data.solarPotential.maxSunshineHoursPerYear,
        carbonOffsetFactorKgPerMwh: data.solarPotential.carbonOffsetFactorKgPerMwh,
        wholeRoofStats: data.solarPotential.wholeRoofStats,
        roofSegmentStats: data.solarPotential.roofSegmentStats.map(segment => ({
          pitchDegrees: segment.pitchDegrees,
          azimuthDegrees: segment.azimuthDegrees,
          stats: {
            areaMeters2: segment.stats.areaMeters2,
            sunshineQuantiles: segment.stats.sunshineQuantiles,
            groundAreaMeters2: segment.stats.groundAreaMeters2,
          },
        })),
      },
    };

    return NextResponse.json(filteredData);
  } catch (error) {
    console.error('Error fetching solar data:', error.response ? error.response.data : error.message);
    return NextResponse.json({ error: 'Failed to fetch solar data' }, { status: 500 });
  }
}

