function MovieDetailsData(title, description, countries, duration, released, genres, voteAvg, posterPath, backdropPath) {
  var movieDurationHours = Math.trunc(duration / 60);
  var movieDurationMinutes = duration % 60;
  var countriesList = countries.map(function(c) { return c.name; });
  var year = (new Date(released)).getFullYear();
  var genresList = genres.map(function(g) { return g.name; });
  var poster = "https://image.tmdb.org/t/p/w200/" + posterPath;
  var backdrop = "https://image.tmdb.org/t/p/w200/" + backdropPath;
  
  this.title = title || 0;
  this.description = description || 0;
  this.countriesList = countriesList || 0;
  this.released = year || 0;
  this.genresList = genresList || 0;
  this.voteAvg = voteAvg || 0;
  this.poster = poster || 0;
  this.backdrop = backdrop || 0;
  this.duration = movieDurationHours + "h " + movieDurationMinutes + "m" || 0;
}