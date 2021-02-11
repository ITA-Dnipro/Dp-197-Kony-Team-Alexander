function MovieData(d) {
  var poster = "https://image.tmdb.org/t/p/w200/" + d.posterPath;
  var backdrop = "https://image.tmdb.org/t/p/w200/" + d.backdropPath;
  var year = (new Date(d.released)).getFullYear();
  
  if (d.duration) {
    var movieDurationHours = Math.trunc(d.duration / 60);
    var movieDurationMinutes = d.duration % 60;
    this.duration = movieDurationHours + "h " + movieDurationMinutes + "m" || 0;
  }
  
  if (d.countries) {
    var countriesList = d.countries.map(function(c) { return c.name; });
    this.countriesList = countriesList || 0;
  }
 
  this.id = d.id || 0;
  this.title = d.title || 0;
  this.description = d.description || 0;
  this.genresList = d.genresId || 0;
  this.voteAvg = d.voteAvg || 0;
  this.poster = poster || 0;
  this.backdrop = backdrop || 0;
  this.genreNamesList = d.genreNamesList || 0;
  this.released = year || 0;  
  
}
