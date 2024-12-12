
const inputData = document.getElementById("inputField");
const showWeather = document.getElementById("showWeather");
const API_KEY = `0c7725f32a475675de3ba93ab0cc88a7`;

const searchData = async () => {
  // Check if the input field is empty
  if (inputData.value.trim() === "") {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: 'Please enter a city name to get the weather update!',
    });
    return;
  }

  const Weather_Api = `https://api.openweathermap.org/data/2.5/weather?q=${inputData.value}&appid=${API_KEY}&units=metric`;

  try {
    const fetchData = await fetch(Weather_Api);
    const response = await fetchData.json();

    if (response.cod !== 200) {
      // Invalid city name or other error
      Swal.fire({
        icon: 'error',
        title: 'Invalid City',
        text: 'City not found. Please check the name and try again.',
      });
      return;
    }

    showData(response);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Something went wrong while fetching the data. Please try again.',
    });
  }
};
const showData = (data) => {
  // Extract city name and country
  const cityName = data.name;
  const country = data.sys.country;

  // Calculate local time for the city using the timezone offset
  const timezoneOffset = data.timezone; // Offset in seconds
  const utcTime = new Date().getTime() + new Date().getTimezoneOffset() * 60000; // Current UTC time in milliseconds
  const localTime = new Date(utcTime + timezoneOffset * 1000).toLocaleString(); // Local time based on UTC and offset

  // Update the left side with weather details and local time
  showWeather.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">
    <h2>${data.weather[0].description}</h2>
    <h1>${cityName}, ${country}</h1>
    <p>Local Time: ${localTime}</p>
  `;

  // Update right side weather details
  document.getElementById("tempMax").innerHTML = `
    <span>Temp max</span> <span>${data.main.temp_max}° <i class="fas fa-thermometer-full"></i></span>
  `;
  document.getElementById("tempMin").innerHTML = `
    <span>Temp min</span> <span>${data.main.temp_min}° <i class="fas fa-thermometer-empty"></i></span>
  `;
  document.getElementById("humidity").innerHTML = `
    <span>Humidity</span> <span>${data.main.humidity}% <i class="fas fa-tint"></i></span>
  `;
  document.getElementById("cloudy").innerHTML = `
    <span>Cloudy</span> <span>${data.clouds.all}% <i class="fas fa-cloud"></i></span>
  `;
  document.getElementById("wind").innerHTML = `
    <span>Wind</span> <span>${data.wind.speed} km/h <i class="fas fa-wind"></i></span>
  `;
};
