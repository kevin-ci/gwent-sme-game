let weatherData = {
    dublin: [13, 83],
    newport: [12, 21],
    cardiff: [12, 89],
    swansea: [11, 92],
    getForecast(city) {
        let weatherInfo = this[city];
        return `In ${city}, it is currently ${weatherInfo[0]}°C and ${weatherInfo[1]}% humid.`;
    }
};

let forecastElement = document.getElementById("forecast");
let cityInputElement = document.getElementById("city-input");

function handleButtonClick(event) {
    let city = cityInputElement.value;
    if (city in weatherData) {
        forecastElement.innerText = weatherData.getForecast(city);    
    }
    else {
        forecastElement.innerText = `City not found`;  
    }
}

let buttonElement = document.getElementById("submit-button");
buttonElement.addEventListener('click', handleButtonClick);