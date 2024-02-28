// const express = require('express');
const axios = require("axios");
const cors = require("cors");
const app = require("./app.js");
require("dotenv").config();
const PORT = 4028;
const API_KEY = process.env.API_KEY;

app.use(cors());

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});

//testing
