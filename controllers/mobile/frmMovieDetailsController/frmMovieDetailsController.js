define(["MovieService", "FavouriteListService"], function(movieService, favouriteService){ 

  return {
    onInitialize: function() {
      this.view.lstSimilarMovies.onRowClick = this.onSimilarMoviesRowClicked.bind(this);
      this.view.lstRecommendedMovies.onRowClick = this.onSimilarMoviesRowClicked.bind(this);
      this.view.btnFavorite.onClick = this.onbtnFavoriteClicked.bind(this);
      this.view.onDeviceBack = Utility.goBack;
      this.view.btnShowRecommendations.onClick = this.onBtnShowClicked.bind(this, this.view.btnShowRecommendations, "Recommendations", this.view.lstRecommendedMovies);
      this.view.btnShowSimilarMovie.onClick = this.onBtnShowClicked.bind(this, this.view.btnShowSimilarMovie, "Similar Movies", this.view.lstSimilarMovies);
      
      this.view.cmpHeader.onBackClicked = Utility.goBack;
//       alert(this.view.cmpHeader.onBtnBack.text);
    },

    onbtnFavoriteClicked: function() {
      this.view.btnFavorite.skin === "sknBtnFavorite" ?
        this.view.btnFavorite.skin = "sknBtnFavoriteActive" :
      this.view.btnFavorite.skin = "sknBtnFavorite";

      if (this.type === "movie" && this.view.btnFavorite.skin === "sknBtnFavoriteActive") {
        movieService.getMovieDetails(function(movieDetails) {
          favouriteService.createFavouriteList(UserId, movieDetails, function() {
            alert("The movie is added to favorite list!");
          }, function() {
            alert("Error while adding movie to favourits");
          });
        }.bind(this), function() {
          alert("Error while retrieving movie details");
        }, this.movieId);
      }
      
      if (this.type === "movie" && this.view.btnFavorite.skin === "sknBtnFavorite") {
        favouriteService.getFavouriteMovies(UserId, function(movieList) {
          var movieId = this.movieId;
          var movieInFavorite = movieList.find(function(m) {
            return Number(movieId) === Number(m.id); 
          });
          favouriteService.deleteFavouriteList(movieInFavorite.dbId, function() {
                  alert("The movie is deleted from favourite list");
                }, function() {
                alert("Error while deleting movie from favourite list");
              });
        }.bind(this), function() {
          alert("Error while retrieving favourite list");
        });
      }

      if (this.type === "tv" && this.view.btnFavorite.skin === "sknBtnFavoriteActive") {
        movieService.getTvDetails(function(tvDetails) {
          favouriteService.createFavouriteList(UserId, tvDetails, function() {
            alert("The tv show is added to favourite list!");
          }, function() {
            alert("Error while adding tv to favourits");
          });
        }.bind(this), function() {
          alert("Error while retrieving tv details");
        }, this.movieId);
      }
      
       if (this.type === "tv" && this.view.btnFavorite.skin === "sknBtnFavorite") {
        favouriteService.getFavouriteMovies(UserId, function(movieList) {
          var movieInFavorite = movieList.find(function(m) {
            return Number(this.movieId) === Number(m.id); 
          }.bind(this));
          favouriteService.deleteFavouriteList(movieInFavorite.dbId, function() {
                  alert("The tv show is deleted from favourite list");
                }, function() {
                alert("Error while deleting tv from favourite list");
              });
        }, function() {
          alert("Error while retrieving favourite list");
        }, this.movieId);
      }

    },

    onBtnShowClicked: function(btn, text, list) {
      if (btn.skin === "sknBtnRecommendedMovie") {
        btn.skin = "sknBtnRecommendedMovieActive";
        btn.text = text + "   \uf054";
        list.isVisible = true;

        var y = this.view.flxMainScroll.contentOffsetMeasured.y + 150; 
        this.view.flxMainScroll.setContentOffset({
          "x": "0dp",
          "y": y + "dp"
        }, true);      
      } else {
        btn.skin = "sknBtnRecommendedMovie";
        btn.text = text + "   \uf078";
        list.isVisible = false;
      }
    },

    onNavigate: function(movieData) {
      this.view.btnShowRecommendations.skin = "sknBtnRecommendedMovie";
      this.view.btnShowSimilarMovie.skin = "sknBtnRecommendedMovie";
      this.view.btnShowRecommendations.text = "Recommendations   \uf078";
      this.view.btnShowSimilarMovie.text = "Similar Movies   \uf078";

      if (movieData) {
        this.movieId = movieData.id;  
        this.type = movieData.type;
      }
      
      this.type === "tv" ? this.view.lblTopCast.text = "Series Cast" : this.view.lblTopCast.text = "Top Billed Cast";

      alert('id ' + this.movieId);
      
      if (this.type === "movie") {  
        this.view.cmpHeader.text = "Movie Details";
        kony.application.showLoadingScreen();

        movieService.getMovieDetails(function(movieDetails) {
          this.onMovieDetailsReceived(movieDetails);
          kony.application.dismissLoadingScreen();
        }.bind(this), function() {
          alert("Error while retrieving movie details");
          kony.application.dismissLoadingScreen();
        }, this.movieId);

        movieService.getRecommendedList(function(movieList) {
          this.onSimilarMovieListReceived(movieList);
          kony.application.dismissLoadingScreen();
        }.bind(this), function() {
          alert("Error while retrieving similar movie list");
          kony.application.dismissLoadingScreen();
        }, this.movieId, "similar", this.type);

        movieService.getRecommendedList(function(movieList) {
          this.onRecommendedMovieListReceived(movieList);
          kony.application.dismissLoadingScreen();
        }.bind(this), function() {
          alert("Error while retrieving recommended movie list");
          kony.application.dismissLoadingScreen();
        }, this.movieId, "recommendations", this.type);

        movieService.getMovieCredits(function(creditsList) {
          this.onMovieCreditsReceived(creditsList);
          kony.application.dismissLoadingScreen();
        }.bind(this), function() {
          alert("Error while retrieving movie credits");
          kony.application.dismissLoadingScreen();
        }, this.movieId);        
      } 

      if (this.type === "tv") {
				this.view.cmpHeader.text = "TV Show Details";
        kony.application.showLoadingScreen();

        movieService.getTvDetails(function(tvDetails) {
          this.onTvDetailsReceived(tvDetails);
          kony.application.dismissLoadingScreen();
        }.bind(this), function() {
          alert("Error while retrieving tv details");
          kony.application.dismissLoadingScreen();
        }, this.movieId);

        movieService.getRecommendedList(function(tvList) {
          this.onSimilarMovieListReceived(tvList);
          kony.application.dismissLoadingScreen();
        }.bind(this), function() {
          alert("Error while retrieving similar movie list");
          kony.application.dismissLoadingScreen();
        }, this.movieId, "similar", this.type);

        movieService.getRecommendedList(function(movieList) {
          this.onRecommendedMovieListReceived(movieList);
          kony.application.dismissLoadingScreen();
        }.bind(this), function() {
          alert("Error while retrieving recommended movie list");
          kony.application.dismissLoadingScreen();
        }, this.movieId, "recommendations", this.type);

        movieService.getTvCredits(function(creditsList) {
          this.onMovieCreditsReceived(creditsList);
          kony.application.dismissLoadingScreen();
        }.bind(this), function() {
          alert("Error while retrieving tv credits");
          kony.application.dismissLoadingScreen();
        }, this.movieId);
      }

      this.view.flxMainScroll.setContentOffset({
        "x": "0dp",
        "y": "0dp"
      }, false);

      this.view.flxCastCarousel.setContentOffset({
        "x": "0dp",
        "y": "0dp"
      }, false);
    },

    onSimilarMoviesRowClicked: function(widgetRef, sectionIndex, rowIndex) {
      this.movieId = widgetRef.data[rowIndex].id;
      this.type = widgetRef.data[rowIndex].type;
      
      alert('id ' + this.movieId);

      this.view.btnShowRecommendations.skin = "sknBtnRecommendedMovie";
      this.view.btnShowSimilarMovie.skin = "sknBtnRecommendedMovie";
      this.view.btnShowRecommendations.text = "Recommendations   \uf078";
      this.view.btnShowSimilarMovie.text = "Similar Movies   \uf078";

       if (this.type === "movie") {    
        this.view.cmpHeader.text = "Movie Details";
        kony.application.showLoadingScreen();

        movieService.getMovieDetails(function(movieDetails) {
          this.onMovieDetailsReceived(movieDetails);
          kony.application.dismissLoadingScreen();
        }.bind(this), function() {
          alert("Error while retrieving movie details");
          kony.application.dismissLoadingScreen();
        }, this.movieId);

        movieService.getRecommendedList(function(movieList) {
          this.onSimilarMovieListReceived(movieList);
          kony.application.dismissLoadingScreen();
        }.bind(this), function() {
          alert("Error while retrieving similar movie list");
          kony.application.dismissLoadingScreen();
        }, this.movieId, "similar", this.type);

        movieService.getRecommendedList(function(movieList) {
          this.onRecommendedMovieListReceived(movieList);
          kony.application.dismissLoadingScreen();
        }.bind(this), function() {
          alert("Error while retrieving recommended movie list");
          kony.application.dismissLoadingScreen();
        }, this.movieId, "recommendations", this.type);

        movieService.getMovieCredits(function(creditsList) {
          this.onMovieCreditsReceived(creditsList);
          kony.application.dismissLoadingScreen();
        }.bind(this), function() {
          alert("Error while retrieving movie credits");
          kony.application.dismissLoadingScreen();
        }, this.movieId);        
      } 
      
      if (this.type === "tv") {
        this.view.cmpHeader.text = "TV Show Details";
        kony.application.showLoadingScreen();

        movieService.getTvDetails(function(tvDetails) {
          this.onTvDetailsReceived(tvDetails);
          kony.application.dismissLoadingScreen();
        }.bind(this), function() {
          alert("Error while retrieving tv details");
          kony.application.dismissLoadingScreen();
        }, this.movieId);

        movieService.getRecommendedList(function(tvList) {
          this.onSimilarMovieListReceived(tvList);
          kony.application.dismissLoadingScreen();
        }.bind(this), function() {
          alert("Error while retrieving similar movie list");
          kony.application.dismissLoadingScreen();
        }, this.movieId, "similar", this.type);

        movieService.getRecommendedList(function(movieList) {
          this.onRecommendedMovieListReceived(movieList);
          kony.application.dismissLoadingScreen();
        }.bind(this), function() {
          alert("Error while retrieving recommended movie list");
          kony.application.dismissLoadingScreen();
        }, this.movieId, "recommendations", this.type);

        movieService.getTvCredits(function(creditsList) {
          this.onMovieCreditsReceived(creditsList);
          kony.application.dismissLoadingScreen();
        }.bind(this), function() {
          alert("Error while retrieving tv credits");
          kony.application.dismissLoadingScreen();
        }, this.movieId);
      }

      this.view.flxMainScroll.setContentOffset({
        "x": "0dp",
        "y": "0dp"
      }, false);

      this.view.flxCastCarousel.setContentOffset({
        "x": "0dp",
        "y": "0dp"
      }, false);
    },

    onSimilarMovieListReceived: function(movieList) {

      if (movieList.length === 0) {
        this.view.btnShowSimilarMovie.isVisible = false;
        this.view.lstSimilarMovies.setData({});
      } else {
        var similarListData = movieList.map(function(m) {
          return {
            lblMovieTitle: m.title,
            lblMovieDescription: m.description,
            imgMoviePoster: m.poster,
            id: m.id,
            type: m.type
          };
        });
        this.view.btnShowSimilarMovie.isVisible = true;
        this.view.lstSimilarMovies.setData(similarListData);
        this.view.lstSimilarMovies.isVisible = false;
      }			
    },

    onRecommendedMovieListReceived: function(movieList) {    
      if (movieList.length === 0) {
        this.view.btnShowRecommendations.isVisible = false;
        this.view.lstRecommendedMovies.setData({});
      } else {
        var recommendedListData = movieList.map(function(m) {
          return {
            lblMovieTitle: m.title,
            lblMovieDescription: m.description,
            imgMoviePoster: m.poster,
            id: m.id,
            type: m.type,
          };
        });
        this.view.btnShowRecommendations.isVisible = true;
        this.view.lstRecommendedMovies.setData(recommendedListData);
        this.view.lstRecommendedMovies.isVisible = false;
      }			
    },

    onMovieDetailsReceived: function(movieData) {  
      this.view.flxMovieDetails.isVisible = true;
      this.view.flxTvDetails.isVisible = false;
      favouriteService.isMovieInFavoriteList(movieData.id, function(flag) {
        if (flag) {
          this.view.btnFavorite.skin = "sknBtnFavoriteActive";
        } else {
          this.view.btnFavorite.skin = "sknBtnFavorite";        
        }
      }.bind(this));

      this.view.lblCountryInfo.text = movieData.countriesList.join(', ');
      this.view.lblDurationInfo.text = movieData.duration;
      this.view.lblReleasedInfo.text = String(movieData.released);	
      this.view.lblGenresInfo.text = movieData.genreNamesList.join(', ');
      this.view.lblDescriptionInfo.text = movieData.description;
      this.view.lblMovieRating.text = movieData.voteAvg;
      this.view.imgMoviePoster.src = movieData.poster;
      this.view.imgBackground.src = movieData.backdrop;
      this.view.lblMovieTitle.text = movieData.title;
    },

    onTvDetailsReceived: function(tvData) {
      this.view.flxMovieDetails.isVisible = false;
      this.view.flxTvDetails.isVisible = true;

      favouriteService.isMovieInFavoriteList(tvData.id, function(flag) {
        if (flag) {
          this.view.btnFavorite.skin = "sknBtnFavoriteActive";
        } else {
          this.view.btnFavorite.skin = "sknBtnFavorite";        
        }
      }.bind(this));

      this.view.lblCountryInfoTv.text = tvData.countriesList.join(', ');
      this.view.lblEpisodeDurationInfo.text = tvData.duration;
      this.view.lblFirstAirDateInfo.text = tvData.firstAirDate;
      this.view.lblLastAirDateInfo.text = tvData.lastAirDate;
      this.view.lblNumberOfSeasonsInfo.text = String(tvData.numOfseasons);      
      this.view.lblGenresInfoTv.text = tvData.genreNamesList.join(', ');      
      this.view.lblDescriptionInfoTv.text = tvData.description;      
      this.view.lblMovieRating.text = tvData.voteAvg;
      this.view.imgMoviePoster.src = tvData.poster;
      this.view.imgBackground.src = tvData.backdrop;
      this.view.lblMovieTitle.text = tvData.title;

      this.view.flxCreatedBy.removeAll();

      if (tvData.createdBy) {
        this.view.flxCreatedByContainer.isVisible = true;
        
        for (var j = 0; j < tvData.createdBy.length; j++) {
          var btnCreatorName = new kony.ui.Button({
            id: "btnCreator" + j,
            text: tvData.createdBy[j].name,
            top: "5dp",
            left: "0dp",
            width: "100%",
            height: kony.flex.USE_PREFERRED_SIZE,
            isVisible: true,
            skin: "sknBtnDirector",
            onClick: this.onPersonClicked.bind(null, tvData.createdBy[j].id, "crew")
          }, {
            padding: [0,0,0,0],
            margin: [0,0,0,0],
            contentAlignment: constants.CONTENT_ALIGN_MIDDLE_LEFT
          });

          this.view.flxCreatedBy.add(btnCreatorName);
        }
      } else {
        this.view.flxCreatedByContainer.isVisible = false;
      }
    },

    onMovieCreditsReceived: function(creditsList) {

      if (creditsList.director) {       
        if (creditsList.director.length === 0) {
          this.view.flxDirectorContainer.isVisible = false;
        } else {
          this.view.flxDirectorInfo.removeAll();
          this.view.flxDirectorContainer.isVisible = true;
          
          for (var j = 0; j < creditsList.director.length; j++) {
            var btnDirectorName = new kony.ui.Button({
              id: "btnDirector" + j,
              text: creditsList.director[j].name,
              top: "5dp",
              left: "0dp",
              width: "100%",
              height: kony.flex.USE_PREFERRED_SIZE,
              isVisible: true,
              skin: "sknBtnDirector",
              onClick: this.onPersonClicked.bind(null, creditsList.director[j].id, "crew")
            }, {
              padding: [0,0,0,0],
              margin: [0,0,0,0],
              contentAlignment: constants.CONTENT_ALIGN_MIDDLE_LEFT
            });

            this.view.flxDirectorInfo.add(btnDirectorName);
          }        
        }        
      }

      this.view.flxCastCarousel.removeAll();

      if (creditsList.cast.length === 0) {
        this.view.flxCastCarousel.isVisible = false;
        this.view.lblTopCast.isVisible = false;

      } else {
        this.view.flxCastCarousel.isVisible = true;
        this.view.lblTopCast.isVisible = true;

        for (var i = 0; i < 20; i++) {
          var flexCast = new kony.ui.FlexContainer({
            id: "flxCast" + i,
            top: "0dp",
            left: "5dp",
            width: "130dp",
            height: kony.flex.USE_PREFERRED_SIZE,
            layoutType: kony.flex.FLOW_VERTICAL
          });
          
          var flexImg = new kony.ui.FlexContainer({
            id: "flxImg" + i,
            top: "0dp",
            width: "100%",
            height: "130dp",
//             height: kony.flex.USE_PREFERRED_SIZE,
//             layoutType: kony.flex.FLOW_VERTICAL,
            onClick: this.onPersonClicked.bind(null, creditsList.cast[i].id, "cast")
          });

          var imgCast = new kony.ui.Image2({
            id: "imgCast" + i,
            src: creditsList.cast[i].img,
            top: "0dp",
            width: "100%",
            height: "130dp",
          });

          var btnName = new kony.ui.Button({
            id: "btnCastName" + i,
            text: creditsList.cast[i].name,
            top: "5dp",
            left: "0dp",
            width: "100%",
            height: kony.flex.USE_PREFERRED_SIZE,
            isVisible: true,
            skin: "sknBtnCastName",
            onClick: this.onPersonClicked.bind(null, creditsList.cast[i].id, "cast")
          }, {
            padding: [0,0,0,0],
            margin: [0,0,0,0],
            contentAlignment: constants.CONTENT_ALIGN_CENTER,
          });

          var lblChar = new kony.ui.Label({
            id: "lblCastCharacter" + i,
            text: creditsList.cast[i].character,
            skin: "sknLblCastCharacter",
            top: "5dp",
            left: "0dp",
            width: "100%",
            height: kony.flex.USE_PREFERRED_SIZE,
            contentAlignment: constants.CONTENT_ALIGN_CENTER,
            wrapping: constants.WIDGET_TEXT_WORD_WRAP
          });

          flexImg.add(imgCast);
          flexCast.add(flexImg, btnName, lblChar);
//           flexCast.add(imgCast, btnName, lblChar);

          this.view.flxCastCarousel.add(flexCast);
        }		
      }
    },

    onPersonClicked: function(personId, role) {
      Utility.navigateTo("frmPersonInfo", {id: personId, role: role});
    }
  };
});