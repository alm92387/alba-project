let now = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getSeconds(); 
let dayTime = [`${day}, ${hours}:${minutes}:${seconds}`]

let h3 = document.querySelector("h3");
h3.innerHTML = dayTime; 

function formatDay (timestamp) {
  let date = new Date (timestamp *1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];

}
function searchCity(city) {
  let apiKey = "74c14200946b4fbc59b8a95c822aab0e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let temperature = document.querySelector("#temperature");
  document.querySelector("#city").innerHTML = response.data.name; 
  document.querySelector("#temperature").innerHTML = `${temperature}`; 
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
      let iconElement = document.querySelector("#ticon");
   iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  farenheightTemperature = Math.round(response.data.main.temp);
  temperature.innerHTML = Math.round (farenheightTemperature);

  getForecast (response.data.coord);


}
function showForecast(response){
  let forecast = response.data.daily;
  let forecastElement = document.querySelector ("#forecast"); 
  let forecastHTML = `<div class="row">`;
  forecast.forEach (function (forecastDay, index) { 
    if (index < 6) {
  forecastHTML = forecastHTML + ` 
        <div class="col-2">
        <div class= "weather-forecast-date"> ${formatDay (forecastDay.dt)}
                </div> 
            <img src = "http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="Rain"/>   
            <div class = "weather-forecast-temperature">
                <span class = "forecast-temperature-max">${Math.round(forecastDay.temp.max)}° </span>
                <span class="forecast-temperature-min">${Math.round(forecastDay.temp.min)}° </span>
            </div>
            </div>
            `;
            }})
          ;
            forecastHTML = forecastHTML + `</div>`;
            forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates){
let apiKey = "74c14200946b4fbc59b8a95c822aab0e";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
axios.get(apiUrl).then(showForecast);
}


function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}


let searchForm = document.querySelector("#search");
searchForm.addEventListener("submit", handleSubmit);

function searchLocation(position) {
  let apiKey = "74c14200946b4fbc59b8a95c822aab0e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
    position.coords.latitude
  }&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showTemperature);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showFarenheightTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = farenheightTemperature;
}

let currentLocationButton = document.querySelector("#current");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector ("#far");
fahrenheitLink.addEventListener ("click", showFahrenheitTemperature);


searchCity ("Paris");
