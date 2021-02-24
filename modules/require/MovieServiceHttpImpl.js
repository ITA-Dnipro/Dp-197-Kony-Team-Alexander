define(function () {
  var MOVIE_BASE_URL = "https://api.themoviedb.org/3/movie/";
  var SEARCH_BASE_URL = "https://api.themoviedb.org/3/search/movie";
  var API_KEY = "?api_key=69f776e126f6211fe76798c6c4b786f9";


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
  };
  
  var getMovieDetails = function(successCallback, errorCallback, id) {
    
    var MOVIE_DETAILS_URL = MOVIE_BASE_URL + String(id) + "?api_key=69f776e126f6211fe76798c6c4b786f9&language=en-US";
    
    makeHttpRequest(MOVIE_DETAILS_URL, function(m) {
      if (m) {
        var movieDetails = new MovieData({
          id: m.id,
          title: m.title, 
          description: m.overview, 
          countries: m.production_countries, 
          duration: m.runtime, 
          released: m.release_date, 
          genresId: m.genres.map(function(g) { return g.id; }),
          genreNamesList: m.genres.map(function(g) { return g.name; }),
          voteAvg: m.vote_average, 
          posterPath: m.poster_path,
          backdropPath: m.backdrop_path
        });   

        successCallback(movieDetails);
      }
    }, errorCallback);    
  };
  
  var getSimilarMovieList = function(successCallback, errorCallback, mId) {
    var SIMILAR_MOVIE_URL = MOVIE_BASE_URL + String(mId) + "/similar?api_key=69f776e126f6211fe76798c6c4b786f9&language=en-US&page=1";
    
    makeHttpRequest(SIMILAR_MOVIE_URL, function(movies) {
      if (movies.results && Array.isArray(movies.results)) {
        var movieList = movies.results.map(function(m) {
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
    }, errorCallback);  
  };
  
   var getRecommendedMovieList = function(successCallback, errorCallback, mId) {
    var SIMILAR_MOVIE_URL = MOVIE_BASE_URL + String(mId) + "/recommendations?api_key=69f776e126f6211fe76798c6c4b786f9&language=en-US&page=1";
    
    makeHttpRequest(SIMILAR_MOVIE_URL, function(movies) {
      if (movies.results && Array.isArray(movies.results)) {
        var movieList = movies.results.map(function(m) {
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
              // id, title, description, genresId, posterPath, voteAvg, released, genreNamesList
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
        }, errorCallback); 
      }      
    }, function(){
      alert("Error while retrieving genres list");
    });     
  };
   
  var searchMovie = function(successCallback, errorCallback, string) {
    string = string.replace(/\s+/g, " ").replace(/\s+/g, "%20");
    
    var SEARCH_MOVIE_URL = SEARCH_BASE_URL + API_KEY + "&language=en-US&query=" + string + "&page=1";
    
    loadGenreList(function(genreData){
      if (genreData && Array.isArray(genreData)) {
        makeHttpRequest(SEARCH_MOVIE_URL, function(movies) {
          if (movies.results && Array.isArray(movies.results)) {

            var movieList = movies.results.map(function(m) {
              // id, title, description, genresId, posterPath, voteAvg, released, genreNamesList
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
        }, errorCallback); 
      }      
    }, function(){
      alert("Error while retrieving genres list");
    });     
  };
  
  var getMovieCredits = function(successCallback, errorCallback, movieId) {
    var MOVIE_CREDITS_URL = MOVIE_BASE_URL + String(movieId) + "/credits?api_key=69f776e126f6211fe76798c6c4b786f9&language=en-US";
    
    makeHttpRequest(MOVIE_CREDITS_URL, function(credits) {
      if (credits.cast && credits.crew && Array.isArray(credits.cast) && Array.isArray(credits.crew)) {
        var castList = credits.cast.map(function(c) {
          return {
            id: c.id,
            name: c.original_name, 
            img: "https://image.tmdb.org/t/p/w200/" + c.profile_path, 
            character: c.character, 
          }
        });
          
        var director = credits.crew.filter(function(c) {
          if (c.job === "Director") {
            return {
              id: c.id,
              name: c.name
            }
          }
        });
         
        successCallback({
          cast: castList,
          director: director.length > 0 ? director : ["unknown"] 
        });
      }
    }, errorCallback);  
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
