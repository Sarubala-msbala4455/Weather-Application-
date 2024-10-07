const apiKey = "deda1ab01bd130825963c36a2dd0d2a2";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".icon");


async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);


    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".box2").style.display = "none";
    }
    else{

        var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;

    const timestamp = data.dt; 
    const timezoneOffset = data.timezone; 
    const localDate = new Date((timestamp + timezoneOffset) * 1000); // Convert to milliseconds

    // Adjust the local time to match the UTC difference
    const utcDate = new Date(localDate.getUTCFullYear(), localDate.getUTCMonth(), localDate.getUTCDate(), localDate.getUTCHours(), localDate.getUTCMinutes(), localDate.getUTCSeconds());
    
    const options = { month: 'long', day: 'numeric' };
    const dateString = utcDate.toLocaleDateString('en-US', options); // Get date without the year
    const dayString = utcDate.toLocaleDateString('en-US', { weekday: 'long' }); // Get day

    // Display the date and day
    document.getElementById("dateTime").innerHTML = `📅 ${dateString}`;
    document.getElementById("Day").innerHTML = dayString;
    
    
    //  Temperature 
    const tempC = data.main.temp;
    const tempF = (tempC * 9/5) + 32; // Convert to Fahrenheit

    // Display temperatures
    document.getElementById("temperatureC").innerHTML = `${Math.round(tempC)}&deg;C`;
    document.getElementById("temperatureF").innerHTML = `${Math.round(tempF)}&deg;F`;

    document.getElementById("txtWord").innerHTML = data.weather[0].main;

    document.getElementById("humidity").innerHTML = `Humidity: ${data.main.humidity}%`;
    document.getElementById("pressure").innerHTML = `Pressure: ${data.main.pressure} hPa`; // Changed to display pressure in hPa
    document.getElementById("wind").innerHTML = `Wind Speed: ${data.wind.speed} km/h`;



    if(data.weather[0].main == "Clear"){
            weatherIcon.src="images/clear.png";
    }
    else if(data.weather[0].main == "Clouds"){
        
        weatherIcon.src="images/cloudy.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src="images/rain.png";
    }
    else if(data.weather[0].main == "Snow"){
        weatherIcon.src="images/snow.png";
    }
    else if(data.weather[0].main == "Haze"){
        weatherIcon.src="images/haze.png";
    }
    else if(data.weather[0].main == "Thunderstorm"){
        weatherIcon.src="images/thunderstorm.png";
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src="images/mist.png";
    }
    
    
    
    
   

    document.querySelector(".box2").style.display = "block";
    document.querySelector(".error").style.display = "none";
    }


}

searchBtn.addEventListener("click",()=>{
    checkWeather(searchBox.value);
});
