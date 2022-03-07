// imports
const request = require('postman-request');

// geocoding API data
const gToken = '.json?access_token=' + process.env.MAPBOXAPIKEY;
const gURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const gLimit = '&limit=1';

// request to geolocation API to grab location
const getCoords = (city, callback) => {
    request(
        {
            url: gURL + city + gToken + gLimit,
            json: true
        },
        (error, response) => {
            if (error) {
                callback(error.message + ' Check your internet connection and try again.', undefined);
            } else if (response.body.features.length == 0) {
                callback({error: 'Could not load data. Check your query and try again.'}, undefined);
            } else {
                let data = response.body.features[0];
                let obj = {
                    coords: data.center,
                    placeName: data.place_name
                }
                callback(undefined, obj);
            }
        }
    )
}

module.exports = {
    getCoords: getCoords
}