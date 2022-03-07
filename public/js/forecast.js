// imports
const request = require('postman-request');

// weather API data
const URL = 'http://api.weatherstack.com/';
const mode = 'current?access_key=';
const apiKey = process.env.WEATHERSTACKAPIKEY;
const query = '&query=';
const units = '&units=m';

// request to weather API to load current weather for location
const getWeather = (error, {coords, placeName} = {}, callback) => { // challenge 11 code
    if (error) {
        return callback(error, undefined);
    } else {
        request(
            {
                // coords need to be in reverse due to difference between API (geocoords gives lon,lat, weather takes lat,lon)
                url: URL + mode + apiKey + query + coords[1] + ',' + coords[0] + units,
                json: true
            },
            (error, response) => {
                if (error) {
                    return callback(error, undefined);
                } else {
                    let myResponse = {};
                    const {statusCode, statusMessage} = response // challenge 11 code
                    myResponse["responseStatus"] = statusCode + " " + statusMessage;
                    myResponse["location"] = placeName;
                    myResponse["forecast"] = [];
                    response.body.current.weather_descriptions.forEach((el) => {
                        myResponse["forecast"].push(el);
                    });

                    myResponse["temperature"] = response.body.current.temperature;
                    myResponse["realFeel"] = response.body.current.feelslike;
                    myResponse["rainProb"] = response.body.current.precip;
                    callback(undefined, myResponse);
                }
            }
        )
    }
}

module.exports = {
    getWeather: getWeather
}