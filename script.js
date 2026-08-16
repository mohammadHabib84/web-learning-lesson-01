const button = document.getElementById("demoButton");
const message = document.getElementById("message");
button.addEventListener("click", function () {
    message.textContent = "Excellent! JavaScript is working successfully.";
});

const weatherButton = document.getElementById("weatherButton");
const cityInput = document.getElementById("cityInput");
const weatherStatus = document.getElementById("weatherStatus");
const weatherData = document.getElementById("weatherData");

weatherButton.addEventListener("click", getWeather);

async function getWeather() {

    const city = cityInput.value.trim();

    if (city === "") {
        weatherStatus.textContent = "Please enter a city name.";
        return;
    }

    weatherStatus.textContent = "Searching...";
    weatherData.innerHTML = "";

    try {

        // Step 1: Convert city name into coordinates
        const geocodingURL =
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

        const geoResponse = await fetch(geocodingURL);

        if (!geoResponse.ok) {
            throw new Error(`Geocoding error: ${geoResponse.status}`);
        }

        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            weatherStatus.textContent = "City not found.";
            return;
        }

        const location = geoData.results[0];

        const latitude = location.latitude;
        const longitude = location.longitude;

        // Step 2: Use coordinates to request weather
        const weatherURL =
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`;

        const weatherResponse = await fetch(weatherURL);

        if (!weatherResponse.ok) {
            throw new Error(`Weather API error: ${weatherResponse.status}`);
        }

        const weather = await weatherResponse.json();

        const current = weather.current;
        const units = weather.current_units;

        weatherStatus.textContent =
            `${location.name}, ${location.country}`;

        weatherData.innerHTML = `
            <p>
                <strong>Temperature:</strong>
                ${current.temperature_2m} ${units.temperature_2m}
            </p>

            <p>
                <strong>Humidity:</strong>
                ${current.relative_humidity_2m} ${units.relative_humidity_2m}
            </p>

            <p>
                <strong>Wind Speed:</strong>
                ${current.wind_speed_10m} ${units.wind_speed_10m}
            </p>
        `;

    } catch (error) {

        weatherStatus.textContent =
            "Something went wrong while loading the weather.";

        console.error(error);
    }
}