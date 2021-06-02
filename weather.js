const loc = document.getElementById("city-name");
const tempicon = document.getElementById("temp-icon");
const tempValue = document.getElementById("temperature");
const climate = document.getElementById("description");
const aqi = document.getElementById("air-quality");
const hum = document.getElementById("humidity");

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-btn");

// Get Temperature by Input
searchButton.addEventListener("click", () => {
  getWeatherData(searchInput.value);
  searchInput.value = "";
});

async function getWeatherData(city) {
  try {
    const API_key = "1a81832072406ce1015998be05ebaa4c";
    const api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`;

    const response = await fetch(api, { mode: "cors" });
    const weatherData = await response.json();

    const { name } = weatherData;
    const { feels_like } = weatherData.main;
    const { icon, main, description } = weatherData.weather[0];
    const { humidity } = weatherData.main;

    const { lat } = weatherData.coord;
    const { lon } = weatherData.coord;

    loc.textContent = name;
    climate.textContent = `${main} - ${description}`;
    tempValue.textContent = Math.round(feels_like - 273);
    hum.textContent = humidity;

    // Manipulate Icons for Day
    if (icon == "11d") tempicon.src = "Logo/cloud-lightning.gif";
    if (icon == "02d" || icon == "03d" || icon == "04d")
      tempicon.src = "Logo/partly-cloudy-day.gif";
    if (icon == "09d" || icon == "10d") tempicon.src = "Logo/rain.gif";
    if (icon == "13d") tempicon.src = "Logo/snow.gif";
    if (icon == "01d") tempicon.src = "Logo/sun.gif";
    // Manipulate Icons for Night
    if (icon == "11n") tempicon.src = "LogoN/cloud-lightning.gif";
    if (icon == "02n" || icon == "03n" || icon == "04n")
      tempicon.src = "LogoN/partly-cloudy-day.gif";
    if (icon == "09n" || icon == "10n") tempicon.src = "LogoN/rain.gif";
    if (icon == "13n") tempicon.src = "LogoN/snow.gif";
    if (icon == "01n") tempicon.src = "LogoN/clearNight.gif";

    // Air Quality Index
    const api2 = `http://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=57127ca4-7883-4ad5-be93-f126a9ee243b`;
    fetch(api2)
      .then((response) => response.json())
      .then((data) => {
        const { aqius } = data.data.current.pollution;
        aqi.textContent = aqius;
      });
  } catch (error) {
    alert("City Not Found");
  }
}

// Load The Page By Access Current Location
window.addEventListener("load", () => {
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // Assign Current Latitude & longitude
      long = position.coords.longitude;
      lat = position.coords.latitude;

      // const proxy = 'https://cors-anywhere.herokuapp.com/';
      const API_key = "1a81832072406ce1015998be05ebaa4c";
      const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_key}`;

      fetch(api, { mode: "cors" })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const { name } = data;
          const { feels_like } = data.main;
          const { icon, main, description } = data.weather[0];
          const { humidity } = data.main;

          loc.textContent = name;
          climate.textContent = `${main} - ${description} `;
          tempValue.textContent = Math.round(feels_like - 273);
          hum.textContent = humidity;

          // Manipulate Icons for Day
          if (icon == "11d") tempicon.src = "Logo/cloud-lightning.gif";
          if (icon == "02d" || icon == "03d" || icon == "04d")
            tempicon.src = "Logo/partly-cloudy-day.gif";
          if (icon == "09d" || icon == "10d") tempicon.src = "Logo/rain.gif";
          if (icon == "13d") tempicon.src = "Logo/snow.gif";
          if (icon == "01d") tempicon.src = "Logo/sun.gif";
          // Manipulate Icons for Night
          if (icon == "11n") tempicon.src = "LogoN/cloud-lightning.gif";
          if (icon == "02n" || icon == "03n" || icon == "04n")
            tempicon.src = "LogoN/partly-cloudy-day.gif";
          if (icon == "09n" || icon == "10n") tempicon.src = "LogoN/rain.gif";
          if (icon == "13n") tempicon.src = "LogoN/snow.gif";
          if (icon == "01n") tempicon.src = "LogoN/clearNight.gif";
        });

      // Air Quality Index
      const api2 = `http://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${long}&key=57127ca4-7883-4ad5-be93-f126a9ee243b`;
      fetch(api2)
        .then((response) => response.json())
        .then((data) => {
          const { aqius } = data.data.current.pollution;
          aqi.textContent = aqius;
        });
    });
  }
});
