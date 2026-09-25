// =========================================
// MENU
// =========================================

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", isOpen);
        menuButton.textContent = isOpen ? "✕" : "☰";
    });
}


// =========================================
// FOOTER
// =========================================

const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
    lastModified.textContent = document.lastModified;
}


// =========================================
// WEATHER - OPENWEATHERMAP
// =========================================

// Beira, Mozambique
const latitude = -19.8436;
const longitude = 34.8389;

// Replace this with your own OpenWeatherMap API key.
const apiKey = "YOUR_API_KEY";


// Current weather
async function getCurrentWeather() {

    const currentWeather = document.querySelector("#current-weather");

    if (!currentWeather) {
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to load current weather.");
        }

        const data = await response.json();

        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;

        currentWeather.innerHTML = `
            <p>
                <img
                    src="https://openweathermap.org/img/wn/${iconCode}@2x.png"
                    alt="${description} icon">

                <strong>Temperature:</strong>
                ${temperature}°C
            </p>

            <p>
                <strong>Conditions:</strong>
                ${description}
            </p>
        `;

    } catch (error) {

        console.error("Weather error:", error);

        currentWeather.innerHTML = `
            <p>Unable to load current weather.</p>
        `;
    }
}


// =========================================
// 3-DAY WEATHER FORECAST
// =========================================

async function getForecast() {

    const forecastContainer = document.querySelector("#forecast");

    if (!forecastContainer) {
        return;
    }

    const url =
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to load weather forecast.");
        }

        const data = await response.json();

        const forecasts = {};

        data.list.forEach((item) => {

            const date = new Date(item.dt * 1000);

            const day = date.toLocaleDateString("en-US", {
                weekday: "long"
            });

            // Select one forecast for each day.
            if (!forecasts[day]) {
                forecasts[day] = item;
            }

        });

        // Remove today so the forecast shows the NEXT 3 days.
        const today = new Date().toLocaleDateString("en-US", {
            weekday: "long"
        });

        const forecastDays = Object.keys(forecasts)
            .filter((day) => day !== today)
            .slice(0, 3);

        forecastContainer.innerHTML = `
            <h3>3-Day Forecast</h3>
        `;

        forecastDays.forEach((day) => {

            const item = forecasts[day];

            const temperature = Math.round(item.main.temp);

            const forecast = document.createElement("p");

            forecast.innerHTML = `
                <strong>${day}:</strong>
                ${temperature}°C
            `;

            forecastContainer.appendChild(forecast);
        });

    } catch (error) {

        console.error("Forecast error:", error);

        forecastContainer.innerHTML = `
            <h3>3-Day Forecast</h3>
            <p>Unable to load forecast.</p>
        `;
    }
}


// =========================================
// BUSINESS SPOTLIGHTS
// =========================================

async function getSpotlights() {

    const spotlightContainer =
        document.querySelector("#spotlight-container");

    if (!spotlightContainer) {
        return;
    }

    try {

        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load members.json.");
        }

        const members = await response.json();

        // Keep only Gold and Silver members.
        const qualifiedMembers = members.filter(
            (member) =>
                Number(member.membership) === 2 ||
                Number(member.membership) === 3
        );

        // Randomize the members.
        qualifiedMembers.sort(() => Math.random() - 0.5);

        // Select 2 or 3 members.
        const selectedMembers = qualifiedMembers.slice(0, 3);

        spotlightContainer.innerHTML = "";

        selectedMembers.forEach((member) => {

            const card = document.createElement("article");

            card.classList.add("spotlight-card");

            const membershipName =
                Number(member.membership) === 3
                    ? "Gold"
                    : "Silver";

            card.innerHTML = `
                <img
                    src="images/${member.image}"
                    alt="${member.name} logo"
                    loading="lazy"
                    width="150"
                    height="100">

                <h3>${member.name}</h3>

                <p>${member.description}</p>

                <p>
                    <strong>Phone:</strong>
                    ${member.phone}
                </p>

                <p>
                    <strong>Address:</strong>
                    ${member.address}
                </p>

                <p>
                    <strong>Membership:</strong>
                    ${membershipName}
                </p>

                <a
                    href="${member.website}"
                    target="_blank"
                    rel="noopener">
                    Visit Website
                </a>
            `;

            spotlightContainer.appendChild(card);
        });

    } catch (error) {

        console.error("Spotlight error:", error);

        spotlightContainer.innerHTML = `
            <p>Unable to load business spotlights.</p>
        `;
    }
}


// =========================================
// RUN FUNCTIONS
// =========================================

getCurrentWeather();
getForecast();
getSpotlights();