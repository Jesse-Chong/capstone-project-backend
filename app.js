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

// **** this is to show info window 
app.get('/placeDetails', async (req, res) => {
    const url = 'https://maps.googleapis.com/maps/api/place/details/json'
  
    try {
      const result = await axios.get(url, {
        params: {
        key: API_KEY,
        ...req.query 
        }
      });
      res.json(result.data);
      console.log(result.data);
  
    } catch (error) {
      res.status(500).json({message: error.message}); 
    }
  })

module.exports = app;