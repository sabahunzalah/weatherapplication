const inputData = document.getElementById("inputField")
const showWeather = document.getElementById("showWeather")
const API_KEY =`0c7725f32a475675de3ba93ab0cc88a7`
const searchData = async ()=> {
      const Weather_Api = `https://api.openweathermap.org/data/2.5/weather?q=${inputData.value}&appid=${API_KEY}&units=metric`;


      const fecthData = await fetch(Weather_Api);
      const response = await fecthData.json()
      console.log(response)
      return showData(response)
     
      
};

const showData = (data) => {
    showWeather.innerHTML =`
    <img src=${`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="">
    <h1>Weather in ${data.name}</h1>
    <p>Temperature: ${data.main.temp}</p>
    <p>Humidity: ${data.main.humidity}</p>
    <p>Humidity: ${data.weather[0].main}</p>


    
    `
}

