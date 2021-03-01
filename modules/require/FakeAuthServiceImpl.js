define(["FavouriteListService"], function (fabricImpl) {
  var checkUser = function(login, password, successCB, errorCB) {

    var users = [];

    if (JSON.parse(kony.store.getItem("users"))) {
      users = JSON.parse(kony.store.getItem("users"));
    }

    var matchedUsers = users.filter(function(u) { 
      return u.login === login && u.password === password; 
    });

    var callback = null;

    if (matchedUsers.length > 0) {
      callback = successCB;
    } else {
      callback = errorCB;
    }

    return callback();

  };

  var registerUser = function(fullName, login, password, cnPassword, successCB, errorCB) {
    
    var users = [];
    
    if (JSON.parse(kony.store.getItem("users"))) {
      users = JSON.parse(kony.store.getItem("users"));
    }

    var matchedUsers = users.filter(function(u) { 
      return u.login === login;  
    });
    
    var callback = null;

    if (matchedUsers.length > 0) {
      callback = errorCB;
    } else {
      var user = {login: login, password: password, fullName: fullName, id: Math.round(Math.random() * 1000)};
      users.push(user);
      kony.store.clear();
      kony.store.setItem("users", JSON.stringify(users));
      callback = successCB;
    }

    return callback();

  };
  
  var toggleMovieFavorites = function(movieId) {
    
    var indexMovieInFavorite = database.map(function(m){
      return m.movieId;
    }).indexOf(movieId);  

    if (indexMovieInFavorite !== -1) {
      var firstArr = database.slice(0, indexMovieInFavorite);
      var secondArr = database.slice(indexMovieInFavorite - 1, database.length - 1);
      database = firstArr.concat(secondArr);
    } else {
      database.push({
        userId: UserId,
        movieId: movieId
      });    
    }
  };
  
  var isMovieInFavoriteList = function(movieId, successCB) {
    fabricImpl.getFavouriteMovies(UserId, function(movieList) {
      var movieInFavorite = movieList.find(function(m) {
        return Number(movieId) === Number(m.id); 
      });
      successCB(Boolean(movieInFavorite));
    }, function() {
      alert("Error while retrieving favourite list");
    });
  };

  return {
    checkUser: checkUser,
    registerUser: registerUser,
    toggleMovieFavorites: toggleMovieFavorites,
    isMovieInFavoriteList: isMovieInFavoriteList
  };
});