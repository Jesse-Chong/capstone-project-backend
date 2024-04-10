// Dependencies
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const API_KEY = process.env.GOOGLE_API_KEY;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const lokalise = require("./lokalise");
const { Pool } = require("pg");
const userController = require("./controllers/usersController");
const favoriteController = require("./controllers/favoriteController");
const usersFavoritesController = require("./controllers/usersFavorite");

// Middleware
app.use(cors());
app.use(express.json());
app.use("/users", userController);
app.use("/favorite", favoriteController);
app.use("/users-favorites", usersFavoritesController)

const pool = new Pool({
  user: DB_USER,
  host: "localhost",
  database: "maps_places",
  password: DB_PASSWORD,
  port: 5432,
});

// Route
app.get("/", (req, res) => {
  res.send("This is the home");
});

app.get("/translations/:lang", lokalise.getTranslations);

// ***** The route the get a list by category
app.get("/places", async (req, res) => {
  const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
  try {
    const result = await axios.get(url, {
      params: {
        key: API_KEY,
        ...req.query,
      },
    });
    res.json(result.data);
    console.log("Nearby places:", result.data);
  } catch (error) {
    console.error("Error fetching nearby places:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// **** this is to show info window
app.get("/placeDetails", async (req, res) => {
  const url = "https://maps.googleapis.com/maps/api/place/details/json";
  try {
    const { place_id } = req.query;
    if (!place_id) {
      return res.status(400).json({ message: "Missing place_id parameter" });
    }

    // Convert the comma-separated string of place IDs into an array
    const placeIds = place_id.split(",");

    // Create an array of promises for each place ID
    const placeDetailsPromises = placeIds.map(async (placeId) => {
      const result = await axios.get(url, {
        params: {
          key: API_KEY,
          place_id: placeId,
        },
      });
      return result.data;
    });

    // Wait for all the promises to resolve
    const placeDetailsResults = await Promise.all(placeDetailsPromises);

    res.json(placeDetailsResults);
    console.log("Place details:", placeDetailsResults);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/directions", async (req, res) => {
  const { origin, destination } = req.query;

  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/directions/json",
      {
        params: {
          origin,
          destination,
          key: API_KEY,
        },
      }
    );
    console.log(response);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching directions:", error);
    res.status(500).json({ error: "Error fetching directions" });
  }
});

module.exports = app;
