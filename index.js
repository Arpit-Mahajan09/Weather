
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const locUrl = "https://api.openweathermap.org/data/2.5/weather?lat=";
const imageUrl  = "http://openweathermap.org/img/wn/"; 

const searchBtn = document.getElementById("search")
const locBtn = document.getElementById("locationdata")
const cityInput = document.getElementById("cityInput")
const dashboard = document.querySelector(".dashboard");


function getlocation(){    
    navigator.geolocation.getCurrentPosition((position)=> 
        locationWeather(position.coords.latitude, position.coords.longitude)
)
}

async function locationWeather(lat,lon) {
    const response= await fetch(`/api/weather?lat=${lat}&lon=${lon}`)
    try{
        if (response.status == 404) {
                alert("City not found");
                return;
            }

        const data =await response.json()    
        console.log(data)

        update(data)

        dashboard.style.display = "flex";

    } catch (error) {
        console.error(error);
    }
}

async function checkWeather(city) {
    const response= await fetch(`/api/weather?city=${encodeURIComponent(city.trim())}`)
    try{
        if (response.status == 404) {
                alert("City not found");
                return;
            }

        var data =await response.json()    
        console.log(data)
        update(data)
        dashboard.style.display = "flex";

    } catch (error) {
        console.error(error);
    }
}

function update(data){
    try{
        document.getElementById("Temp").innerHTML=+(data.main.temp) + "°C" + `<img src = "http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
        document.getElementById("feels_like").innerHTML="Feels Like: "+(data.main.feels_like) + "°C";
        document.getElementById("temp_max").innerHTML="Max Temp: "+(data.main.temp_max)+ "°C";
        document.getElementById("temp_min").innerHTML="Min Temp: "+(data.main.temp_min)+ "°C";

        document.getElementById("speed").innerHTML="Speed: " + (data.wind.speed) + " m/s";
        document.getElementById("deg").innerHTML="Deg: " + (data.wind.deg)+ "°";
        document.getElementById("pressure").innerHTML="Pressure: " +(data.main.pressure) + "hPa";

        document.getElementById("name").innerHTML = `City: ${data.name}`;
        document.getElementById("country").innerHTML=(data.sys.country);

        // document.getElementById("vis").src= imageUrl + data.weather[0].icon +`@2x.png`; 

        x=(data.coord.lon);
        y=(data.coord.lat);

        
        if (y>=0) y=(data.coord.lon)+ "°E";
        else if  (y<0) y=(data.coord.lon)+ "°W";
        if ( x<=0) x=(data.coord.lat)+ "°S";
        else if  ( x>0) x=(data.coord.lat)+ "°N";
                
        x=document.getElementById("coord").innerHTML=y+x;
        
    } catch (error){
        console.log(error);
    }

}


searchBtn.addEventListener("click", () => {
    checkWeather(cityInput.value);
});

cityInput.addEventListener("keydown",function(event){
    if (event.key=="Enter"){
        event.preventDefault();
        searchBtn.click();
    }
});


locBtn.addEventListener("click", () => {
    if ("geolocation" in navigator) {
        getlocation()   
    } else {
        alert('Give acess to location')
    }
    cityInput.value="";
})
