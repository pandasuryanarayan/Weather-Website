const apiKey = "cde8dd62a76517bf69c01be69d427897";

// Sample array of city names
const cities = [
  "Ayodhya",
  "Gandhinagar",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
  "Austin",
  "Jacksonville",
  "San Francisco",
  "Indianapolis",
  "Columbus",
  "Fort Worth",
  "Charlotte",
  "Seattle",
  "Denver",
  "El Paso",
  "Washington",
  "Boston",
  "Detroit",
  "Nashville",
  "Memphis",
  "Portland",
  "Oklahoma City",
  "Las Vegas",
  "Louisville",
  "Baltimore",
  "Milwaukee",
  "Albuquerque",
  "Tucson",
  "Fresno",
  "Sacramento",
  "Mesa",
  "Kansas City",
  "Atlanta",
  "Long Beach",
  "Omaha",
  "Raleigh",
  "Colorado Springs",
  "Miami",
  "Virginia Beach",
  "Oakland",
  "Minneapolis",
  "Tulsa",
  "Wichita",
  "New Orleans",
  "Arlington",
];

const cityListDiv = document.getElementById("cityList");

function filterCities(input) {
    const exactMatches = [];
    const partialMatches = [];

    cities.forEach(city => {
        if (city.toString().toLowerCase() === input.toString().toLowerCase()) {
            exactMatches.push(city);
        } else if (city.toString().toLowerCase().startsWith(input.toString().toLowerCase())) {
            partialMatches.push(city);
        }
    });

    return { exactMatches, partialMatches };
}

function displayCities(filteredCities) {
  // const cityList = document.getElementById('cityList');
  cityListDiv.innerHTML = ""; // Clear previous list

  const { exactMatches, partialMatches } = filterCities(filteredCities);
  // const uniqueCities = Array.from(new Set(filteredCities.map(city => city.name)));

  if (exactMatches.length === 0 && partialMatches.length === 0) {
    const noCityItem = document.createElement("div");
    noCityItem.textContent = "City not in list. Enter a city.";
    cityListDiv.style.cursor = "default";
    cityListDiv.appendChild(noCityItem);
  } else {
    const allMatches = [...exactMatches, ...partialMatches];

    allMatches.forEach((city) => {
      const cityItem = document.createElement("div");
      cityItem.textContent = city;
      cityListDiv.style.minHeight = "100px";
      cityListDiv.style.maxHeight = "355px"; // 355px
      cityItem.style.padding = "5px";
      cityListDiv.style.overflowY = "auto";

      cityItem.addEventListener("mouseover", () => {
        cityItem.style.color = "black";
        cityItem.style.borderBottom = "1px solid #ddd";
        cityItem.style.cursor = "pointer";
      });

      cityItem.addEventListener("mouseout", () => {
        cityItem.style.color = "";
        cityItem.style.borderBottom = "";
        cityListDiv.style.cursor = "default";
      });
      cityListDiv.appendChild(cityItem);
    });
  }

  cityListDiv.classList.remove("city-list");
}

// Event listener for input in the text box
const cityInput = document.querySelector(".city-input");
cityInput.addEventListener("input", function () {
  const inputValue = this.value.trim(); // Get input value and remove leading/trailing spaces
  if (inputValue === "") {
    document.getElementById("cityList").innerHTML = ""; // Clear city list if input is empty
    cityListDiv.classList.add("city-list");
    return;
  } else {
    getCity(inputValue);
    const { exactMatches, partialMatches } = filterCities(inputValue);
    displayCities([...exactMatches, ...partialMatches]);
  }
  // const filteredCities = filterCities(inputValue);
  // displayCities(filteredCities);
});

// Event listener for suggestion selection
document.getElementById("cityList").addEventListener("click", function (event) {
  const selectedCity = event.target.textContent;
  if (selectedCity) {
    // Set the selected city as the input value
    cityInput.value = selectedCity;
    // Clear the city list
    document.getElementById("cityList").innerHTML = "";
    cityListDiv.style.display = "none";
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
      alert("Wrong City Name");
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
  date.style.backgroundColor = "#c3eaf4";
  const weatherIconName = getWeatherIconName(data.weather[0].main);
  descriptionIcon.innerHTML = `<i class="material-icons">${weatherIconName}</i>`;

  hidden.classList.remove("hidden");
}

const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input");

formElement.addEventListener("submit", function (e) {
  e.preventDefault();

  const city = inputElement.value;
  if (city !== "") {
    cityListDiv.style.display = "none";
    fetchWeatherData(city);
    getCity(city);
    inputElement.value = "";
  }
});

function getCity(city) {
  fetch(`https://api.api-ninjas.com/v1/city?name=${city}`, {
    method: "GET",
    headers: {
      "X-Api-Key": "LptTyoMzpuTNEdDUE7o2rg==vyQmn5HNHFPJVhqJ",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((result) => {
      result.forEach((cityObj) => {
        if (cityObj.name && !cities.includes(cityObj.name)) {
          cities.push(cityObj.name);
        }
      });
      console.log(cities);
      // if (city !== '') {
      //     displayCities(cities);
      // }
      // filterCities(cities);
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
}

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

// function cityFun(city) {
//     // var name = 'San Francisco'
//     $.ajax({
//         method: 'GET',
//         url: 'https://api.api-ninjas.com/v1/city?name=' + city,
//         headers: { 'X-Api-Key': 'LptTyoMzpuTNEdDUE7o2rg==vyQmn5HNHFPJVhqJ'},
//         contentType: 'application/json',
//         success: function(result) {
//         console.log(result);
//     },
//         error: function ajaxError(jqXHR) {
//         console.error('Error: ', jqXHR.responseText);
//         }
//     });
// }
