const request = require('request')

const forecast = (latitude, longitude, callback) => {
const url = 'http://api.weatherstack.com/current?access_key=72430a409c13e8b75c5c38c40edd79c0&query=' + latitude +',' + longitude
    request({url, json: true}, (error,{body}) => {
        if(error){
            callback('Unable to connect to weather service!')
        }
        else if(body.error){
            callback('Unable to find location')
        }
        else{
            callback(undefined, 'The current temperature is ' + body.current.temperature + ' and it feels like ' + body.current.feelslike +'. The humidity outside is ' + body.current.humidity + '%.')
        }
    })
}

module.exports = forecast