
const yargs = require('yargs');
const axios = require('axios');

var argv = yargs
    .options({
        a:{
            demand:true,
            alias:'address',
            describe: 'Address to fetch weather of...',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(`${argv.address}`);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=#YOUR_GOOGLE_GEOCODE_API_HERE`;

axios.get(geocodeUrl).then((response)=>{
    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to fetch the requested location');
    }
var lat = response.data.results[0].geometry.location.lat;
var lng = response.data.results[0].geometry.location.lng;
var weatherUrl = `https://api.darksky.net/forecast/#YOUR_DARK_SKY_API_HERE/${lat},${lng}`;
console.log(response.data.results[0].formatted_address);
return axios.get(weatherUrl);
}).then((response)=>{
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    var conditions = response.data.currently.summary;
    var rainChances = (response.data.currently.precipProbability)*100;
    var humidity = (response.data.currently.humidity)*100;
    console.log(`It's actually :${temperature} fahrenheit but feels like: ${apparentTemperature} fahrenheit.`);
    console.log(`Conditions are: ${conditions}`);
    console.log(`Chances of rain: ${rainChances}%`);
    console.log(`Humidity is: ${humidity}%`);
}).catch((e)=>{
    if(e.code === 'ENOTFOUND'){
        console.log('Could not connect to API servers.');
    } else{
        console.log(e.message);
    }
});

