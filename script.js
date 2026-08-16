const button = document.getElementById("demoButton");
const message = document.getElementById("message");
button.addEventListener("click", function () {
    message.textContent = "Excellent! JavaScript is working successfully.";
});

const weatherButton = document.getElementById("weatherButton");
const weatherStatus = document.getElementById("weatherStatus");
const weatherData = document.getElementById("weatherData");

weatherButton.addEventListener("click", getWeather);

async function getWeather() {

    const latitude = 33.5651;
    const longitude = 73.0169;

    const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`;

    weatherStatus.textContent = "Loading weather...";
    weatherData.innerHTML = "";

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        const current = data.current;
        const units = data.current_units;

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

        weatherStatus.textContent =
            `Updated: ${current.time}`;

    } catch (error) {

        weatherStatus.textContent =
            "Unable to load weather data.";

        console.error(error);
    }
}