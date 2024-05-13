const apiKey = 'cde8dd62a76517bf69c01be69d427897'

// Sample array of city names
const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", "San Francisco", "Indianapolis", "Columbus", "Fort Worth", "Charlotte", "Seattle", "Denver", "El Paso", "Washington", "Boston", "Detroit", "Nashville", "Memphis", "Portland", "Oklahoma City", "Las Vegas", "Louisville", "Baltimore", "Milwaukee", "Albuquerque", "Tucson", "Fresno", "Sacramento", "Mesa", "Kansas City", "Atlanta", "Long Beach", "Omaha", "Raleigh", "Colorado Springs", "Miami", "Virginia Beach", "Oakland", "Minneapolis", "Tulsa", "Wichita", "New Orleans", "Arlington"];

const cityListDiv = document.getElementById('cityList');

// Function to filter cities based on user input
function filterCities(input) {
    return cities.filter(city => city.toLowerCase().startsWith(input.toLowerCase()));
}

// Function to display filtered cities
function displayCities(filteredCities) {
    // const cityList = document.getElementById('cityList');
    cityListDiv.innerHTML = ''; // Clear previous list
    
    filteredCities.forEach(city => {
        const cityItem = document.createElement('div');
        cityItem.textContent = city;
        cityListDiv.appendChild(cityItem);
    });
    cityListDiv.classList.remove('city-list');
}

// Event listener for input in the text box
const cityInput = document.querySelector('.city-input');
cityInput.addEventListener('input', function() {
    const inputValue = this.value.trim(); // Get input value and remove leading/trailing spaces
    if (inputValue === '') {
        document.getElementById('cityList').innerHTML = ''; // Clear city list if input is empty
        return;
    }
    
    const filteredCities = filterCities(inputValue);
    displayCities(filteredCities);
});

// Event listener for suggestion selection
document.getElementById('cityList').addEventListener('click', function(event) {
    const selectedCity = event.target.textContent;
    if (selectedCity) {
        // Set the selected city as the input value
        cityInput.value = selectedCity;
        // Clear the city list
        document.getElementById('cityList').innerHTML = '';
        cityListDiv.style.display = 'none';
        // Fetch weather data for the selected city
        fetchWeatherData(selectedCity);
    }
});

async function fetchWeatherData(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
            alert('Wrong City Name');
            throw new Error("Unable to fetch weather data");
        }
        const data = await response.json();
        console.log(data);
        // console.log(data.main.temp);
        // console.log(data.name);
        // console.log(data.wind.speed);
        // console.log(data.main.humidity);
        // console.log(data.visibility);
        updateWeatherUI(data);
    } catch (error) {
        console.error(error);
    }
}

const cityElement = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility-distance");

const descriptionText = document.querySelector(".description-text");
const date = document.querySelector(".date");
const descriptionIcon = document.querySelector(".description i");

const hidden = document.querySelector(".hidden");

// fetchWeatherData();

function updateWeatherUI(data) {
    cityElement.textContent = data.name;
    // temperature.textContent = `${Math.round(data.main.temp)} °C`;
    temperature.innerHTML = `${Math.round(data.main.temp)}<sup>°C</sup>`;
    windSpeed.textContent = `${data.wind.speed} KM/H`;
    humidity.textContent = `${data.main.humidity}%`;
    visibility.textContent = `${data.visibility / 1000} KM`;
    descriptionText.textContent = data.weather[0].description;

    const currentDate = new Date();
    date.textContent = currentDate.toDateString();
    date.style.backgroundColor = '#c3eaf4';
    const weatherIconName = getWeatherIconName(data.weather[0].main);
    descriptionIcon.innerHTML = `<i class="material-icons">${weatherIconName}</i>`;

    hidden.classList.remove('hidden');
}

const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input");

formElement.addEventListener("submit", function (e) {
    e.preventDefault();

    const city = inputElement.value;
    if (city !== "") {
        fetchWeatherData(city);
        inputElement.value = "";
    }
});

function getWeatherIconName(weatherCondition) {
    const iconMap = {
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud",
    };

    return iconMap[weatherCondition] || "help";
}
