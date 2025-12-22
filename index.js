const apiKey = "2546ae4113fa553315d588f5ac7a6b1c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBtn = document.getElementById("search")
const cityInput = document.getElementById("cityInput")

async function checkWeather(city) {
    const response= await fetch(apiUrl + city + `&appid=${apiKey}`)

    var data = await response.json()
    console.log(data);
}

search.addEventListener("click", () => {
    checkWeather(cityInput.value);
});