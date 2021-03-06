function MovieData(d) {
  var poster = "https://image.tmdb.org/t/p/w200/" + d.posterPath;
  var backdrop = "https://image.tmdb.org/t/p/w200/" + d.backdropPath;
  var year = (new Date(d.released)).getFullYear();
  
  if (d.duration) {
    var movieDurationHours = Math.trunc(d.duration / 60);
    var movieDurationMinutes = d.duration % 60;
    var duration;
    
    switch (true) {
      case movieDurationHours > 0 && movieDurationMinutes > 0: {
        duration = movieDurationHours + "h " + movieDurationMinutes + "m";  
        break;
      }
      case movieDurationHours > 0 && movieDurationMinutes === 0: {
        duration = movieDurationHours + "h";
        break;
      }
      case movieDurationHours === 0 && movieDurationMinutes > 0: {
        duration = movieDurationMinutes + "m";
        break;
      }
    }
    
    this.duration = duration;
  } else {
    this.duration = "Unknown";
  }

  if (d.countries) {
    var countriesList = d.countries.map(function(c) { return c.name; });
    this.countriesList = countriesList.length > 0 ? countriesList : ["Unknown"];
  }
 
  this.type = d.type || "Unknown";
  this.id = d.id || "Unknown";
  this.title = d.title || "Unknown";
  this.description = d.description || "Unknown";
  this.genresList = d.genresId || ["Unknown"];
  this.voteAvg = d.voteAvg || 0;
  this.poster = poster;
  this.backdrop = backdrop;
  this.genreNamesList = d.genreNamesList || ["Unknown"];
  this.released = year || "Unknown";  
}
