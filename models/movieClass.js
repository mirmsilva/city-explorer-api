//class for Movie
class Movie{
  constructor(m){
    this.title = m.movie.title;
    this.overview = m.movie.overview;
    this.vote_average = m.movie.vote_average;
    this.vote_count = m.movie.vote_count;
  }
}

module.exports = Movie;