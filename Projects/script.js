document.getElementById('getWeather').addEventListener('click', function() {
    const city = document.getElementById('city').value;
    const apiKey = 'b09914096d0415564983ac6b393dd22e';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    // Function to update the background based on time
    function updateBackgroundTime() {
        const currentTime = new Date();
        const isAM = currentTime.getHours() < 12; // Check if it's morning/daytime

        // Get the background element
        const background = document.getElementById('background');

        if (isAM) {
            // Set a morning/daytime background (e.g., blue sky)
            background.style.backgroundColor = 'skyblue';
        } else {
            // Set an evening/night background (e.g., night sky)
            background.style.backgroundColor = 'midnightblue';
        }
    }

    // Function to update the current time
    function updateCurrentTime() {
        const currentTime = new Date().toLocaleTimeString();
        const weatherInfo = document.getElementById('weatherInfo');
        weatherInfo.innerHTML += `<p>Current Time: ${currentTime}</p>`;
    }

    // Fetch weather data
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.innerHTML = `
                <p>City: ${data.name}</p>
                <p>Temperature: ${data.main.temp}°F</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} mph</p>
                <p>Weather: ${data.weather[0].description}</p>
            `;

            // Call the functions to update the background and current time
            updateBackgroundTime();
            updateCurrentTime();
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

