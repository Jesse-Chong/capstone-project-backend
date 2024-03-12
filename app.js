// Dependencies
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const API_KEY = process.env.GOOGLE_API_KEY;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const { Pool } = require('pg');
// Middleware
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: DB_USER,
  host: 'localhost',
  database: 'maps_places',
  password: DB_PASSWORD,
  port: 5432,
});

// Route
app.get("/", (req, res) => {
  res.send("This is the home");
});

// ***** The route the get a list by category
app.get('/places', async (req, res) => {
  const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
  try {
    const result = await axios.get(url, {
      params : {
        key: API_KEY,
        ...req.query
      }
    });
    res.json(result.data);
    console.log('Nearby places:', result.data);
  } catch (error) {
    console.error('Error fetching nearby places:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// // **** this is solely to grab data from the api to populate postgres table
// // backend
app.get('/placeDetails', async (req, res) => {
  const url = 'https://maps.googleapis.com/maps/api/place/details/json';

  try {
    const { placeIds, key } = req.query;
    console.log("Received placeIds:", placeIds);

    if (!key || !placeIds) {
      return res.status(400).json({ message: 'Missing placeIds parameter or key' });
    }

    const placeIdArray = placeIds.split(',');
    console.log("Parsed placeIdArray:", placeIdArray);

    const placeDetailsArray = await Promise.all(
      placeIdArray.map(async (placeId) => {
        const result = await axios.get(url, {
          params: {
            key: key,
            placeid: placeId
          },
        });
        console.log('Place details API response:', result.data);
        // console.log('Place details result for', placeId, ':', result.data.result);
        return result.data.result;
      })
    );

    console.log("placeDetailsArray:", placeDetailsArray);

    await insertPlaceDetailsArrayToDatabase(placeDetailsArray);

    res.json({ success: true, message: 'Place details inserted successfully' });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

const insertPlaceDetailsArrayToDatabase = async (placeDetailsArray) => {
  const client = await pool.connect();

  try {
    for (const placeDetails of placeDetailsArray) {
      // Input validation
      if (!placeDetails || !placeDetails.place_id) {
        console.error('Invalid placeDetails object:', placeDetails);
        continue; // Skip this iteration and move to the next one
      }

      console.log('Inserting place:', JSON.stringify(placeDetails, null, 2));

      // Extracting the first photo reference (if available)
      const photoReference = placeDetails.photos && placeDetails.photos.length > 0
        ? placeDetails.photos[0].photo_reference
        : null;

      // Creating the photo URL
      const photoUrl = photoReference
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=${photoReference}&key=${API_KEY}`
        : null;

      const query = `
        INSERT INTO places (
          place_id, 
          name, 
          formatted_address, 
          formatted_phone_number, 
          rating, 
          website, 
          opening_hours, 
          photo_reference, 
          photo_url, 
          latitude, 
          longitude
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      `;

      await client.query(query, [
        placeDetails.place_id,
        placeDetails.name,
        placeDetails.formatted_address,
        placeDetails.formatted_phone_number || null,
        placeDetails.rating || null,
        placeDetails.website || null,
        placeDetails.opening_hours ? JSON.stringify(placeDetails.opening_hours) : null,
        placeDetails.photos && placeDetails.photos.length > 0 ? placeDetails.photos[0].photo_reference : null,
        photoUrl, // Use the defined photoUrl variable here
  placeDetails.geometry?.location?.lat || null,
  placeDetails.geometry?.location?.lng || null
      ]);

      console.log('PlaceDetails data successfully inserted into the database.');
    }
  } catch (error) {
    console.error('Error inserting placeDetailsArray data into the database:', error.message);
  } finally {
    client.release();
  }
};


// **** this is to show info window 
// app.get('/placeDetails', async (req, res) => {
//     const url = 'https://maps.googleapis.com/maps/api/place/details/json'
  
//     try {
//       const result = await axios.get(url, {
//         params: {
//         key: API_KEY,
//         ...req.query 
//         }
//       });
//       res.json(result.data);
//       console.log(result.data);
  
//     } catch (error) {
//       res.status(500).json({message: error.message}); 
//     }
//   })

module.exports = app;