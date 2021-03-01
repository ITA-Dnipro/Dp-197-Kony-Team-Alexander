function MovieData(d) {
  var poster = "https://image.tmdb.org/t/p/w200/" + d.posterPath;
  var backdrop = "https://image.tmdb.org/t/p/w200/" + d.backdropPath;
  var year = (new Date(d.released)).getFullYear();
  
  if (d.duration) {
    var movieDurationHours = Math.trunc(d.duration / 60);
    var movieDurationMinutes = d.duration % 60;
    var duration;
    
    if (movieDurationHours > 0) {
      if (movieDurationMinutes > 0) {
        duration = movieDurationHours + "h " + movieDurationMinutes + "m";        
      } else {
        duration = movieDurationHours + "h";
      }
    } else {
      duration = movieDurationMinutes + "m";
    }
    
//     movieDurationHours > 0 ?
//       duration = movieDurationHours + "h " + movieDurationMinutes + "m" :
//       duration = movieDurationMinutes + "m";
    
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
  this.voteAvg = d.voteAvg || 0;
  this.poster = poster;
  this.backdrop = backdrop;
  this.genreNamesList = d.genreNamesList || ["unknown"];
  this.released = year || "unknown";  
}
