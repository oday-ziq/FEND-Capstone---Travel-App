// Calculate days left until departure
export function calculateDaysLeft(departureDate) {
    const today = new Date();
    const tripDate = new Date(departureDate);
    return Math.ceil((tripDate - today) / (1000 * 60 * 60 * 24));
}

// Format API responses for UI display
export function formatWeatherData(weather) {
    return `Weather: ${weather.weather.description}, High: ${weather.max_temp}°C, Low: ${weather.min_temp}°C`;
}
