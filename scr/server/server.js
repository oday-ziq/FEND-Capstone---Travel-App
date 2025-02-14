const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

// Import API handlers
const { fetchWeather, fetchLocation, fetchImage } = require("./apiHandler");

app.post("/getTrip", async (req, res) => {
    const { city } = req.body;
    const locationData = await fetchLocation(city);
    const weatherData = await fetchWeather(locationData.lat, locationData.lon);
    const imageData = await fetchImage(city);
    
    res.json({ locationData, weatherData, imageData });
});

app.listen(8081, () => console.log("Server running on port 8081"));
