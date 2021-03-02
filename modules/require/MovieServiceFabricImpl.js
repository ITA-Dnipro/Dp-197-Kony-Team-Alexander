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
              type: "movie",
              id: m.id,
              title: m.title, 
              posterPath: m.poster_path,
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
              type: "movie",
              id: m.id,
              title: m.title, 
              posterPath: m.poster_path,
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

  var searchPeople = function(successCallback, errorCallback, string) {
    var sdk = kony.sdk.getCurrentInstance();
    var AlexanderMovieListService = sdk.getIntegrationService("TMDB_API");
    var headers = null;
    var body = { query: string };
    AlexanderMovieListService.invokeOperation("searchPeople", headers, body, function(response) {
      if (successCallback) {
        var movieList = response.results.map(function(p) {
          return {
            type: "person",
            id: p.id,
            name: p.name, 
            knownFor: "Known for: " + p.known_for_department,  
            poster: "https://image.tmdb.org/t/p/w200/" + p.profile_path,       
          }; 
        });
        successCallback(movieList);
      }
    }, function(error) {
      if (errorCallback) {
        errorCallback(error);
      }
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
          type: "movie",
          id: response.id,
          title: response.title, 
          description: response.overview, 
          countries: response.production_countries, 
          duration: response.runtime, 
          released: response.release_date, 
          genresId: response.genres.map(function(g) { return g.id; }),
          genreNamesList: response.genres.map(function(g) { return g.name; }),
          voteAvg: response.vote_average, 
          posterPath: response.poster_path,
          backdropPath: response.backdrop_path
        });   

        successCallback(movieDetails);

      }
    }, function(error) {
      if (errorCallback) {
        errorCallback(error);
      }
    });   
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
  
  var getPersonInfo = function(successCallback, errorCallback, id) {
    var sdk = kony.sdk.getCurrentInstance();
    var AlexanderMovieListService = sdk.getIntegrationService("TMDB_API");
    var headers = null;
    var body = { personId: id };

    AlexanderMovieListService.invokeOperation("getPersonInfo", headers, body, function(response) {
      if (successCallback) {
        var personInfo = {         
          name: response.name || "unknown",
          birthday: response.birthday || "unknown",
          placeOfBirth: response.place_of_birth || "unknown",
          deathday: response.deathday,
          age: response.birthday ? calculateAge(response.birthday, response.deathday) : null,
          img: "https://image.tmdb.org/t/p/w200/" + response.profile_path, 
          knownFor: response.known_for_department || "unknown", 
        };   

        successCallback(personInfo);
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
            type: "movie",
            id: m.id,
            title: m.title, 
            description: m.overview,
            posterPath: m.poster_path
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
   
        var director = [];
        if (response.crew) {
          director = response.crew;
        }

        successCallback({
          cast: castList,
          director: director
        });
      }
    }, function(error) {
      if (errorCallback) {
        errorCallback(error);
      }
    });
  };
  
  var getPersonCredits = function(successCallback, errorCallback, personId, personRole) {
    var sdk = kony.sdk.getCurrentInstance();
    var AlexanderMovieListService = sdk.getIntegrationService("TMDB_API");
    var headers = null;
    var body = { personId: personId };
    AlexanderMovieListService.invokeOperation("getPersonCredits", headers, body, function(response) {
      if (successCallback) { 
        var newCast = response.cast.map(function(i){
          return i.itemCast;
        });
        
        var newCrew = response.crew.map(function(i){
          return i.itemCrew;
        });
        
        var popularList = [];
        if (personRole === "cast") {
          
          popularList = newCast.filter(function(m) { return m.title || m.name; })
            .sort(function(a, b) {
            
            return b.vote_count - a.vote_count;
//             return b.popularity - a.popularity;
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
        } else {          
          popularList = newCrew.filter(function(m, i, arr) {
              var firstIndex = arr.findIndex(function(el) { return el.id === m.id; });

              if ((m.title || m.name) && firstIndex === i) {
                return m;
              }
            })
            .sort(function(a, b) {
             return b.vote_count - a.vote_count;
            //             return b.popularity - a.popularity;
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
//         if (personRole === "cast") {
          
//           popularList = response.cast.filter(function(m) { return m.title || m.name; })
//             .sort(function(a, b) {
//             return b.popularity - a.popularity;
//             })
//             .slice(0, 9)
//             .map(function(m) {
//               return {
//                 type: m.media_type,              
//                 id: m.id,
//                 name: m.title || m.name, 
//                 img: "https://image.tmdb.org/t/p/w200/" + m.poster_path, 
//                 popularity: m.popularity, 
//              };
//          }); 
//         } else {          
//           popularList = response.crew.filter(function(m, i, arr) {
//               var firstIndex = arr.findIndex(function(el) { return el.id === m.id; });

//               if ((m.title || m.name) && firstIndex === i) {
//                 return m;
//               }

//             })
//             .sort(function(a, b) {
//              return b.popularity - a.popularity;
//             })
//             .slice(0, 9)
//             .map(function(m) {
//               return {
//                 type: m.media_type,
//                 id: m.id,
//                 name: m.title || m.name, 
//                 img: "https://image.tmdb.org/t/p/w200/" + m.poster_path, 
//                 popularity: m.popularity, 
//               };
//           }); 
//         }

        var productionList = [];
        var directingList = [];
        var writingList = [];


        for (var i = 0; i < newCrew.length; i++) {
          switch (newCrew[i].job) {
            case "Producer": 
            case "Executive Producer": {
              productionList.push(newCrew[i]);
              break;
            }
            case "Screenplay":
            case "Writer": {
              writingList.push(newCrew[i]);
              break;              
            }
            case "Director": {
              directingList.push(newCrew[i]);
              break;  
            } 
          }
        }

        successCallback({
          popularList: popularList,
          actingList: sortMovieList(newCast),
          productionList: sortMovieList(productionList),   
          directingList: sortMovieList(directingList),
          writingList: sortMovieList(writingList)
        });
      }
    }, function(error) {
      if (errorCallback) {
        errorCallback(error);
      }       
    });
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

  var getRecommendedMovieList = function(successCallback, errorCallback, mId) {
    var sdk = kony.sdk.getCurrentInstance();
    var AlexanderMovieListService = sdk.getIntegrationService("TMDB_API");
    var headers = null;
    var body = { id: mId };
    AlexanderMovieListService.invokeOperation("getRecommendedMovieList", headers, body, function(response) {
      if (successCallback) {
        var movieList = response.results.map(function(m) {
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
    getMovieCredits: getMovieCredits,

    searchPeople: searchPeople,
    getPersonInfo: getPersonInfo,
    getPersonCredits: getPersonCredits,
  };
});
