const form = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim(); // Convert city name to uppercase
    if (city) {
        try {
            const options = { method: 'GET', headers: { accept: 'application/json' } };
            fetch(`https://api.tomorrow.io/v4/weather/realtime?location=${city}&apikey=hpStSMBiVAtZlu0IRVh555BkRNs4bLkM`, options)
                .then(response => response.json())
                .then(data => {
                    const values = data.data.values;
                    const location = data.location;
                    const time = data.data.time;

                    let html = `<h2>Realtime Weather Information</h2>`;
                    html += `<h3>Location:</h3>`;
                    html += `<p><strong>Name:</strong> ${location.name}</p>`;
                    html += `<p><strong>Latitude:</strong> ${location.lat}</p>`;
                    html += `<p><strong>Longitude:</strong> ${location.lon}</p>`;
                    html += `<p><strong>Time:</strong> ${time}</p>`;

                    html += `<h3>Values:</h3>`;
                    Object.entries(values).forEach(([key, value]) => {
                        html += `<p><strong>${key}:</strong> ${value}</p>`;
                    });

                    weatherInfo.innerHTML = html;
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
