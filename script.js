const apiKey = '07ca8b8002f5f2ae925ebf28493e2c8d'; // <-- Replace with your OpenWeatherMap API key

const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');

getWeatherBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (!city) {
    weatherInfo.innerHTML = "⚠️ Please enter a city name.";
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => {
      const { name, main, weather } = data;
      const temperature = main.temp;
      const description = weather[0].description;

      weatherInfo.innerHTML = `
        <h2>${name}</h2>
        <p>🌡 Temperature: ${temperature} °C</p>
        <p>🌤 Weather: ${description}</p>
      `;
    })
    .catch(error => {
      weatherInfo.innerHTML = `❌ Error: ${error.message}`;
    });
});
