define(function () {
  var loadGenreList = function(successCallback, errorCallback) {
    var sdk = kony.sdk.getCurrentInstance();
    var AlexanderMovieListService = sdk.getIntegrationService("TMDB_API");
    var headers = null;
    var body = {};
    AlexanderMovieListService.invokeOperation("getGenreList", headers, body, function(response) {
      if (successCallback) {
        successCallback(response.genres);
      }
    }, function(error) {

      if (errorCallback) {
        errorCallback(error);
      }
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
    var body = {category: url};
    loadGenreList(function(genreData){
      AlexanderMovieListService.invokeOperation("getMovieList", headers, body, function(response) {

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
              genreNamesList: getGenreNameById(genreData, m.genre_ids)
            }); 
          });
          successCallback(movieList);
        }
      }, function(error) {
        if (errorCallback) {
          errorCallback(error);
        }
      });
    }, function(){
      alert("Error while retrieving genres list");
    });   
  };

  var searchMovie = function(successCallback, errorCallback, string) {
    var sdk = kony.sdk.getCurrentInstance();
    var AlexanderMovieListService = sdk.getIntegrationService("TMDB_API");
    var headers = null;
    var body = { query: string };
    loadGenreList(function(genreData){
      AlexanderMovieListService.invokeOperation("searchMovie", headers, body, function(response) {

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
              genreNamesList: getGenreNameById(genreData, m.genre_ids)
            }); 
          });
          successCallback(movieList);
        }
      }, function(error) {

        if (errorCallback) {
          errorCallback(error);
        }
      });
    }, function(){
      alert("Error while retrieving genres list");
    });   
  };

  var getMovieDetails = function(successCallback, errorCallback, id) {
    var sdk = kony.sdk.getCurrentInstance();
    var AlexanderMovieListService = sdk.getIntegrationService("TMDB_API");
    var headers = null;
    var body = { movieId: id };
    AlexanderMovieListService.invokeOperation("getMovieDetails", headers, body, function(response) {

      if (successCallback) {
        var movieDetails = new MovieData({
          id: response.all.id,
          title: response.all.title, 
          description: response.all.overview, 
          countries: response.all.production_countries, 
          duration: response.all.runtime, 
          released: response.all.release_date, 
          genresId: response.all.genres.map(function(g) { return g.id; }),
          genreNamesList: response.all.genres.map(function(g) { return g.name; }),
          voteAvg: response.all.vote_average, 
          posterPath: response.all.poster_path,
          backdropPath: response.all.backdrop_path
        });   
        successCallback(movieDetails);

      }
    }, function(error) {
      if (errorCallback) {
        errorCallback(error);
      }
    });   
  };

  var getSimilarMovieList = function(successCallback, errorCallback, mId) {
    var sdk = kony.sdk.getCurrentInstance();
    var AlexanderMovieListService = sdk.getIntegrationService("TMDB_API");
    var headers = null;
    var body = { id: mId };
    AlexanderMovieListService.invokeOperation("getSimilarMovieList", headers, body, function(response) {
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
          }); 
        });
        successCallback(movieList);
      }
    }, function(error) {
      if (errorCallback) {
        errorCallback(error);
      }
    }); 
  };

  var getMovieCredits = function(successCallback, errorCallback, movieId) {
    var sdk = kony.sdk.getCurrentInstance();
    var AlexanderMovieListService = sdk.getIntegrationService("TMDB_API");
    var headers = null;
    var body = { movieId: movieId };
    AlexanderMovieListService.invokeOperation("getMovieCredits", headers, body, function(response) {
      if (successCallback) {
        var castList = response.cast.map(function(c) {
          return {
            id: c.id,
            name: c.name, 
            img: "https://image.tmdb.org/t/p/w200/" + c.profile_path, 
            character: c.character
          };
        });

        var director = response.crew.filter(function(c) {
          if (c.job === "Director") {
            return {
              id: c.id,
              name: c.name
            };
          }
        });

        successCallback({
          cast: castList,
          director: director.length > 0 ? director : ["unknown"] 
        });
      }
    }, function(error) {
      if (errorCallback) {
        errorCallback(error);
      }
    });
  };

  var getRecommendedMovieList = function(successCallback, errorCallback, mId) {
    var sdk = kony.sdk.getCurrentInstance();
    var AlexanderMovieListService = sdk.getIntegrationService("TMDB_API");
    var headers = null;
    var body = { id: mId };
    AlexanderMovieListService.invokeOperation("getRecommendedMovieList", headers, body, function(response) {
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
          }); 
        });
        successCallback(movieList);
      }
    }, function(error) {
      if (errorCallback) {
        errorCallback(error);
      }
    }); 
  };

  return {
    getMovieDetails: getMovieDetails,
    getSimilarMovieList: getSimilarMovieList,
    getRecommendedMovieList: getRecommendedMovieList,
    getMovieList: getMovieList,
    searchMovie: searchMovie,
    getMovieCredits: getMovieCredits
  };
});