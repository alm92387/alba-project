let now = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getSeconds(); 
let dayTime = [`${day}, ${hours}:${minutes}:${seconds}`]

let h3 = document.querySelector("h3");
h3.innerHTML = dayTime; 

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
  celciusTemperature = Math.round(response.data.main.temp)
  temperature.innerHTML = Math.round (celciusTemperature)

}


function searchCity(city) {
  let apiKey = "74c14200946b4fbc59b8a95c822aab0e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
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
  }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showFahrenheitTemperature (event) {
  event.preventDefault ();
  let temperatureElement = document.querySelector ("#temperature"); 
  let farenheightTemperature = (celciusTemperature * 9) /5 + 32; 
  temperatureElement.innerHTML = Math.round(farenheightTemperature);
}

function showCelciusTemperature (event) {
  event.preventDefault ();
  let temperatureElement = document.querySelector ("#temperature"); 
  temperatureElement.innerHTML = celciusTemperature;
}

let currentLocationButton = document.querySelector("#current");
currentLocationButton.addEventListener("click", getCurrentLocation);

let celciusTemperature = null;

searchCity (city);

let fahrenheitLink = document.querySelector ("#far");
fahrenheitLink.addEventListener ("click", showFahrenheitTemperature);

let celciusLink = document.querySelector ("#cel");
celciusLink.addEventListener ("click", showCelciusTemperature);