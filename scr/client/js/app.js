async function getTripData(event) {
    event.preventDefault();

    const city = document.getElementById("city").value;
    
    const response = await fetch("/getTrip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city })
    });

    const { locationData, weatherData, imageData } = await response.json();

    document.getElementById("tripResult").innerHTML = `
        <h2>My Trip to ${city}</h2>
        <p>Coordinates: ${locationData.lat}, ${locationData.lon}</p>
        <p>Weather: ${weatherData.data[0].weather.description}</p>
        <img src="${imageData.hits[0].webformatURL}" alt="${city}">
    `;
}

export { getTripData };
