'use strict';
//imports
let cache = require('./cache.js');
const axios = require('axios');
const Movie = require('../models/movieClass.js');

module.exports = getMovies;

function getMovies(city_name){
  const key = 'movie-' + city_name;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city_name}`;

  if (cache[key] && (Date.now() - cache[key].timestamp < (1000*60*60*24*7))) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
    .then(response => parseMovie(response.data));
  }
  
  return cache[key].data;
}

function parseMovie(movieData) {
  try {
    const movieSummaries = movieData.data.map(m => {
      return new Movie(m);
    });
    return Promise.resolve(movieSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}


// //imports
// const axios = require('axios');
// let cache = require('./cache.js');
// const Movie = require('../models/movieClass.js')

// //Movie 
// let movie = async (req,res)=>{
//   let city = req.query.city_name;

//   let cityMovieData = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`);
//   if(cityMovieData === undefined){
//     res.status(400).send('Uh Oh, Something went wrong');
//   }else{
//     let movieData = cityMovieData.data.results.map(m=>new Movie(m.title, m.overview, m.vote_average, m.vote_count));
//     console.log(movieData);
//     res.send(movieData);
//   }
// }

// //export
// module.exports=movie;
