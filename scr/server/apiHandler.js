const fetch = require("node-fetch");
require("dotenv").config();

// Load API Keys from .env file
const API_KEYS = {
    geonames: process.env.GEONAMES_API_KEY,
    weatherbit: process.env.WEATHERBIT_API_KEY,
    pixabay: process.env.PIXABAY_API_KEY
};

/**
 * Fetches latitude & longitude of a city from Geonames API.
 * @param {string} city - The city name input by the user.
 * @returns {Object} { lat, lon, country }
 */
async function fetchLocation(city) {
    try {
        const url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${API_KEYS.geonames}`;
        const response = await fetch(url);
        const data = await response.json();

        if (!data.geonames.length) {
            throw new Error("Invalid location or no data found.");
        }

        return {
            lat: data.geonames[0].lat,
            lon: data.geonames[0].lng,
            country: data.geonames[0].countryName
        };
    } catch (error) {
        console.error("Error fetching location:", error);
        return null;
    }
}

/**
 * Fetches weather forecast for given coordinates from Weatherbit API.
 * @param {number} lat - Latitude of the location.
 * @param {number} lon - Longitude of the location.
 * @returns {Object} Weather forecast data.
 */
async function fetchWeather(lat, lon) {
    try {
        const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&days=1&key=${API_KEYS.weatherbit}`;
        const response = await fetch(url);
        const data = await response.json();

        if (!data || !data.data.length) {
            throw new Error("No weather data available.");
        }

        return data.data[0]; // Returning the first day's forecast
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
}

/**
 * Fetches an image of the city from Pixabay API.
 * If no city image is found, fetches a country-level image instead.
 * @param {string} city - The city name.
 * @param {string} country - The country name (fallback).
 * @returns {string} URL of the image.
 */
async function fetchImage(city, country) {
    try {
        let url = `https://pixabay.com/api/?key=${API_KEYS.pixabay}&q=${city}&image_type=photo`;
        let response = await fetch(url);
        let data = await response.json();

        // If no city image is found, fetch country image
        if (!data.hits.length) {
            console.warn(`No image found for ${city}. Fetching country image.`);
            url = `https://pixabay.com/api/?key=${API_KEYS.pixabay}&q=${country}&image_type=photo`;
            response = await fetch(url);
            data = await response.json();
        }

        return data.hits.length > 0 ? data.hits[0].webformatURL : "default.jpg";
    } catch (error) {
        console.error("Error fetching image:", error);
        return "default.jpg";
    }
}

// Export functions for use in `server.js`
module.exports = { fetchLocation, fetchWeather, fetchImage };
