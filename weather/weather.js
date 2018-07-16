const request = require('request');

// 77c6b7f797cb80cca2bf2c955fb9ea16


var getWeather = (lat,lng,callback) =>{
request({
    url: `https://api.darksky.net/forecast/#YOUR_DARK_SKY_API_HERE/${lat},${lng}`,
    json:true
},(error,response,body)=>{
    if (!error && response.statusCode === 200){
    callback(undefined,{
        temperature:body.currently.temperature,
        apparentTemperature:body.currently.apparentTemperature
    });
    } else {
        callback('Unable to fetch weather');
    }
});
};

module.exports ={
    getWeather
}
