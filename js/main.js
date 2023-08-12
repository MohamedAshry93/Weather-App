let inpSearch = document.getElementById('search');
/* today variables */
let todayName = document.getElementById('todayName');
let dateNumber = document.getElementById('dateNumber');
let monthName = document.getElementById('monthName');
let cityName = document.getElementById('cityName');
let todayTemperature = document.getElementById('todayTemperature');
let todayConditionImg = document.getElementById('todayConditionImg');
let todayCondition = document.getElementById('todayCondition');
let humidity = document.getElementById('humidity');
let wind = document.getElementById('wind');
let windDirection = document.getElementById('windDirection');
/* nextDay variables */
let nextDayName = document.querySelectorAll('#nextDayName');
let nextDayConditionImg = document.querySelectorAll('#nextDayConditionImg');
let nextDayMaxTemperature = document.querySelectorAll('#nextDayMaxTemperature');
let nextDayMinTemperature = document.querySelectorAll('#nextDayMinTemperature');
let nextDayCondition = document.querySelectorAll('#nextDayCondition');

/* getData from Api */

async function getWeather(siteName) {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=a952034f4aa74df4881174916231208&q=${siteName}&days=3`);
    let weatherData = await response.json();
    return weatherData;
}

/* display today data */

function displayWeatherData(data) {
    let todayData = new Date();
    todayName.innerHTML = todayData.toLocaleDateString('en-US', { weekday: 'long' });
    dateNumber.innerHTML = todayData.getDate();
    monthName.innerHTML = todayData.toLocaleDateString('en-US', { month: 'long' });
    cityName.innerHTML = data.location.name;
    todayTemperature.innerHTML = data.current.temp_c;
    todayConditionImg.setAttribute('src', data.current.condition.icon);
    todayCondition.innerHTML = data.current.condition.text;
    humidity.innerHTML = data.current.humidity + '%';
    wind.innerHTML = data.current.wind_kph + 'km/h';
    windDirection.innerHTML = data.current.wind_dir;
}

/* display next data */

function displayNextData(data) {
    let allForecastDay = data.forecast.forecastday
    for (let i = 0; i < 2; i++) {
        let nextDay = new Date(allForecastDay[i + 1].date);
        nextDayName[i].innerHTML = nextDay.toLocaleDateString('en-US', { weekday: 'long' });
        nextDayConditionImg[i].setAttribute('src', allForecastDay[i + 1].day.condition.icon);
        nextDayMaxTemperature[i].innerHTML = allForecastDay[i + 1].day.maxtemp_c;
        nextDayMinTemperature[i].innerHTML = allForecastDay[i + 1].day.mintemp_c;
        nextDayCondition[i].innerHTML = allForecastDay[i + 1].day.condition.text;
    }
}

/* start app */

async function startUpData(city = 'cairo') {
    let weatherData = await getWeather(city);
    if (true) {
        displayWeatherData(weatherData);
        displayNextData(weatherData);
    }

}

startUpData();

inpSearch.addEventListener('keyup', function () {
    startUpData(inpSearch.value);
})