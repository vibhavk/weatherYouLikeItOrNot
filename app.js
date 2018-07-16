
const yargs = require('yargs');
const geocode = require('./geocode/geocode.js')
const weather = require('./weather/weather.js');

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

geocode.geocodeAddress(argv.address,(errorMessage,results)=>{
    if(errorMessage){
        console.log(errorMessage);
    } else {
        console.log(results.address);
        weather.getWeather(results.latitude,results.longitude,(errorMessage, weatherResults)=>{
            if(errorMessage){
                console.log(errorMessage);
            } else {
                console.log(`It's actually :${weatherResults.temperature} fahrenheits but feels like: ${weatherResults.apparentTemperature} fahrenheits.`);
            }
        });
    }
});


