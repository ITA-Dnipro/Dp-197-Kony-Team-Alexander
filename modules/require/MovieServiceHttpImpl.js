define(function (movieId) {
  var MOVIE_BASE_URL = "https://api.themoviedb.org/3/movie/";
  var MOVIE_DETAILS_URL = MOVIE_BASE_URL + "508442" +  "?api_key=69f776e126f6211fe76798c6c4b786f9&language=en-US";
//   var MOVIE_DETAILS_URL = MOVIE_BASE_URL + movieId +  "?api_key=69f776e126f6211fe76798c6c4b786f9&language=en-US";
  var SIMILAR_MOVIE_URL = MOVIE_BASE_URL + "508442" +  "/similar?api_key=69f776e126f6211fe76798c6c4b786f9&language=en-US&page=1";
//   var SIMILAR_MOVIE_URL = MOVIE_BASE_URL + movieId +  "/similar?api_key=69f776e126f6211fe76798c6c4b786f9&language=en-US&page=1";
  
  var makeHttpRequest = function(url, successCallback, errorCallback) {
    kony.application.showLoadingScreen();
    
    var httpClient = new kony.net.HttpRequest();
    
    httpClient.open(constants.HTTP_METHOD_GET, url);
    httpClient.onReadyStateChange = function() {
      if(httpClient.readyState !== constants.HTTP_READY_STATE_DONE) {
        return;
      }
      
      if (httpClient.status === HttpResponseCode.OK) {
        successCallback(httpClient.response);
      } else {
        errorCallback(httpClient.response);
      }
    };

    httpClient.send();
  }
  
  var movieDetails = {};
  
  var getMovieDetails = function(successCallback, errorCallback) {
      makeHttpRequest(MOVIE_DETAILS_URL, function(m) {
      if (m) {
        // title, description, countriesList, duration, released, genresList, voteAvg, poster, backdrop
        movieDetails = new MovieDetailsData(
          m.title, 
          m.overview, 
          m.production_countries, 
          m.runtime, 
          m.release_date, 
          m.genres, 
          m.vote_average, 
          m.poster_path,
          m.backdrop_path);   
        alert("success service \n" + JSON.stringify(movieDetails));
        successCallback(movieDetails);
      }
    }, errorCallback);    
  };
   
  return {
    getMovieDetails: getMovieDetails,
    getSimilarMovieList: getMovieDetails,        
  };
});
