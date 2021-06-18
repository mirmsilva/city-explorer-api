//Node tester
console.log('hello from node!');

const express = require('express');
const app = express();

require('dotenv').config();

const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT;
//--------------------------------------------------------------
//what route our server should be listening for
const weatherData = require('../data/weather.json');

//Tester
app.get('/',(req,res)=>{
  res.send('This is working!');
});

//API endpoint
app.get('/weather', (req,res)=>{
  let lat= req.query.lat;
  let lon = req.query.lon;
  let searchQuery = req.query.searchQuery;

  console.log(lat, lon,searchQuery);

  //use .find()
  let cityWeatherData = weatherData.find(city=> city.city_name === searchQuery);
  console.log (cityWeatherData);
  //error message
  if (cityWeatherData === undefined){
    res.status(400).send('unsupported city');
    //if no error message show city
  }else{
    let cityDataPetrified = cityWeatherData.data.map(obj=> new Forecast(obj.datetime,`Low of ${obj.low_temp}, high of ${obj.max_temp}, with ${obj.weather.description.toLowerCase()}`));
    res.send(cityDataPetrified);
  }
})

//class forecast w/ date & description as parameters
class Forecast{
  constructor(date,description){
    this.date = date;
    this.description = description;
  }
}

//Catch All Error Message
app.get('/*', (request, response)=>{
  response.status(404).send('Sorry, We Only Have Information on Seattle, Amman & Paris, Please Try Again!')
});
//tell the server to start listening for requests
app.listen(PORT, () => {console.log(`listening on port ${PORT}`)});