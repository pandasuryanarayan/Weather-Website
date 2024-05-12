const form = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');

// Load the weather codes from JSON
let weatherCodes;
fetch('weatherCodes.json')
    .then(response => response.json())
    .then(data => {
        weatherCodes = data;
    })
    .catch(err => {
        console.error('Error fetching weather codes:', err);
    });

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        try {
            const options = { method: 'GET', headers: { accept: 'application/json' } };
            fetch(`https://api.tomorrow.io/v4/weather/realtime?location=${city}&apikey=hpStSMBiVAtZlu0IRVh555BkRNs4bLkM`, options)
                .then(response => response.json())
                .then(data => {
                    const values = data.data.values;

                    document.getElementById('name').textContent = data.location.name;

                    // Map weather code to description
                    const weatherCode = values.weatherCode;
                    const weatherDescription = weatherCodes[weatherCode] || 'Unknown';
                    document.getElementById('weather').textContent = weatherDescription;

                    console.log('Weather Code:', weatherCode);
                    console.log('Weather Description:', weatherCodes[weatherCode]);

                    document.getElementById('temperature').textContent = values.temperature;
                    document.getElementById('weatherTime').textContent = data.data.time;

                    document.getElementById('dewPoint').textContent = values.dewPoint;
                    document.getElementById('weatherHumidity').textContent = values.humidity;
                    document.getElementById('weatherCloudBase').textContent = values.cloudBase;
                    document.getElementById('weatherCloudCover').textContent = values.cloudCover;

                    document.getElementById('preciProb').textContent = values.precipitationProbability;
                    document.getElementById('pressureSurfLevel').textContent = values.pressureSurfaceLevel;
                    document.getElementById('rainIntensity').textContent = values.rainIntensity;
                    document.getElementById('uvIndex').textContent = values.uvIndex;
                    document.getElementById('visibility').textContent = values.visibility;
                    document.getElementById('windDirection').textContent = values.windDirection;
                    document.getElementById('windSpeed').textContent = values.windSpeed;

                    weatherInfo.classList.remove('hidden'); // Show weather data div
                })
                .catch(err => {
                    console.error('Error fetching weather data:', err);
                    weatherInfo.innerHTML = 'Error fetching weather data';
                });
        } catch (error) {
            console.error('Error fetching weather data: ', error);
            weatherInfo.innerHTML = 'Error fetching weather data';
        }
    } else {
        weatherInfo.innerHTML = 'Please enter a city name';
    }
});
