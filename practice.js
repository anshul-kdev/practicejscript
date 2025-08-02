const apiKey = process.env.API_KEY;

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=`;
const searchBtn = document.getElementById("searchBtn");
const city = document.getElementById("city");

async function checkweather(city){
    const weather = await fetch(apiUrl + city + `&appid=${apiKey}&units=metric`);
    const data = await weather.json();
    if(weather.status == 404){
        document.getElementById("cityname").innerHTML = "City not found";
    } else {
            console.log(data);
            document.getElementById("cityname").innerHTML = city;
            document.getElementById("temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.getElementById("humidity").innerHTML = data.main.humidity + "%";
            document.getElementById("visibility").innerHTML = data.visibility + "%";
        document.getElementById("windspeed").innerHTML = data.visibility + "%";
        }
}
searchBtn.addEventListener("click",() => {
     checkweather(city.value);
    
})