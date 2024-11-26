
//TODAY WEATHER VARIABLES

var allWeather = [];
var weatherRow = document.querySelector('#weatherRow');
var city = document.querySelector('.city');
var weatherIcon = document.querySelector('.weatherIcon');
var date = document.querySelector('.date');
var cityTemp = document.querySelector('.cityTemp');
var weatherCond = document.querySelector('.weatherCond');
var humidity = document.querySelector('.humidity');
var speed = document.querySelector('.speed');
var direction = document.querySelector('.direction');
var dayName = document.querySelector('.dayName');
var searchLocation = document.querySelector('#searchLocation');

//TOMORROW WEATHER VARIABLES

var weatherTomorrowIcon = document.querySelector('.weatherTomorrowIcon');
var weatherTomorrowCond = document.querySelector('.weatherTomorrowCond');
var cityTomorrowTemp = document.querySelector('.cityTomorrowTemp');
var tomorrowName = document.querySelector('.tomorrowName');
var tomorrowDate = document.querySelector('.tomorrowDate');
var cityTomorrowMinTemp = document.querySelector('.cityTomorrowMinTemp');

//AFTER TOMORROW WEATHER VARIABLES

var weatherAfterTomorrowIcon = document.querySelector('.weatherAfterTomorrowIcon');
var weatherAfterTomorrowCond = document.querySelector('.weatherAfterTomorrowCond');
var cityAfterTomorrowTemp = document.querySelector('.cityAfterTomorrowTemp');
var afterTomorrowName = document.querySelector('.afterTomorrowName');
var afterTomorrowDate = document.querySelector('.afterTomorrowDate');
var cityAfterTomorrowMinTemp = document.querySelector('.cityAfterTomorrowMinTemp');

//DATE 
// var date = new date();

// WEATHER FUNCTION

async function getCurrentWeather(cityName) {
    if (cityName && cityName.length>3) {
        var weather = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=e5cc9e364abf42fa861143615241601&q=${cityName}&days=3&aqi=no&alerts=yes`);
        var data = await weather.json();
        allWeather = data;
        city.innerHTML = data.location.name;
        weatherIcon.setAttribute("src", "https:" + data.current.condition.icon);
        date.innerHTML = data.location.localtime;
        cityTemp.innerHTML = data.current.temp_c + '°C';
        weatherCond.innerHTML = data.current.condition.text;
        humidity.innerHTML = `<i class="fa-solid fa-umbrella"></i> ` + data.current.humidity + '%';
        speed.innerHTML = `<i class="fa-solid fa-wind"></i> ` + data.current.vis_km + 'km';
        direction.innerHTML = `<i class="fa-solid fa-compass"></i> ` + data.current.wind_degree + '°';
    }

    var newDate = new Date();
    var todayName = newDate.toLocaleDateString("en-US", { weekday: "long" });
    dayName.innerHTML = todayName;
    // console.log(todayName);

    //TOMORROW WEATHER
    if (cityName && cityName.length>3) {
        tomorrowDate.innerHTML = data.forecast.forecastday[1].date;
        weatherTomorrowIcon.setAttribute("src", "https:" + data.forecast.forecastday[1].day.condition.icon);
        cityTomorrowTemp.innerHTML = data.forecast.forecastday[1].day.maxtemp_c + '°C';
        cityTomorrowMinTemp.innerHTML = data.forecast.forecastday[1].day.mintemp_c + '°C';
        weatherTomorrowCond.innerHTML = data.forecast.forecastday[1].day.condition.text;
        // console.log(tomorrowName);
    }
    newDate.setDate(newDate.getDate() + 1);

    tomorrowName.innerHTML = newDate.toLocaleDateString("en-US", { weekday: "long" });


    //AFTER TOMORROW WEATHER
    if (cityName && cityName.length>3) {
        afterTomorrowDate.innerHTML = data.forecast.forecastday[2].date;
        weatherAfterTomorrowIcon.setAttribute("src", "https:" + data.forecast.forecastday[2].day.condition.icon);
        cityAfterTomorrowTemp.innerHTML = data.forecast.forecastday[2].day.maxtemp_c + '°C';
        cityAfterTomorrowMinTemp.innerHTML = data.forecast.forecastday[2].day.mintemp_c + '°C';
        weatherAfterTomorrowCond.innerHTML = data.forecast.forecastday[2].day.condition.text;
    }
    newDate.setDate(newDate.getDate() + 1);

    afterTomorrowName.innerHTML = newDate.toLocaleDateString("en-US", { weekday: "long" });
    // console.log('data', data);
}


getCurrentWeather()

// SEARCH INPUT
searchLocation.addEventListener("input", function (e) {
    e.preventDefault();
    searchFun();
});

var seachAlert = document.querySelector('#searchAlert')

// SEARCH FUNCTON
function searchFun() {
    var cityName = searchLocation.value.trim();
    if (cityName) {
        getCurrentWeather(cityName);
        seachAlert.classList.replace('d-block', 'd-none');
    } else {
        seachAlert.classList.replace('d-none', 'd-block');
    }
}

// GEO LOCATION
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var coordinates = `${latitude},${longitude}`;
        getCurrentWeather(coordinates);
    });
} else {
    getCurrentWeather("cairo");
}


