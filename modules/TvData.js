function TvData(d) {
  var poster = "https://image.tmdb.org/t/p/w200/" + d.posterPath;
  var backdrop = "https://image.tmdb.org/t/p/w200/" + d.backdropPath;
  
  if (d.duration) {
    var movieDurationHours = Math.trunc(d.duration[0] / 60);
    var movieDurationMinutes = d.duration[0] % 60;
    var duration;
    
    movieDurationHours > 0 ?
      duration = movieDurationHours + "h " + movieDurationMinutes + "m" :
      duration = movieDurationMinutes + "m";
    
    this.duration = duration;
  } else {
    this.duration = "unknown";
  }

  if (d.countries) {
    var countriesList = d.countries.map(function(c) { return c.name; });
    this.countriesList = countriesList.length > 0 ? countriesList : ["unknown"];
  }
 
  this.type = d.type || "unknown";
  this.id = d.id || "unknown";
  this.title = d.title || "unknown";
  this.description = d.description || "unknown";
  this.genresList = d.genresId || ["unknown"];
  this.genreNamesList = d.genreNamesList || ["unknown"];
  this.voteAvg = d.voteAvg || 0;
  this.poster = poster;
  this.backdrop = backdrop;
  this.createdBy = d.createdBy.map(function(c) { return {id: c.id, name: c.name}; });
  this.firstAirDate = d.firstAirDate || "unknown";
  this.lastAirDate = d.lastAirDate || "-"; 
  this.numOfseasons = d.numOfseasons || "unknown";
}
