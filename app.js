// Dependencies
const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route
app.get("/", (req, res) => {
  res.send("This is the home");
});

module.exports = app;