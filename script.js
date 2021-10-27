// Constants - Data that does not Change:
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'ccbaef0e44f670e826b88a1eb7a3c384';
const FCST_URL = 'https://api.openweathermap.org/data/2.5/forecast'
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
const $h2 = $('h2');

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
    $h2.html(`Current Weather For: <strong>${weatherData.city.name}</strong>`);
    $main.html (`
        <section class="flex-item">
            <h3 class ="day-name">${weekDays[0]}</h3>
            <h4>Temperature</h4>
            <p id="temp">${weatherData.list[0].main.temp}&#8457</p>
            <hr>
            <h4>Feels Like</h4>
            <p id="feels-like">${weatherData.list[0].main.feels_like}&#8457</p>
            <hr>
            <h4>Sky Cover</h4>
            <p id="sky-cover">${weatherData.list[0].weather[0].description}</p>
        </section>
    `);
    $main.css({
        "display": "flex",
        "flex-wrap":"wrap",
        "justify-content":"center"
    });
    const $day = $(".day-name");
    $day.css({
        "margin-top":"2px",
        "margin-bottom":"10px",
        "font-size": "30px",
        "color":"white"
    });
    const $flex = $('.flex-item');
    $flex.css({
        "border-radius": "15px",
        "padding": "1px",
        "margin": "2px",
        "height": "400px",
        "width": "240px",
        "background-color": "#c4a78d",
        "border": "solid",
        "box-shadow": "5px 5px 2px black",
        "font-size": "18px"
    });
};

function render_twoday() {
    $h2.html(`Current Weather For: <strong>${weatherData.city.name}</strong>`);
    $main.html (`
        <section class="flex-item">
            <h3 class ="day-name">${weekDays[0]}</h3>
            <h4>Temperature</h4>
            <p id="temp">${weatherData.list[0].main.temp}&#8457</p>
            <hr>
            <h4>Feels Like</h4>
            <p id="feels-like">${weatherData.list[0].main.feels_like}&#8457</p>
            <hr>
            <h4>Sky Cover</h4>
            <p id="sky-cover">${weatherData.list[0].weather[0].description}</p>
        </section>
        <section class="flex-item">
            <h3 class ="day-name">${weekDays[1]}</h3>
            <h4>Temperature</h4>
            <p id="temp">${weatherData.list[8].main.temp}&#8457</p>
            <hr>
            <h4>Feels Like</h4>
            <p id="feels-like">${weatherData.list[8].main.feels_like}&#8457</p>
            <hr>
            <h4>Sky Cover</h4>
            <p id="sky-cover">${weatherData.list[8].weather[0].description}</p>
        </section>
    `);
    $main.css({
        "display": "flex",
        "flex-wrap": "wrap",
        "justify-content": "space-evenly"
    });
    const $day = $(".day-name");
    $day.css({
        "margin-top":"2px",
        "margin-bottom":"10px",
        "font-size": "30px",
        "color":"white"
    });
    const $flex = $(".flex-item");
    $flex.css({
        "border-radius": "15px",
        "padding": "1px",
        "margin": "2px",
        "height": "400px",
        "width": "240px",
        "background-color": "#c4a78d",
        "border": "solid",
        "box-shadow": "5px 5px 2px black",
        "font-size": "18px"
    });
}

