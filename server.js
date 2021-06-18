//Node tester
console.log('hello from node!');

const express = require('express');
const app = express();

require('dotenv').config();

const cors = require('cors');
const { weather } = require('./routeHandlers/weatherData');
const { movie } = require('./routeHandlers/movieData');
app.use(cors());

const PORT = process.env.PORT;

//--------------------------------------------------------------

//Tester
app.get('/',(req,res)=>{
  res.send('This is working!');
});

//get data from routeHandler
app.get('/weather', weather);
app.get('/movie', movie);

//Catch All Error Message
app.get('/*', (request, response)=>{
  response.status(404).send('Hmm...Something Went Wrong!')
});
//tell the server to start listening for requests
app.listen(PORT, () => {console.log(`listening on port ${PORT}`)});