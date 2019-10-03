const request = require('request');

const forecast = (latitude, longitude, callback) => {
    url = 'https://api.darksky.net/forecast/7f78f2dbbd5704b9d76b518dd71309f2/' + latitude + ',' + longitude  +'?units=si';

    console.log(url)

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to server check your web services', undefined);
        } else if (body.error) {
            callback('unable the find location');
        } else {
            callback(undefined, {
                timezone: body.timezone,
                temperature: body.currently.temperature
            })
        }
    })

}

module.exports = forecast;