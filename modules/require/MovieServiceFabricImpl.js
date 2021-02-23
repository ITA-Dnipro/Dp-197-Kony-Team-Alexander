define(function () {
  var loadGenreList = function() {
    var sdk = kony.sdk.getCurrentInstance();
    var AlexanderMovieListService = sdk.getIntegrationService("TMDB_API");
    var headers = null;
    var body = {};
    AlexanderMovieListService.invokeOperation("getGenreList", headers, body, function(response) {
      kony.print("Integration Service Response is: " + JSON.stringify(response));
      var genres = response.genres;
      return genres;
    });
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
    var sdk = kony.sdk.getCurrentInstance();
    var AlexanderMovieListService = sdk.getIntegrationService("TMDB_API");
    var headers = null;
    var body = {query: url};
    AlexanderMovieListService.invokeOperation("getMovieList", headers, body, function(response) {
      kony.print("Integration Service Response is: " + JSON.stringify(response));
      
       if (successCallback) {
        var movieList = response.results.map(function(m) {
          return new MovieData({
            id: m.id,
            title: m.title, 
            description: m.overview, 
            genresId: m.genre_ids, 
            posterPath: m.poster_path,
            voteAvg: m.vote_average,
            released: m.release_date,
            genreNamesList: getGenreNameById(loadGenreList(), m.genre_ids)
          }); 
        });
        successCallback(movieList);
      }
    }, function(error) {
      kony.print("Integration Service Failure:" + JSON.stringify(error));
      
      if (errorCallback) {
        errorCallback(error);
      }
    });
  };
  
  var searchMovie = function(successCallback, errorCallback, string) {
    var sdk = kony.sdk.getCurrentInstance();
    var AlexanderMovieListService = sdk.getIntegrationService("TMDB_API");
    var headers = null;
    var body = {
      query: string
    };
    AlexanderMovieListService.invokeOperation("searchMovie", headers, body, function(response) {
      kony.print("Integration Service Response is: " + JSON.stringify(response));

      if (successCallback) {
        var movieList = response.results.map(function(m) {
          return new MovieData({
            id: m.id,
            title: m.title, 
            description: m.overview, 
            genresId: m.genre_ids, 
            posterPath: m.poster_path,
            voteAvg: m.vote_average,
            released: m.release_date,
            genreNamesList: getGenreNameById(loadGenreList(), m.genre_ids)
          }); 
        });
        successCallback(movieList);
      }
    }, function(error) {
      kony.print("Integration Service Failure:" + JSON.stringify(error));

      if (errorCallback) {
        errorCallback(error);
      }
    });
  };

  return {
//     getMovieDetails: getMovieDetails,
//     getSimilarMovieList: getSimilarMovieList,   
    getMovieList: getMovieList,
    searchMovie: searchMovie,
//     getMovieCredits: getMovieCredits
  };
});
