// API token can be changed as needed with this var
const myToken = 'cfa68afc98b02c8f1fe2d58915f456b8';


// insert elements into HTML whem prompted
let displayDiv = document.createElement('div');
displayDiv.setAttribute("class","container");
let currentTempDisplay = document.createElement('h2');
displayDiv.appendChild(currentTempDisplay);
currentTempDisplay.setAttribute("class","cityDisplays");


// api call funct (using 'units=imperial' to receive Fahrenheit UOM)
const getWeatherData = async (city_name) => {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=imperial&appid=${myToken}`);
    let data = await response.json();
    let currentTemp = data.main.temp;
    let highTemp = data.main.temp_max;
    let lowTemp = data.main.temp_min;
    let humidity = data.main.humidity;
    let forecast = data.weather[0].main;
    currentTempDisplay.innerHTML = `Current Temp in ${city_name} is ${currentTemp}${highTemp}, ${lowTemp}, ${humidity}, ${forecast}`
    document.body.append(currentTempDisplay)
};





// grab form data (user input for city_name)
let form = document.querySelector('#city_name_form');


// addEventListener funct that send API call & receives data
form.addEventListener('submit', (event) => {
    event.preventDefault();
    let city_name = event.path[0][0].value;
    // send to api call funct
    getWeatherData(city_name);
});


