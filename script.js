// Constants - Data that does not Change:
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'ccbaef0e44f670e826b88a1eb7a3c384';
const FCST_URL = 'http://api.openweathermap.org/data/2.5/forecast'
// ?q={city name}&units=imperial&appid={API key}'

// Variables - Data that Changes

let weatherData;
let forecastDays;
let weekDays;
let d = new Date();
let day = d.getDay();
if (day === 0) {
    weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
}
if (day === 1) {
    weekDays = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday", "Sunday"];
}
if (day === 2) {
    weekDays = ["Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday","Monday"];
}
if (day === 3) {
    weekDays = ["Wednesday","Thursday","Friday","Saturday","Sunday","Monday","Tuesday"];
}
if (day === 4) {
    weekDays = ["Thursday","Friday","Saturday","Sunday","Monday","Tuesday","Wednesday"];
}
if (day === 5) {
    weekDays = ["Friday","Saturday", "Sunday","Monday","Tuesday","Wednesday","Thursday"];
}
if (day === 6) {
    weekDays = ["Saturday", "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"];
}

// Cached Elements
const $weatherFor = $('#weatherFor');
const $temperature = $('#temperature');
const $feelsLike = $('#feelsLike');
const $weather = $('#weather');
const $form = $('form');
const $input = $('input[type="text"]');
const $main = $('main'); 

// console.log($.ajax(`${BASE_URL}?q=London&appid=${API_KEY}`));

// Event Listeners

$form.on('submit', handleSearch);

// Functions

function handleSearch (evt) {
    evt.preventDefault();
    const weatherLocation = $input.val();
    $.ajax(`${FCST_URL}?q=${weatherLocation}&units=imperial&appid=${API_KEY}`)
        .then(function (data) {
            weatherData = data;
            let fcstLength = $('#forecast :selected').text();
            if (fcstLength === 'Current/One Day') {
                render_current();
            }
            if (fcstLength === 'Two Days') {
                render_twoday();
            }
            if (fcstLength === 'Three Days') {
                render_threeday();
            }
            if (fcstLength === 'Four Days') {
                render_fourday();
            }
            if (fcstLength === 'Five Days') {
                render_fiveday();
            }
            $input.val('');
            $('#forecast').prop('selectedIndex', 0); 
            
        }, function (error) {
            console.log('promise failed')
            console.log(error);
        });
}

function dayOfWeek(index) {
    return weekDays[index];
}

function render_current(index) {
    let d = new Date();
    $main.html (`
        <p>Current Weather For: <strong>${weatherData.city.name}</strong></p>
        <p id="weatherFor"></p>
        <p>Temperature: ${weatherData.list[0].main.temp}</p>
        <p id="temperature"></p>
        <p>Feels Like: ${weatherData.list[0].main.feels_like}</p>
        <p id="feelsLike"></p>
        <p>Sky Cover: ${weatherData.list[0].weather[0].description}</p>
        <p id="weather"></p>
    `)
}

function render_twoday() {
    $main.html (`
        <p>Weather For: <strong>${weatherData.city.name}</strong></p>
        <p id="weatherFor"></p>
        <p>Temperature:<br> 
            ${weekDays[0]}: ${weatherData.list[0].main.temp}<br>
            ${weekDays[1]}: ${weatherData.list[8].main.temp}
        </p>
        <p id="temperature"></p>
        <p>Feels Like:<br>
            ${weekDays[0]}: ${weatherData.list[0].main.feels_like}<br>
            ${weekDays[1]}: ${weatherData.list[8].main.feels_like}
        </p>
        <p id="feelsLike"></p>
        <p>Sky Cover:<br>
            ${weekDays[0]}: ${weatherData.list[0].weather[0].description}<br>
            ${weekDays[1]}: ${weatherData.list[8].weather[0].description}
        </p>
        <p id="weather"></p>
    `)
}