function render_threeday() {
    let d = new Date();
    $h2.html(`Current Weather For: <strong>${weatherData.city.name}</strong>`);
    $main.html (`
        <section class="flex-item">
            <h3 class ="day-name">${weekDays[0]}</h3>
            <h4>Temperature</h4>
            <p id="temp">${weatherData.list[0].main.temp}&#8457</p>
            <hr>
            <h4>Feels Like</h4>
            <p id="feels-like">${weatherData.list[0].main.feels_like}&#8457</p>
            <hr>
            <h4>Sky Cover</h4>
            <p id="sky-cover">${weatherData.list[0].weather[0].description}</p>
        </section>
        <section class="flex-item">
            <h3 class ="day-name">${weekDays[1]}</h3>
            <h4>Temperature</h4>
            <p id="temp">${weatherData.list[8].main.temp}&#8457</p>
            <hr>
            <h4>Feels Like</h4>
            <p id="feels-like">${weatherData.list[8].main.feels_like}&#8457</p>
            <hr>
            <h4>Sky Cover</h4>
            <p id="sky-cover">${weatherData.list[8].weather[0].description}</p>
        </section>
        <section class="flex-item">
            <h3 class ="day-name">${weekDays[2]}</h3>
            <h4>Temperature</h4>
            <p id="temp">${weatherData.list[16].main.temp}&#8457</p>
            <hr>
            <h4>Feels Like</h4>
            <p id="feels-like">${weatherData.list[16].main.feels_like}&#8457</p>
            <hr>
            <h4>Sky Cover</h4>
            <p id="sky-cover">${weatherData.list[16].weather[0].description}</p>
        </section>
    `);
    $main.css({
        "display": "flex",
        "flex-wrap": "wrap",
        "justify-content": "space-evenly"
    });
    const $day = $(".day-name");
    $day.css({
        "margin-top":"2px",
        "margin-bottom":"10px",
        "font-size": "30px",
        "color":"white"
    });
    const $flex = $(".flex-item");
    $flex.css({
        "border-radius": "15px",
        "padding": "1px",
        "margin": "2px",
        "height": "400px",
        "width": "240px",
        "background-color": "#c4a78d",
        "border": "solid",
        "box-shadow": "5px 5px 2px black",
        "font-size": "18px"
    });
}

function render_fourday() {
    let d = new Date();
    $h2.html(`Current Weather For: <strong>${weatherData.city.name}</strong>`);
    $main.html (`
        <section class="flex-item">
            <h3 class ="day-name">${weekDays[0]}</h3>
            <h4>Temperature</h4>
            <p id="temp">${weatherData.list[0].main.temp}&#8457</p>
            <hr>
            <h4>Feels Like</h4>
            <p id="feels-like">${weatherData.list[0].main.feels_like}&#8457</p>
            <hr>
            <h4>Sky Cover</h4>
            <p id="sky-cover">${weatherData.list[0].weather[0].description}</p>
        </section>
        <section class="flex-item">
            <h3 class ="day-name">${weekDays[1]}</h3>
            <h4>Temperature</h4>
            <p id="temp">${weatherData.list[8].main.temp}&#8457</p>
            <hr>
            <h4>Feels Like</h4>
            <p id="feels-like">${weatherData.list[8].main.feels_like}&#8457</p>
            <hr>
            <h4>Sky Cover</h4>
            <p id="sky-cover">${weatherData.list[8].weather[0].description}</p>
        </section>
        <section class="flex-item">
            <h3 class ="day-name">${weekDays[2]}</h3>
            <h4>Temperature</h4>
            <p id="temp">${weatherData.list[16].main.temp}&#8457</p>
            <hr>
            <h4>Feels Like</h4>
            <p id="feels-like">${weatherData.list[16].main.feels_like}&#8457</p>
            <hr>
            <h4>Sky Cover</h4>
            <p id="sky-cover">${weatherData.list[16].weather[0].description}</p>
        </section>
        <section class="flex-item">
            <h3 class ="day-name">${weekDays[3]}</h3>
            <h4>Temperature</h4>
            <p id="temp">${weatherData.list[24].main.temp}&#8457</p>
            <hr>
            <h4>Feels Like</h4>
            <p id="feels-like">${weatherData.list[24].main.feels_like}&#8457</p>
            <hr>
            <h4>Sky Cover</h4>
            <p id="sky-cover">${weatherData.list[24].weather[0].description}</p>
        </section>
    `);
    $main.css({
        "display": "flex",
        "flex-wrap": "wrap",
        "justify-content": "space-evenly"
    });
    const $day = $(".day-name");
    $day.css({
        "margin-top":"2px",
        "margin-bottom":"10px",
        "font-size": "30px",
        "color":"white"
    });
    const $flex = $(".flex-item");
    $flex.css({
        "border-radius": "15px",
        "padding": "1px",
        "margin": "2px",
        "height": "400px",
        "width": "240px",
        "background-color": "#c4a78d",
        "border": "solid",
        "box-shadow": "5px 5px 2px black",
        "font-size": "18px"
    });
}

