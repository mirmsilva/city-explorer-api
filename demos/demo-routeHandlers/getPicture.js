const axios = require('axios');
const Movie = require ('../demo-models/Pictures');
// class Movie{
//   constructor(title, overview, vote_average, vote_count){
//     this.title = title;
//     this.overview = overview;
//     this.vote_average = vote_average;
//     this.vote_count = vote_count;
//   }
// }

app.get('/movie', async (req,res)=>{
  let city = req.query.city_name;
  let cityMovieData = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`);
  if(cityMovieData === undefined){
    res.status(400).send('Uh Oh, Something went wrong');
  }else{
    // console.log(cityMovieData.data);
    let movieData = cityMovieData.data.results.map(data=>new Movie(data));
    console.log(movieData);
    res.send(movieData);
  }
})

//this line means, when someone requires this file, give them the get pictures function
module.exports = getPictures;