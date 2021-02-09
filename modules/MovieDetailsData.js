function MovieDetailsData(title, description, countriesList, duration, released, genresList, voteAvg, poster, backdrop) {
  var movieDurationHours = Math.trunc(duration / 60);
  var movieDurationMinutes = duration % 60;
  
  this.title = title || 0;
  this.description = description || 0;
  this.countriesList = countriesList || 0;
  this.duration = movieDurationHours + "h " + movieDurationMinutes + "m" || 0;
  this.released = (new Date(released)).getFullYear() || 0;
  this.genresList = genresList.map(function(g) { return g.name; }) || 0;
  this.voteAvg = voteAvg || 0;
  this.poster = "https://image.tmdb.org/t/p/w200/" + poster || 0;
  this.backdrop = "https://image.tmdb.org/t/p/w200/" + backdrop || 0;
}