function MovieData(id, title, description, genresId, posterPath, voteAvg, release_date, genreNamesList) {
  var poster = "https://image.tmdb.org/t/p/w200/" + posterPath;
  var year = release_date.slice(0,4);
  
  this.id = id || 0;
  this.title = title || 0;
  this.description = description || 0;
  this.genresList = genresId || 0;
  this.voteAvg = voteAvg || 0;
  this.poster = poster || 0;
  this.year = year || 0;
  this.genreNamesList = genreNamesList || 0;
}
