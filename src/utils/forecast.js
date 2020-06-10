'use strict';

const request = require('postman-request');

const forecast = (latitude, longitude, callback) =>  {
    const url = 'http://api.weatherstack.com/current?access_key=f41e35407998bf659423ffd2ac284503&query=' + latitude + ',' + longitude + '&units=m';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service.');
        } else if (body.error) {
            callback('Unable to find location.');
        } else {
            const tempObject = {
                temperature: body.current.temperature,
                precipitation: body.current.precip,
                description: body.current.weather_descriptions
            }

            const { temperature, precipitation, description } = tempObject;

            callback(undefined, `It is currently ${temperature} degrees out. It is ${description} and there is ${precipitation}% chance of rain.`);                    
        }
    });
}

module.exports = forecast;