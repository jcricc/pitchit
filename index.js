const { Storage } = require('@google-cloud/storage');
const path = require('path');
const turf = require('@turf/turf');
const storage = new Storage({ keyFilename: path.join(__dirname, './gold-gateway-426821-n8-862f5beed048.json') });
const bucketName = 'usbuildings';

exports.fetchGeojson = async (req, res) => {
  const { state } = req.query;

  if (!state) {
    return res.status(400).json({ error: 'State is required' });
  }

  const filename = `usbuildings/usbuildings/${state}.geojson`;
  const file = storage.bucket(bucketName).file(filename);

  try {
    const [fileData] = await file.download();
    const geojsonData = JSON.parse(fileData.toString());

    // Here you can add the logic to process the geojsonData
    // For example, finding the building footprint area
    const point = turf.point([req.query.lng, req.query.lat]);
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
    console.error('Error fetching geojson data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
