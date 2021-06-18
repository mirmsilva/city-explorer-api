//import axios
const axios = require('axios');

//import classes
const Forecast = require('../models/Forecast.js')

//weather
app.get('/weather', async (req,res)=>{
  let lat= req.query.lat;
  let lon = req.query.lon;

  let cityWeatherData = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`);
  if (cityWeatherData === undefined){
    res.status(400).send('please try again!');
  }else{
    console.log(cityWeatherData.data);
    let cityForecast = cityWeatherData.data.data.map(obj=> new Forecast(obj.datetime, obj.weather.description, obj.low_temp, obj.max_temp));
    
    res.send(cityForecast);
  }
})

//export
module.exports={weather};