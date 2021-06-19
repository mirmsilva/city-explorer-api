'use strict';
//imports

const axios = require ('axios');
const { response } = require('express');
const Movie = require('../models/movieClass.js');
let cache = require('./cache.js');

function getMovies (request, response){
  const city = request.query.city_name;

  //check if info is in cache
  if(cache[city] && Date.now() - cache[city].timestamp < (1000*60*60*24*5)){
    response.send(cache[city].movies);
    //if not in the cache then
  }else{
    const url = (`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`);

    axios.get(url)
    .then(res => {
      const movieData = res.data.results.map(m => new Movie(m.title, m.overview, m.vote_average, m.vote_count));
      cache[city] ={
        timestamp:Date.now(),
        movies:movieData
      };
      response.status(200).send(movieData);
    })
    .catch(err =>{
      console.log('error', err);
      response.status(500).send('error', err);
    });
  }
}


// //export
module.exports= getMovies;
