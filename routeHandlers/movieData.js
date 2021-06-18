//import axios
const axios = require('axios');

//import classes
const Movie = require('../models/Movie.js')

//Movie 
app.get('/movie', async (req,res)=>{
  let city = req.query.city_name;

  let cityMovieData = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`);
  if(cityMovieData === undefined){
    res.status(400).send('Uh Oh, Something went wrong');
  }else{
    let movieData = cityMovieData.data.results.map(m=>new Movie(m.title, m.overview, m.vote_average, m.vote_count));
    console.log(movieData);
    res.send(movieData);
  }
})

//export
module.exports={movie};