function render_threeday() {
    let d = new Date();
    $main.html (`
        <p>Weather For: <strong>${weatherData.city.name}</strong></p>
        <p id="weatherFor"></p>
        <p>Temperature:<br> 
            ${weekDays[0]}: ${weatherData.list[0].main.temp}<br>
            ${weekDays[1]}: ${weatherData.list[8].main.temp}<br>
            ${weekDays[2]}: ${weatherData.list[16].main.temp}
        </p>
        <p id="temperature"></p>
        <p>Feels Like:<br>
            ${weekDays[0]}: ${weatherData.list[0].main.feels_like}<br>
            ${weekDays[1]}: ${weatherData.list[8].main.feels_like}<br>
            ${weekDays[2]}: ${weatherData.list[16].main.feels_like}
        </p>
        <p id="feelsLike"></p>
        <p>Sky Cover:<br>
            ${weekDays[0]}: ${weatherData.list[0].weather[0].description}<br>
            ${weekDays[1]}: ${weatherData.list[8].weather[0].description}<br>
            ${weekDays[2]}: ${weatherData.list[16].weather[0].description}
        </p>
        <p id="weather"></p>
    `)
}

function render_fourday() {
    let d = new Date();
    $main.html (`
        <p>Weather For: <strong>${weatherData.city.name}</strong></p>
        <p id="weatherFor"></p>
        <p>Temperature:<br> 
            ${weekDays[0]}: ${weatherData.list[0].main.temp}<br>
            ${weekDays[1]}: ${weatherData.list[8].main.temp}<br>
            ${weekDays[2]}: ${weatherData.list[16].main.temp}<br>
            ${weekDays[3]}: ${weatherData.list[24].main.temp}
        </p>        <p id="temperature"></p>
        <p>Feels Like:<br>
            ${weekDays[0]}: ${weatherData.list[0].main.feels_like}<br>
            ${weekDays[1]}: ${weatherData.list[8].main.feels_like}<br>
            ${weekDays[2]}: ${weatherData.list[16].main.feels_like}<br>
            ${weekDays[3]}: ${weatherData.list[24].main.feels_like}
        </p>
        <p id="feelsLike"></p>
        <p>Sky Cover:<br>
            ${weekDays[0]}: ${weatherData.list[0].weather[0].description}<br>
            ${weekDays[1]}: ${weatherData.list[8].weather[0].description}<br>
            ${weekDays[2]}: ${weatherData.list[16].weather[0].description}<br>
            ${weekDays[3]}: ${weatherData.list[24].weather[0].description}
        </p>
        <p id="weather"></p>
    `)
}

function render_fiveday() {
    let d = new Date();
    $main.html (`
        <p>Weather For: <strong>${weatherData.city.name}</strong></p>
        <p id="weatherFor"></p>
        <p>Temperature:<br> 
            ${weekDays[0]}: ${weatherData.list[0].main.temp}<br>
            ${weekDays[1]}: ${weatherData.list[8].main.temp}<br>
            ${weekDays[2]}: ${weatherData.list[16].main.temp}<br>
            ${weekDays[3]}: ${weatherData.list[24].main.temp}<br>
            ${weekDays[4]}: ${weatherData.list[32].main.temp}
        </p>
        <p id="temperature"></p>
        <p>Feels Like:<br>
            ${weekDays[0]}: ${weatherData.list[0].main.feels_like}<br>
            ${weekDays[1]}: ${weatherData.list[8].main.feels_like}<br>
            ${weekDays[2]}: ${weatherData.list[16].main.feels_like}<br>
            ${weekDays[3]}: ${weatherData.list[24].main.feels_like}<br>
            ${weekDays[4]}: ${weatherData.list[32].main.feels_like}
        </p>
        <p id="feelsLike"></p>
        <p>Sky Cover:<br>
            ${weekDays[0]}: ${weatherData.list[0].weather[0].description}<br>
            ${weekDays[1]}: ${weatherData.list[8].weather[0].description}<br>
            ${weekDays[2]}: ${weatherData.list[16].weather[0].description}<br>
            ${weekDays[3]}: ${weatherData.list[24].weather[0].description}<br>
            ${weekDays[4]}: ${weatherData.list[32].weather[0].description}
        </p>
        <p id="weather"></p>
    `)
}
