// API tokens can be changed as needed with these vars
const openWeatherToken = 'cfa68afc98b02c8f1fe2d58915f456b8';
const BingMapsAPIKey = 'Ag1CtNzBcyoQ9dIsPFVj-FpdjNu1IQOVHVU92SNnvcyxdI1WyWRWV8Iq33CFm0_D';


// insert elements into HTML whem prompted
let displayDiv = document.createElement('div');
displayDiv.setAttribute("class","container");

let currentTempDisplay = document.createElement('h2');
currentTempDisplay.setAttribute("class","cityDisplays");
displayDiv.appendChild(currentTempDisplay);

let currentHighLowDisplay = document.createElement('h3');
currentHighLowDisplay.setAttribute("class","cityDisplays");
displayDiv.appendChild(currentHighLowDisplay);

let currentForecastDisplay = document.createElement('h3');
currentForecastDisplay.setAttribute("class","cityDisplays");
displayDiv.appendChild(currentForecastDisplay);

let currentMapDisplay = document.createElement('img');
currentMapDisplay.setAttribute("id","img-map");
currentMapDisplay.setAttribute("href","");
currentMapDisplay.setAttribute("alt","Area Map");
displayDiv.appendChild(currentMapDisplay);


// grab form data (user input for city/neighborhood by name or zip code)
let form = document.querySelector('#city_name_form');
let form_number = document.querySelector('#city_zip_form');


// receives city/state user input & transfers to API call funct
form.addEventListener('submit', (event) => {
    event.preventDefault();
    let city_name = event.path[0][0].value;
    let state_name = event.path[0][1].value;
    // send to api call funct
    getWeatherData(city_name,state_name);
});


// receives zip code user input & transfers to API call funct
form_number.addEventListener('submit', (event) => {
    event.preventDefault();
    let city_name = Number(event.path[0][0].value);
    // send to api call funct
    getWeatherData(city_name);
});


// api calls funct with conditional to check for city name or zip
const getWeatherData = async (city_name,state_name) => {
    try {
        if(typeof city_name == 'string'){
            console.log(city_name,state_name)
            let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name},${state_name}&units=imperial&appid=${openWeatherToken}`);
            let data = await response.json();
            let mapResponse = await fetch(`https://dev.virtualearth.net/REST/v1/Imagery/Map/AerialWithLabels/${city_name},${state_name}?&key=${BingMapsAPIKey}`);
            displayData(data,mapResponse);
        }else if(typeof city_name == 'number'){
            let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${city_name},us&units=imperial&appid=${openWeatherToken}`);
            let data = await response.json();
            let mapResponse = await fetch(`https://dev.virtualearth.net/REST/v1/Imagery/Map/AerialWithLabels/postalCode=${city_name}?&key=${BingMapsAPIKey}`);
            displayData(data,mapResponse)
        }
    }catch{
        console.log('That didn"t work')
        alert("\nSorry, that entry is invalid!")
    }
};


// traverses api calls & inserts data into HTML
const displayData = (data,mapResponse='') => {
    let currentTemp = Math.round(data.main.temp);
    let highTemp = Math.round(data.main.temp_max);
    let lowTemp = Math.round(data.main.temp_min);
    let humidity = data.main.humidity;
    let forecast = data.weather[0].description;
    let city_name = data.name;
    let mapUrl = mapResponse.url;

    currentTempDisplay.innerHTML = `Current Temp in ${city_name} is ${currentTemp} degrees`;
    currentHighLowDisplay.innerHTML = `Today's HIGH is ${highTemp}. The LOW is ${lowTemp}. Humidity is ${humidity}%`;
    currentForecastDisplay.innerHTML = `Current forecast: "${forecast}"`;
    currentMapDisplay.src = `${mapUrl}`;
    document.getElementById('weatherDivRight').append(currentMapDisplay);
    document.getElementById('weatherDivLeft').append(currentTempDisplay,currentHighLowDisplay,currentForecastDisplay)
};


// addEventListener for clear button
// const clearData = () =>{
//     document.getElementById('weatherDivRight').remove(currentMapDisplay);
//     document.getElementById('weatherDivLeft').remove(currentTempDisplay,currentHighLowDisplay,currentForecastDisplay)
// }
