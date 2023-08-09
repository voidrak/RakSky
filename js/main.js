const apiKey = "f4fffbfbe9297f8d3d2ce78633876727";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
const weatherImg = document.querySelector(".temp-city img");
const temperature = document.querySelector(".temp-city .temperature");
const cityEl = document.querySelector(".temp-city .city");
const wind = document.querySelector(".wind");
const humidity = document.getElementById("humidity");
const searchInput = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherCard = document.querySelector(".weather-details");
const errorMessage = document.querySelector(".error-message");
let city = "";

/// THE MAIN FUNCTION  .......I Know its not the best, i will refactor it soon
async function checkWeather() {
  // get the city from user input
  city = searchInput.value;
  /// here is where the fetch of data happen
  const response = await fetch(
    apiUrl + `q=${city}&appid=${apiKey}&units=metric`
  );
  /// the response to be converted into JSON format
  let data = await response.json();
  ///CHECK IF THE CITY IS CORRECT
  if (data.message == "city not found") {
    errorMessage.style.display = "block";
    weatherCard.style.display = "none";
  } else {
    weatherCard.style.display = "block";
    errorMessage.style.display = "none";
    weatherImg.src = `img/${data.weather[0].main}.png`;
    temperature.innerHTML = Math.round(data.main.temp) + "°c";
    cityEl.innerHTML = data.name;
    humidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = data.wind.speed + " km/hr";
  }
}

//// make the checkWeather function to be called when the search button is clicked
searchBtn.addEventListener("click", () => {
  checkWeather();
});
