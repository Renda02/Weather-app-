let now = new Date();

let current = document.querySelector("li.date");
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apri",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let date = now.getDate();
let month = months[now.getMonth()];
let year = now.getFullYear();
let hour = now.getHours();
let min = now.getMinutes();

current.innerHTML = `${date} ${day} ${month} ${year}, 
${hour}:${min}`;
if (min < 10) {
  min = `0${min}`;
}

// FAH TO CELCIUS

function tempInCel(event) {
  event.preventDefault();
  let celciusTemp = document.querySelector("span.temperature");
  celciusTemp.innerHTML = 19;
}
let celciusTemp = document.querySelector(".celcius");
celciusTemp.addEventListener("click", tempInCel);

function handleClick(event) {
  event.preventDefault();
  let temperature = 19;
  let fahrenheitTemperature = Math.round((temperature * 9) / 5 + 32);
  let fahrenheit = document.querySelector("span.temperature");
  fahrenheit.innerHTML = fahrenheitTemperature;
}
let fahrenTemp = document.querySelector(".fahr");
fahrenTemp.addEventListener("click", handleClick);

// CURRENT CITY

function getWeather(response) {
  document.querySelector("h3").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(`#precipitation`).innerHTML = Math.round(
    response.data.main.pressure
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feels").innerHTML = response.data.weather[0].main;
}

function searchButton(event) {
  event.preventDefault();
  let city = document.querySelector("#input-added").value;
  searchCity(city);
}

function searchCity(event) {
  let apiKey = "a5dc471873d618b50635e979e6f6c8fc";
  let city = document.querySelector("#input-added").value;
  let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(urlApi);
  axios.get(urlApi).then(getWeather);

  //let city = document.querySelector("#input-added").value;
  //getCity(city);
}
let form = document.querySelector("#form-input");
form.addEventListener("submit", searchButton);

function showTemp(response) {
  console.log(response.data.main.temp);
  console.log(response.data.name);
  let city = response.data.name;
  let heading = document.querySelector("h3");
  heading.innerHTML = city;

  let temperatura = Math.round(response.data.main.temp);
  let tempereta = document.querySelector("#temperature");
  tempereta.innerHTML = temperatura;

  let precipitation = Math.round(response.data.main.pressure);
  let precip = document.querySelector(`#precipitation`);
  precip.innerHTML = `pressure: ${precipitation} %`;

  let humidity = response.data.main.humidity;
  let humidy = document.querySelector(`#humidity`);
  humidy.innerHTML = `humidity: ${humidity} %`;

  let wind = response.data.wind.speed;
  let windElement = document.querySelector(`#wind`);
  windElement.innerHTML = `wind: ${wind} Km/h`;
}

// geolacation

function showPosition(position) {
  let apiKey = "a5dc471873d618b50635e979e6f6c8fc";
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let urlKey = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(urlKey).then(showTemp);
}

let currentLocation = document.querySelector("#button");
currentLocation.addEventListener("click", showTemp);

navigator.geolocation.getCurrentPosition(showPosition);
