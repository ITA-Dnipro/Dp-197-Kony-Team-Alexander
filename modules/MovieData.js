function MovieData(id, title, description, genresId, posterPath, voteAvg) {
  var poster = "https://image.tmdb.org/t/p/w200/" + posterPath;
  
  this.id = id || 0;
  this.title = title || 0;
  this.description = description || 0;
  this.genresList = genresId || 0;
  this.voteAvg = voteAvg || 0;
  this.poster = poster || 0;
}
