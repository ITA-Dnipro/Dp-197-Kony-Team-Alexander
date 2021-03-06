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
          type: "movie",
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
  
  var getTvDetails = function(successCallback, errorCallback, id) {
    var TV_DETAILS_URL = "https://api.themoviedb.org/3/tv/" + String(id) + "?api_key=69f776e126f6211fe76798c6c4b786f9&language=en-US";

    makeHttpRequest(TV_DETAILS_URL, function(m) {
      if (m) {
        var tvDetails = new TvData({
          type: "tv",
          id: m.id,
          title: m.name, 
          description: m.overview, 
          countries: m.production_countries, 
          duration: m.episode_run_time.length > 0 ? m.episode_run_time : null, 
          genresId: m.genres.map(function(g) { return g.id; }),
          genreNamesList: m.genres.map(function(g) { return g.name; }),
          voteAvg: m.vote_average, 
          posterPath: m.poster_path,
          backdropPath: m.backdrop_path,
          createdBy: m.created_by,
          numOfseasons: m.number_of_seasons,
          firstAirDate: m.first_air_date, 
          lastAirDate: m.last_air_date, 
        });   

        successCallback(tvDetails);
      }
    }, errorCallback);    
  };

  var getSimilarMovieList = function(successCallback, errorCallback, mId) {
    var SIMILAR_MOVIE_URL = MOVIE_BASE_URL + String(mId) + "/similar?api_key=69f776e126f6211fe76798c6c4b786f9&language=en-US&page=1";

    makeHttpRequest(SIMILAR_MOVIE_URL, function(movies) {
      if (movies.results && Array.isArray(movies.results)) {
        var movieList = movies.results.map(function(m) {
          return new MovieData({
            type: "movie",
            id: m.id,
            title: m.title, 
            description: m.overview, 
            posterPath: m.poster_path
          }); 
        });

        successCallback(movieList);
      }
    }, errorCallback);  
  };
  
  var getSimilarTvList = function(successCallback, errorCallback, mId) {
    var SIMILAR_TV_URL = "https://api.themoviedb.org/3/tv/" + String(mId) + "/similar?api_key=69f776e126f6211fe76798c6c4b786f9&language=en-US&page=1";

    makeHttpRequest(SIMILAR_TV_URL, function(movies) {

      if (movies.results && Array.isArray(movies.results)) {
        var tvList = movies.results.map(function(m) {
          return new TvData({
            type: "tv",
            id: m.id,
            title: m.name, 
            description: m.overview, 
            posterPath: m.poster_path
          });
        });

        successCallback(tvList);
      }
    }, errorCallback);  
  };
  
  var getRecommendedTvList = function(successCallback, errorCallback, mId) {
    var RECOMMENDED_TV_URL = "https://api.themoviedb.org/3/tv/" + String(mId) + "/recommendations?api_key=69f776e126f6211fe76798c6c4b786f9&language=en-US&page=1";

    makeHttpRequest(RECOMMENDED_TV_URL, function(movies) {

      if (movies.results && Array.isArray(movies.results)) {
        var tvList = movies.results.map(function(m) {
          return new TvData({
            type: "tv",
            id: m.id,
            title: m.name, 
            description: m.overview, 
            posterPath: m.poster_path
          });
        });

        successCallback(tvList);
      }
    }, errorCallback);  
  };

  var getRecommendedMovieList = function(successCallback, errorCallback, mId) {
    var SIMILAR_MOVIE_URL = MOVIE_BASE_URL + String(mId) + "/recommendations?api_key=69f776e126f6211fe76798c6c4b786f9&language=en-US&page=1";

    makeHttpRequest(SIMILAR_MOVIE_URL, function(movies) {

      if (movies.results && Array.isArray(movies.results)) {
        var movieList = movies.results.map(function(m) {
          return new MovieData({
            type: "movie",
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
              return new MovieData({
                type: "movie",
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
              return new MovieData({
                type: "movie",
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
  
  var searchPeople = function(successCallback, errorCallback, string) {
    string = string.replace(/\s+/g, " ").replace(/\s+/g, "%20");    

    var SEARCH_PEOPLE_URL = "https://api.themoviedb.org/3/search/person?api_key=69f776e126f6211fe76798c6c4b786f9&language=en-US&query=" + string + "&page=1";

    makeHttpRequest(SEARCH_PEOPLE_URL, function(people) {
      if (people.results && Array.isArray(people.results)) {

        var peopleList = people.results.map(function(p) {
          return {
            type: "person",
            id: p.id,
            name: p.name, 
            knownFor: "Known for: " + p.known_for_department,  
            poster: "https://image.tmdb.org/t/p/w200/" + p.profile_path,       
          }; 
        });

        successCallback(peopleList);
      }
    }, errorCallback); 
  };

  var getMovieCredits = function(successCallback, errorCallback, movieId) {
    var MOVIE_CREDITS_URL = MOVIE_BASE_URL + String(movieId) + "/credits?api_key=69f776e126f6211fe76798c6c4b786f9&language=en-US";

    makeHttpRequest(MOVIE_CREDITS_URL, function(credits) {
      if (credits.cast && credits.crew && Array.isArray(credits.cast) && Array.isArray(credits.crew)) {
        var castList = credits.cast.map(function(c) {
          return {
            id: c.id,
            name: c.name, 
            img: "https://image.tmdb.org/t/p/w200/" + c.profile_path, 
            character: c.character, 
          };
        });

        var director = credits.crew.filter(function(c) {
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
    }, errorCallback);  
  };
  
  var getTvCredits = function(successCallback, errorCallback, movieId) {
    var TV_CREDITS_URL = "https://api.themoviedb.org/3/tv/" + String(movieId) + "/aggregate_credits?api_key=69f776e126f6211fe76798c6c4b786f9&language=en-US";

    makeHttpRequest(TV_CREDITS_URL, function(credits) {
      if (credits.cast && credits.crew && Array.isArray(credits.cast) && Array.isArray(credits.crew)) {
        var castList = credits.cast.map(function(c) {
          return {
            id: c.id,
            name: c.name, 
            img: "https://image.tmdb.org/t/p/w200/" + c.profile_path, 
            character: c.roles.map(function(r){ return r.character; }).join(', '), 
          };
        });

        successCallback({
          cast: castList,
        });
      }
    }, errorCallback);  
  };

  var calculateAge = function(birthday, deathday) {
    var age;
    var ageDifMs;
    var ageDate;

    if (deathday) {
      ageDifMs = new Date(deathday).getTime() - new Date(birthday).getTime();
      ageDate = new Date(ageDifMs);

      age = Math.abs(ageDate.getUTCFullYear() - 1970);
    } else {
      ageDifMs = new Date() - new Date(birthday).getTime();
      ageDate = new Date(ageDifMs);

      age = Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    return age;
  };

  var getPersonInfo = function(successCallback, errorCallback, personId) {
    var PERSON_URL = "https://api.themoviedb.org/3/person/" + String(personId) + "?api_key=69f776e126f6211fe76798c6c4b786f9&language=en-US";

    makeHttpRequest(PERSON_URL, function(personInfo) {
      if (personInfo) {
        var pInfo = {
          name: personInfo.name || "unknown",
          birthday: personInfo.birthday || "unknown",
          placeOfBirth: personInfo.place_of_birth || "unknown",
          deathday: personInfo.deathday,
          age: personInfo.birthday ? calculateAge(personInfo.birthday, personInfo.deathday) : null,
          img: "https://image.tmdb.org/t/p/w200/" + personInfo.profile_path, 
          knownFor: personInfo.known_for_department || "unknown", 
        };

        successCallback(pInfo);
      }
    }, errorCallback); 
  };

  var getPersonCredits = function(successCallback, errorCallback, personId, personRole) {
    var PERSON_URL = "https://api.themoviedb.org/3/person/" + String(personId) + "/combined_credits?api_key=69f776e126f6211fe76798c6c4b786f9&language=en-US";

    makeHttpRequest(PERSON_URL, function(credits) {
      if (credits.cast && credits.crew && Array.isArray(credits.cast) && Array.isArray(credits.crew)) {

        var popularList = [];
        if (personRole === "cast") {
          popularList = credits.cast.sort(function(a, b) {
            return b.popularity - a.popularity;
          }).filter(function(m) { return m.title || m.name; })
            .slice(0, 9)
            .map(function(m) {
            return {
              type: m.media_type,              
              id: m.id,
              name: m.title || m.name, 
              img: "https://image.tmdb.org/t/p/w200/" + m.poster_path, 
              popularity: m.popularity, 
            };
          }); 
        } else {          
          popularList = credits.crew.sort(function(a, b) {
            return b.popularity - a.popularity;
          }).filter(function(m, i, arr) {
              var firstIndex = arr.findIndex(function(el) { return el.id === m.id; });

              if ((m.title || m.name) && firstIndex === i) {
                return m;
              }

            })
            .slice(0, 9)
            .map(function(m) {
            return {
              type: m.media_type,
              id: m.id,
              name: m.title || m.name, 
              img: "https://image.tmdb.org/t/p/w200/" + m.poster_path, 
              popularity: m.popularity, 
            };
          }); 
        }

        var productionList = [];
        var directingList = [];
        var writingList = [];


        for (var i = 0; i < credits.crew.length; i++) {
          switch (credits.crew[i].job) {
            case "Producer": 
            case "Executive Producer": {
              productionList.push(credits.crew[i]);
              break;
            }
            case "Screenplay":
            case "Writer": {
              writingList.push(credits.crew[i]);
              break;              
            }
            case "Director": {
              directingList.push(credits.crew[i]);
              break;  
            } 
          }
        }

        successCallback({
          popularList: popularList,
          actingList: sortMovieList(credits.cast),
          productionList: sortMovieList(productionList),   
          directingList: sortMovieList(directingList),
          writingList: sortMovieList(writingList)
        });
      }
    }, errorCallback);  
  };

  var sortMovieList = function(movieList) {
    var upcomingList = movieList.filter(function(m) { return (m.title || m.name) && !m.release_date && !m.first_air_date; })
    .map(function(m){
      return {
        id: m.id,
        type: m.media_type,
        title: m.title || m.name,
        additionalInfo: m.character || m.job,
        year: "-"
      };
    });

    var mList = movieList.filter(function(m) { return (m.title || m.name) && (m.release_date || m.first_air_date); })
    .sort(function(a, b) {

      var dateAMs = new Date(a.release_date || a.first_air_date).getTime();
      var dateBMs = new Date(b.release_date || b.first_air_date).getTime();

      return dateBMs - dateAMs;
    })
    .map(function(m){
      return {
        type: m.media_type,
        id: m.id,
        title: m.title || m.name,
        additionalInfo: m.character || m.job,
        year: (new Date(m.release_date || m.first_air_date)).getFullYear()
      };
    });

    var sortedMovieList = upcomingList.concat(mList);

    return sortedMovieList;

  };

  return {
    getMovieDetails: getMovieDetails,
    getSimilarMovieList: getSimilarMovieList,  
    getRecommendedMovieList: getRecommendedMovieList,
    getMovieList: getMovieList,
    searchMovie: searchMovie,
    getMovieCredits: getMovieCredits,
    getPersonInfo: getPersonInfo,
    getPersonCredits: getPersonCredits,
    searchPeople: searchPeople,
    getTvDetails: getTvDetails,
    getTvCredits: getTvCredits,
    getSimilarTvList: getSimilarTvList,
    getRecommendedTvList: getRecommendedTvList
  };
});
