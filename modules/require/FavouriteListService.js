define(function () {
  var getFavouriteMovies = function(userId, successCB, errorCB) {

    var sdk = kony.sdk.getCurrentInstance();
    var AlexanderMovieListService = sdk.getIntegrationService("AlexDB");
    var headers = null;
    var body = {
      userId: userId
    };
    AlexanderMovieListService.invokeOperation("getFavouriteMovies", headers, body, function(response) {
      if (successCB) {
        var movieList = response.records.map(function(m) {
          return{
            dbId: m.id,
            id: m.movie_id || "",
            genres: m.movie_genre || "",
            released: m.release_date || "",
            title: m.title || "",
            poster_path: m.poster_path || "",
            type: m.media_type || ""
          }; 
        });
        successCB(movieList);
      }
    }, function(error) {
      if (errorCB) {
        errorCB(error);
      }
    });
  };

  var deleteFavouriteList = function(id, successCB, errorCB) {

    var sdk = kony.sdk.getCurrentInstance();
    var AlexanderMovieListService = sdk.getIntegrationService("AlexDB");
    var headers = null;
    var body = {
      id: id
    };
    AlexanderMovieListService.invokeOperation("deleteFavouriteList", headers, body, function() {
      if (successCB) {
        successCB();
      }
    }, function(error) {
      if (errorCB) {
        errorCB(error);
      }
    });
  };

  var createFavouriteList = function(userId, movieDetails, successCB, errorCB) {

    var sdk = kony.sdk.getCurrentInstance();
    var AlexanderMovieListService = sdk.getIntegrationService("AlexDB");
    var headers = null;
    var body = {
      user_id: userId,
      movie_id: movieDetails.id,
      movie_genre: movieDetails.genreNamesList.join(", "),
      release_date: movieDetails.released || (new Date(movieDetails.firstAirDate)).getFullYear(),
      title: movieDetails.title,
      poster_path:  movieDetails.poster,
      media_type: movieDetails.type || "movie"
    };
    AlexanderMovieListService.invokeOperation("createFavouriteList", headers, body, function() {
      if (successCB) {
        successCB();
      }
    }, function(error) {
      if (errorCB) {
        errorCB(error);
      }
    });
  };
  
  var isMovieInFavoriteList = function(movieId, successCB) {
    getFavouriteMovies(UserId, function(movieList) {
      var movieInFavorite = movieList.find(function(m) {
        return Number(movieId) === Number(m.id); 
      });
      successCB(Boolean(movieInFavorite));
    }, function() {
      alert("Error while retrieving favourite list");
    });
  };

  return {
    isMovieInFavoriteList: isMovieInFavoriteList,
    getFavouriteMovies: getFavouriteMovies,
    deleteFavouriteList: deleteFavouriteList,
    createFavouriteList: createFavouriteList
  };
});