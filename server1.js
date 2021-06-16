console.log('hello from node!');

const { response, request } = require('express');
//use require instead of import. 
//the next two line will ALWAYS look like this
const express = require('express');
const app = express();

//use this to access our .env file
require('dotenv').config();

//allow the front end to access the server  
const cors = require('cors');
app.use(cors());
//make port a global variable
const PORT = process.env.PORT;

//what route our server should be listening for
const weatherData = require('./data/weather.json')

//Tester
app.get('/potato',(request,response)=>{
  response.send('potatoes are delicious!');
});

//Weather
app.get('/weather', (request, response)=>{
  let cityName = request.query.name;
  let cityLon = request.query.lon;
  let cityLat = request.query.lat;

  weatherData.find(idx =>{
    if(cityName.toLowerCase() !== idx.city_name.toLowerCase()){
      response.send('could not find the request')
    }
  })
})

//class Forecast
class Forecast{
  constructor(description,date){
    this.description = description;
    this.date = date;
  }
}

//Forecast
cityForecast = () => {
  weatherData.map(i=>{
    new Forecast(i.description, i.date);
  });
};
cityForecast();

// this /* will listen for anything. PUT IT LAST
app.get('/*', (request, response)=>{
  response.status(404).send('Sorry, We Only Have Information on Seattle, Amman & Paris, Please Try Again!')
});
//tell the server to start listening for requests
app.listen(PORT, () => {console.log(`listening on port ${PORT}`)});