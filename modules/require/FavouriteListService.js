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
        alert("ok");
        var movieList = response.records.map(function(m) {
          alert(m);
          return{
            id: m.movie_id || "",
            genres: m.movie_genre || "",
            released: m.release_date || "",
            title: m.title || "",
            poster_path: m.poster_path || "",
            media_type: m.media_type || ""
          }; 
        });
        alert("2: " + movieList);
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

  var createFavouriteList = function(userId, movieId, successCB, errorCB) {

    var sdk = kony.sdk.getCurrentInstance();
    var AlexanderMovieListService = sdk.getIntegrationService("AlexDB");
    var headers = null;
    var body = {
      userId: userId,
      movieId: movieId
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

  return {
    getFavouriteMovies: getFavouriteMovies,
    deleteFavouriteList: deleteFavouriteList,
    createFavouriteList: createFavouriteList
  };
});