function render_fiveday() {
    let d = new Date();
    $h2.html(`Current Weather For: <strong>${weatherData.city.name}</strong>`);
    $main.html (`
        <section class="flex-item">
            <h3 class ="day-name">${weekDays[0]}</h3>
            <h4>Temperature</h4>
            <p id="temp">${weatherData.list[0].main.temp}&#8457</p>
            <hr>
            <h4>Feels Like</h4>
            <p id="feels-like">${weatherData.list[0].main.feels_like}&#8457</p>
            <hr>
            <h4>Sky Cover</h4>
            <p id="sky-cover">${weatherData.list[0].weather[0].description}</p>
        </section>
        <section class="flex-item">
            <h3 class ="day-name">${weekDays[1]}</h3>
            <h4>Temperature</h4>
            <p id="temp">${weatherData.list[8].main.temp}&#8457</p>
            <hr>
            <h4>Feels Like</h4>
            <p id="feels-like">${weatherData.list[8].main.feels_like}&#8457</p>
            <hr>
            <h4>Sky Cover</h4>
            <p id="sky-cover">${weatherData.list[8].weather[0].description}</p>
        </section>
        <section class="flex-item">
            <h3 class ="day-name">${weekDays[2]}</h3>
            <h4>Temperature</h4>
            <p id="temp">${weatherData.list[16].main.temp}&#8457</p>
            <hr>
            <h4>Feels Like</h4>
            <p id="feels-like">${weatherData.list[16].main.feels_like}&#8457</p>
            <hr>
            <h4>Sky Cover</h4>
            <p id="sky-cover">${weatherData.list[16].weather[0].description}</p>
        </section>
        <section class="flex-item">
            <h3 class ="day-name">${weekDays[3]}</h3>
            <h4>Temperature</h4>
            <p id="temp">${weatherData.list[24].main.temp}&#8457</p>
            <hr>
            <h4>Feels Like</h4>
            <p id="feels-like">${weatherData.list[24].main.feels_like}&#8457</p>
            <hr>
            <h4>Sky Cover</h4>
            <p id="sky-cover">${weatherData.list[24].weather[0].description}</p>
        </section>
        <section class="flex-item">
            <h3 class ="day-name">${weekDays[4]}</h3>
            <h4>Temperature</h4>
            <p id="temp">${weatherData.list[32].main.temp}&#8457</p>
            <hr>
            <h4>Feels Like</h4>
            <p id="feels-like">${weatherData.list[32].main.feels_like}&#8457</p>
            <hr>
            <h4>Sky Cover</h4>
            <p id="sky-cover">${weatherData.list[32].weather[0].description}</p>
        </section>
    `);
    $main.css({
        "display": "flex",
        "flex-wrap": "wrap",
        "justify-content": "space-evenly"
    });
    const $day = $(".day-name");
    $day.css({
        "margin-top":"2px",
        "margin-bottom":"10px",
        "font-size": "30px",
        "color":"white"
    });
    const $flex = $(".flex-item");
    $flex.css({
        "border-radius": "15px",
        "padding": "1px",
        "margin": "2px",
        "height": "400px",
        "width": "240px",
        "background-color": "#c4a78d",
        "border": "solid",
        "box-shadow": "5px 5px 2px black",
        "font-size": "18px"
    });
}
