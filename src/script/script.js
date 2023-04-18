
//Information about open weaather server and public key
const api = {
    key: "7e3f21edee540e6110af347b55eb1ab2",
    base: "https://api.openweathermap.org/data/2.5/"
}

//add keypress event on serach-box
const search = document.querySelector('.search-box');
search.addEventListener('keypress', setQuery);
//keypress event handler 
function setQuery(evt) {
    // Enter button keycode
    if (evt.keyCode == 13) {
        getResults(search.value);
    }
}

//Fetch waether data from openweather api
function getResults(query) {
    // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(weather => {

            //weather object contains inforamtion in string format which we require to convert json
            return weather.json();
        }).then((response) => {
            console.log(response)

            //function to display all information
            displayResults(response)
        })
        // alert box when searching invalid city
        .catch(err => alert("Error fetching weather information... City not found!"));
}



function displayResults(weather) {
    let city = document.querySelector('.location-info .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location-info .date');
    date.innerText = dateCalender(now);

    let temp = document.querySelector('.weather-info .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.weather-info .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}


function dateCalender(d) {
    //store months and days in array
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}