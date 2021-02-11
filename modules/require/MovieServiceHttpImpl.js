define(function () {
  var MOVIE_BASE_URL = "https://api.themoviedb.org/3/movie/";

  var makeHttpRequest = function(url, successCallback, errorCallback) {
    
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
  
  var getMovieDetails = function(successCallback, errorCallback, id) {
    
    var MOVIE_DETAILS_URL = MOVIE_BASE_URL + String(id) + "?api_key=69f776e126f6211fe76798c6c4b786f9&language=en-US";
    
    makeHttpRequest(MOVIE_DETAILS_URL, function(m) {
      if (m) {
        var movieDetails = new MovieDetailsData(
          m.title, 
          m.overview, 
          m.production_countries, 
          m.runtime, 
          m.release_date, 
          m.genres, 
          m.vote_average, 
          m.poster_path,
          m.backdrop_path
        );   

        successCallback(movieDetails);
      }
    }, errorCallback);    
  };
  
  var getSimilarMovieList = function(successCallback, errorCallback, mId) {
    var SIMILAR_MOVIE_URL = MOVIE_BASE_URL + String(mId) + "/similar?api_key=69f776e126f6211fe76798c6c4b786f9&language=en-US&page=1";
    
    makeHttpRequest(SIMILAR_MOVIE_URL, function(movies) {
      if (movies.results && Array.isArray(movies.results)) {
        var movieList = movies.results.map(function(m) {
          return new MovieData(
            m.id,
            m.title, 
            m.overview, 
            m.genre_ids, 
            m.poster_path,
            m.vote_average, 
          ); 
        });
         
        successCallback(movieList);
      }
    }, errorCallback);  
  };
      
  var loadGenreList = function(successCallback, errorCallback) {
    var GENRE_URL = "https://api.themoviedb.org/3/genre/movie/list?api_key=69f776e126f6211fe76798c6c4b786f9&language=en-US";
    
     makeHttpRequest(GENRE_URL, function(genresList) {
      if (genresList.genres && Array.isArray(genresList.genres)) {
        successCallback(genresList.genres);
      }      
     }, errorCallback);
  };
 
  var getGenreNameById = function(allGenreList, currGenreList) {
    var currGenres = allGenreList.filter(function(obj){
      return currGenreList.indexOf(obj.id) !== -1;
    });
    
    return currGenres.map(function(obj){
      return obj.name;
    });
  };
      
  var getMovieList = function(successCallback, errorCallback, url) {
    var MOVIE_LIST_URL = MOVIE_BASE_URL + url + "?api_key=69f776e126f6211fe76798c6c4b786f9&language=en-US&page=1";
    
    loadGenreList(function(genreData){
      if (genreData && Array.isArray(genreData)) {
        makeHttpRequest(MOVIE_LIST_URL, function(movies) {
          if (movies.results && Array.isArray(movies.results)) {

            var movieList = movies.results.map(function(m) {
              return new MovieData(
                m.id,
                m.title, 
                m.overview, 
                m.genre_ids, 
                m.poster_path,
                m.vote_average,
                m.release_date,
                getGenreNameById(genreData, m.genre_ids)
              ); 
            });

            successCallback(movieList);
          }
        }, errorCallback); 
      }      
    }, function(){
      alert("Error while retrieving genres list");
    });
    
     
  };
   
  return {
    getMovieDetails: getMovieDetails,
    getSimilarMovieList: getSimilarMovieList,   
    getMovieList: getMovieList
  };
});
