//Node tester
console.log('hello from node!');

const express = require('express');
const app = express();

require('dotenv').config();

const cors = require('cors');

//import weather & movie
const weather = require('./routeHandlers/weatherData.js');
const movie = require('./routeHandlers/movieData.js');
app.use(cors());

const PORT = process.env.PORT;

//--------------------------------------------------------------

//tester
app.get('/',(req,res)=>{
  res.send('This is working!');});

//get weather & movie
app.get('/weather', weatherHandler);

function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  weather(lat, lon)
  .then(summaries => response.send(summaries))
  .catch((error) => {
    console.error(error);
    response.status(200).send('Sorry. Something went wrong while we fetched the weather!')
  });
}  

app.get('/movie', movieHandler);

function movieHandler(request, response) {
  const { city_name } = request.query;
  movie(city_name)
  .then(summaries => response.send(summaries))
  .catch((error) => {
    console.error(error);
    response.status(200).send('Sorry. Something went wrong while we fetched the movie info!')
  });
}  

//catch all error message
app.get('/*', (req, res)=>{
  res.status(404).send('Hmm...Something Went Wrong!')
});

//listener
app.listen(PORT, () => {console.log(`listening on port ${PORT}`)});