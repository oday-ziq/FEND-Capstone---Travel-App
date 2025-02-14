const express = require("express");
const { fetchLocation, fetchWeather, fetchImage } = require("./apiHandler");

const router = express.Router();

// API Route for Fetching Trip Data
router.post("/getTrip", async (req, res) => {
    try {
        const { city } = req.body;
        const locationData = await fetchLocation(city);
        const weatherData = await fetchWeather(locationData.lat, locationData.lon);
        const imageData = await fetchImage(city);

        res.json({ locationData, weatherData, imageData });
    } catch (error) {
        console.error("Error fetching trip data:", error);
        res.status(500).json({ error: "Failed to retrieve trip data" });
    }
});

module.exports = router;
