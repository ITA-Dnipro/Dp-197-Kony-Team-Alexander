define(function () {
  var mainGenreData = [];

  var getGenreList = function(successCallback, errorCallback) {
    if (mainGenreData && mainGenreData.length > 0) {
      return successCallback(mainGenreData);      
    }

    var sdk = kony.sdk.getCurrentInstance();
    var AlexanderMovieListService = sdk.getIntegrationService("TMDB_API");
    var headers = null;
    var body = {};
    AlexanderMovieListService.invokeOperation("getGenreList", headers, body, function(response) {
      mainGenreData = response.genres;

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

  var getMovieList = function(successCallback, errorCallback, url, n) {
    var sdk = kony.sdk.getCurrentInstance();
    var AlexanderMovieListService = sdk.getIntegrationService("TMDB_API");
    var headers = null;
    var body = {
      category: url,
      pageNumber: n
    };
    getGenreList(function(genreData){
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

  var getTVShowList = function(successCallback, errorCallback, pageNumber) {
    var sdk = kony.sdk.getCurrentInstance();
    var AlexanderMovieListService = sdk.getIntegrationService("TMDB_API");
    var headers = null;
    var body = {pageNumber: pageNumber};
    getGenreList(function(genreData){
      AlexanderMovieListService.invokeOperation("getTVShowList", headers, body, function(response) {
        if (successCallback) {
          var movieList = response.results.map(function(m) {
            return new MovieData({
              type: "tv",
              id: m.id,
              title: m.name, 
              posterPath: m.poster_path,
              released: m.first_air_date,
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

  var searchMovie = function(successCallback, errorCallback, string, pageNumber) {
    var sdk = kony.sdk.getCurrentInstance();
    var AlexanderMovieListService = sdk.getIntegrationService("TMDB_API");
    var headers = null;
    var body = { 
      query: string,
      pageNumber: pageNumber
    };
    getGenreList(function(genreData){
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
          TotalSearchMoviePages = response.total_pages;
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

  var searchTvShows = function(successCallback, errorCallback, string, pageNumber) {
    var sdk = kony.sdk.getCurrentInstance();
    var AlexanderMovieListService = sdk.getIntegrationService("TMDB_API");
    var headers = null;
    var body = { 
      query: string,
      pageNumber: pageNumber
    };
    getGenreList(function(genreData){
      AlexanderMovieListService.invokeOperation("searchTvShows", headers, body, function(response) {
        if (successCallback) {
          var movieList = response.results.map(function(m) {
            return new TvData({
              type: "tv",
              id: m.id,
              title: m.title, 
              posterPath: m.poster_path,
              firstAirDate: m.first_air_date,
              genreNamesList: getGenreNameById(genreData, m.genre_ids)
            }); 
          });
          TotalSearchTVShowPages = response.total_pages;
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

  var searchPeople = function(successCallback, errorCallback, string, pageNumber) {
    var sdk = kony.sdk.getCurrentInstance();
    var AlexanderMovieListService = sdk.getIntegrationService("TMDB_API");
    var headers = null;
    var body = { 
      query: string,
      pageNumber: pageNumber
    };
    AlexanderMovieListService.invokeOperation("searchPeople", headers, body, function(response) {
      if (successCallback) {
        var movieList = response.results.map(function(p) {
          return new PersonInfo({
            id: p.id,
            name: p.name, 
            knownFor: "Known for: " + p.known_for_department,  
            img: p.profile_path,       
          });
        });
        TotalSearchPeoplePages = response.total_pages;
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

  var getTvDetails = function(successCallback, errorCallback, id) {
    var sdk = kony.sdk.getCurrentInstance();
    var AlexanderMovieListService = sdk.getIntegrationService("TMDB_API");
    var headers = null;
    var body = { movieId: id };

    AlexanderMovieListService.invokeOperation("getTvDetails", headers, body, function(response) {
      if (successCallback) {
        var tvDetails = new TvData({
          type: "tv",
          id: response.id,
          title: response.name, 
          description: response.overview, 
          countries: response.production_countries, 
          duration: response.episode_run_time.length > 0 ? response.episode_run_time : null, 
          genresId: response.genres.map(function(g) { return g.id; }),
          genreNamesList: response.genres.map(function(g) { return g.name; }),
          voteAvg: response.vote_average, 
          posterPath: response.poster_path,
          backdropPath: response.backdrop_path,
          createdBy: response.created_by,
          numOfseasons: response.number_of_seasons,
          firstAirDate: response.first_air_date, 
          lastAirDate: response.last_air_date, 
        });

        successCallback(tvDetails);
      }
    }, function(error) {
      if (errorCallback) {
        errorCallback(error);
      }
    });   
  };

  var getPersonInfo = function(successCallback, errorCallback, id) {
    var sdk = kony.sdk.getCurrentInstance();
    var AlexanderMovieListService = sdk.getIntegrationService("TMDB_API");
    var headers = null;
    var body = { personId: id };

    AlexanderMovieListService.invokeOperation("getPersonInfo", headers, body, function(response) {
      if (successCallback) {
        var personInfo = new PersonInfo({
          name: response.name,
          birthday: response.birthday,
          placeOfBirth: response.place_of_birth,
          deathday: response.deathday,
          img: response.profile_path, 
          knownFor: response.known_for_department, 
        });

        successCallback(personInfo);
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
          return new PersonInfo({
            id: c.id,
            name: c.name, 
            img: c.profile_path, 
            character: c.character, 
          });
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

  var getTvCredits = function(successCallback, errorCallback, tvId) {
    var sdk = kony.sdk.getCurrentInstance();
    var AlexanderMovieListService = sdk.getIntegrationService("TMDB_API");
    var headers = null;
    var body = { movieId: tvId };
    AlexanderMovieListService.invokeOperation("getTvCredits", headers, body, function(response) {
      if (successCallback) {
        var castList = response.cast.map(function(c) {
          return new PersonInfo({
            id: c.id,
            name: c.name, 
            img: c.profile_path, 
            characterList: c.roles, 
          });
        });

        successCallback({
          cast: castList,
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
          popularList = newCast.filter(function(m, i, arr) {
            var firstIndex = arr.findIndex(function(el) { return el.id === m.id; });

            if ((m.title || m.name) && firstIndex === i) {
              return m;
            }
          })
            .sort(function(a, b) { return b.vote_count - a.vote_count; })
            .slice(0, 9)
            .map(function(m) {
            return {
              type: m.media_type,              
              id: m.id,
              name: m.title || m.name, 
              img: "https://image.tmdb.org/t/p/w200" + m.poster_path, 
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
            .sort(function(a, b) { return b.vote_count - a.vote_count; })
            .slice(0, 9)
            .map(function(m) {
            return {
              type: m.media_type,
              id: m.id,
              name: m.title || m.name, 
              img: "https://image.tmdb.org/t/p/w200" + m.poster_path, 
              popularity: m.popularity, 
            };
          }); 
        }

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

  var getRecommendedList = function(successCallback, errorCallback, id, listType, mediaType) {
    var sdk = kony.sdk.getCurrentInstance();
    var AlexanderMovieListService = sdk.getIntegrationService("TMDB_API");
    var headers = null;
    var body = { id: id, listType: listType, mediaType: mediaType };
    AlexanderMovieListService.invokeOperation("getRecommendedList", headers, body, function(response) {
      if (successCallback) {
        var movieList = [];

        if (mediaType === "tv") {
          movieList = response.results.map(function(m) {
            return new TvData({
              type: "tv",
              id: m.id,
              title: m.name, 
              description: m.overview, 
              posterPath: m.poster_path
            });
          });
        }

        if (mediaType === "movie") {
          movieList = response.results.map(function(m) {
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
        }

        successCallback(movieList);
      }
    }, function(error) {
      if (errorCallback) {
        errorCallback(error);
      }
    });  
  };

  return {
    getTVShowList: getTVShowList,
    getMovieDetails: getMovieDetails,
    getMovieList: getMovieList,
    searchMovie: searchMovie,
    getMovieCredits: getMovieCredits,

    searchPeople: searchPeople,
    getPersonInfo: getPersonInfo,
    getPersonCredits: getPersonCredits,
    getTvDetails: getTvDetails,
    getTvCredits: getTvCredits,
    getRecommendedList: getRecommendedList,
    searchTvShows: searchTvShows,
  };
});
