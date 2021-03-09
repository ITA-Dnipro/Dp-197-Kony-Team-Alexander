function TvData(d) {
  var poster = "https://image.tmdb.org/t/p/w200" + d.posterPath;
  var backdrop = "https://image.tmdb.org/t/p/w200" + d.backdropPath;
  
  if (d.duration) {
    var movieDurationHours = Math.trunc(d.duration[0] / 60);
    var movieDurationMinutes = d.duration[0] % 60;
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
  
  if (d.createdBy) {
    var createByList = d.createdBy.map(function(c) { return {id: c.id, name: c.name}; });
    this.createdBy = createByList.length > 0 ? createByList : null;
  }
  
  if (d.firstAirDate) {
    this.released = (new Date(d.firstAirDate)).getFullYear();
  }
 
  this.type = d.type || "Unknown";
  this.id = d.id || "Unknown";
  this.title = d.title || "Unknown";
  this.description = d.description || "Unknown";
  this.genresList = d.genresId || ["Unknown"];
  this.genreNamesList = d.genreNamesList || ["Unknown"];
  this.voteAvg = d.voteAvg || 0;
  this.poster = poster;
  this.backdrop = backdrop;
  this.firstAirDate = d.firstAirDate || "Unknown";
  this.lastAirDate = d.lastAirDate || "-"; 
  this.numOfseasons = d.numOfseasons || "Unknown";
}

