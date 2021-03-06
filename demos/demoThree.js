//Node tester
console.log('hello from node!');

const express = require('express');
const app = express();

require('dotenv').config();

const axios =require('axios');

const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT;
//--------------------------------------------------------------

//Tester
app.get('/',(req,res)=>{
  res.send('This is working!');
});

//Get Movie Module
app.get('/', demo-routeHandlers.getPictures);

//Moved to module get picture
//class for Movie
// class Movie{
//   constructor(title, overview, vote_average, vote_count){
//     this.title = title;
//     this.overview = overview;
//     this.vote_average = vote_average;
//     this.vote_count = vote_count;
//   }
// }
//use lat & lon to get weather info from API
//make async


//Movie 
// app.get('/movie', async (req,res)=>{
//   let city = req.query.city_name;

//   let cityMovieData = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`);
//   if(cityMovieData === undefined){
//     res.status(400).send('Uh Oh, Something went wrong');
//   }else{
//     // console.log(cityMovieData.data);
//     let movieData = cityMovieData.data.results.map(m=>new Movie(m.title, m.overview, m.vote_average, m.vote_count));
//     console.log(movieData);
//     res.send(movieData);
//   }
// })


//Catch All Error Message
app.get('/*', (request, response)=>{
  response.status(404).send('Hmm...Something Went Wrong!')
});
//tell the server to start listening for requests
app.listen(PORT, () => {console.log(`listening on port ${PORT}`)});