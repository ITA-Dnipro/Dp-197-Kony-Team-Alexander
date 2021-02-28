define(["MovieService", "AuthenticationService", "FavouriteListService"], function(movieService, dbService, favouriteService){ 

  return {
    onInitialize: function() {
      this.view.btnBack.onClick = Utility.goBack;
      this.view.lstSimilarMovies.onRowClick = this.onSimilarMoviesRowClicked.bind(this);
      this.view.lstRecommendedMovies.onRowClick = this.onSimilarMoviesRowClicked.bind(this);
      this.view.btnFavorite.onClick = this.onbtnFavoriteClicked.bind(this);
      this.view.btnShowRecommendations.onClick = this.onBtnShowRecommendationsClicked.bind(this);
      this.view.btnShowSimilarMovie.onClick = this.onBtnShowSimilarMovieClicked.bind(this);
    },

    onbtnFavoriteClicked: function() {
      this.view.btnFavorite.skin === "sknBtnFavorite" ?
        this.view.btnFavorite.skin = "sknBtnFavoriteActive" :
        this.view.btnFavorite.skin = "sknBtnFavorite";
      
      movieService.getMovieDetails(function(movieDetails) {
        favouriteService.createFavouriteList(UserId, movieDetails, function() {
          alert("create!");
        }, function() {
          alert("Error while add movie to favourits");
        });
      }.bind(this), function() {
        alert("Error while retrieving movie details");
      }, this.movieId);
    },

    onBtnShowRecommendationsClicked: function() {
      this.view.btnShowRecommendations.skin === "sknBtnRecommendedMovie" ?
        this.view.btnShowRecommendations.skin = "sknBtnRecommendedMovieActive" :
        this.view.btnShowRecommendations.skin = "sknBtnRecommendedMovie";
        
      var isVisible = this.view.lstRecommendedMovies.isVisible;
      this.view.lstRecommendedMovies.isVisible = !isVisible;
      
      var y = this.view.flxMainScroll.contentOffsetMeasured.y + 130;      
      this.view.flxMainScroll.setContentOffset({
//         "x": "0dp",
        "y": y + "dp"
      }, true);
    },
    
    onBtnShowSimilarMovieClicked: function() {
      this.view.btnShowSimilarMovie.skin === "sknBtnRecommendedMovie" ?
        this.view.btnShowSimilarMovie.skin = "sknBtnRecommendedMovieActive" :
        this.view.btnShowSimilarMovie.skin = "sknBtnRecommendedMovie";
      
      var isVisible = this.view.lstSimilarMovies.isVisible;
      this.view.lstSimilarMovies.isVisible = !isVisible;
      
      var y = this.view.flxMainScroll.contentOffsetMeasured.y + 130;      
      this.view.flxMainScroll.setContentOffset({
//         "x": "0dp",
        "y": y + "dp"
      }, true);
    },

    onNavigate: function(movieId) {
      this.view.btnShowRecommendations.skin = "sknBtnRecommendedMovie";
      this.view.btnShowSimilarMovie.skin = "sknBtnRecommendedMovie";
      
      this.movieId = movieId.id;

      alert(movieId.id);

      kony.application.showLoadingScreen();

      movieService.getMovieDetails(function(movieDetails) {
        this.onMovieDetailsReceived(movieDetails);
        kony.application.dismissLoadingScreen();
      }.bind(this), function() {
        alert("Error while retrieving movie details");
        kony.application.dismissLoadingScreen();
      }, movieId.id);

      movieService.getSimilarMovieList(function(movieList) {
        this.onSimilarMovieListReceived(movieList);
        kony.application.dismissLoadingScreen();
      }.bind(this), function() {
        alert("Error while retrieving similar movie list");
        kony.application.dismissLoadingScreen();
      }, movieId.id);
      
      movieService.getRecommendedMovieList(function(movieList) {
        this.onRecommendedMovieListReceived(movieList);
        kony.application.dismissLoadingScreen();
      }.bind(this), function() {
        alert("Error while retrieving recommended movie list");
        kony.application.dismissLoadingScreen();
      }, movieId.id);

      movieService.getMovieCredits(function(creditsList) {
        this.onMovieCreditsReceived(creditsList);
        kony.application.dismissLoadingScreen();
      }.bind(this), function() {
        alert("Error while retrieving movie credits");
        kony.application.dismissLoadingScreen();
      }, movieId.id);
    },

    onSimilarMoviesRowClicked: function(widgetRef, sectionIndex, rowIndex) {
      alert(widgetRef.data[rowIndex].id);

      this.movieId = widgetRef.data[rowIndex].id;
      
      this.view.btnShowRecommendations.skin = "sknBtnRecommendedMovie";
      this.view.btnShowSimilarMovie.skin = "sknBtnRecommendedMovie";

      movieService.getMovieDetails(function(movieDetails) {
        this.onMovieDetailsReceived(movieDetails);
      }.bind(this), function() {
        alert("Error while retrieving movie details");
      }, widgetRef.data[rowIndex].id);

      movieService.getSimilarMovieList(function(movieList) {
        this.onSimilarMovieListReceived(movieList);
      }.bind(this), function() {
        alert("Error while retrieving similar movie list");
      }, widgetRef.data[rowIndex].id);
      
       movieService.getRecommendedMovieList(function(movieList) {
        this.onRecommendedMovieListReceived(movieList);
        kony.application.dismissLoadingScreen();
      }.bind(this), function() {
        alert("Error while retrieving recommended movie list");
        kony.application.dismissLoadingScreen();
      }, widgetRef.data[rowIndex].id);

      movieService.getMovieCredits(function(creditsList) {
        this.onMovieCreditsReceived(creditsList);
        kony.application.dismissLoadingScreen();
      }.bind(this), function() {
        alert("Error while retrieving similar movie list");
        kony.application.dismissLoadingScreen();
      }, widgetRef.data[rowIndex].id);

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
          };
        });
        this.view.btnShowRecommendations.isVisible = true;
        this.view.lstRecommendedMovies.setData(recommendedListData);
        this.view.lstRecommendedMovies.isVisible = false;
      }			
    },

    onMovieDetailsReceived: function(movieData) {  

      if (dbService.isMovieInFavoriteList(movieData.id)) {
        this.view.btnFavorite.skin = "sknBtnFavoriteActive";
      } else {
        this.view.btnFavorite.skin = "sknBtnFavorite";        
      }

      //       alert('country ' + movieData.countriesList);

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

    onMovieCreditsReceived: function(creditsList) {
      this.view.lblDirectorInfo.text = creditsList.director.map(function(d){ return d.name; }).join(", ");
      this.view.flxCastCarousel.removeAll();


      //       alert('cast ' + creditsList.cast.length);

      if (creditsList.cast.length === 0) {
        this.view.flxCastCarousel.isVisible = false;
        this.view.lblTopCast.isVisible = false;

      } else {
        this.view.flxCastCarousel.isVisible = true;
        this.view.lblTopCast.isVisible = true;
        // creditsList.cast.length
        for (var i = 0; i < 20; i++) {
          var flexCast = new kony.ui.FlexContainer({
            id: "flxCast" + i,
            top: "0dp",
            left: "5dp",
            width: "130dp",
            height: kony.flex.USE_PREFERRED_SIZE,
            //           onClick: function(){
            //             alert("container ");
            //           },
            //           onClick: this.onPeopleClicked.bind(null, creditsList.cast[i].id),
            layoutType: kony.flex.FLOW_VERTICAL
          });

          var imgCast = new kony.ui.Image2({
            id: "imgCast" + i,
            src: creditsList.cast[i].img,
            top: "0dp",
            width: "100%",
            height: "130dp",

            //           onTouchEnd: function() {
            //             alert("touch end " + creditsList.cast[i].id);
            //           } 
          });

          //         imgCast.addGestureRecognizer(1, { fingers: 1, taps: 1 }, onActorImageTap);

          //         var onActorImageTap = function() {
          //           alert("img tap " + creditsList.cast[i].id);
          //         };

          var btnName = new kony.ui.Button({
            id: "lblCastName" + i,
            text: creditsList.cast[i].name,
            top: "5dp",
            left: "0dp",
            width: "100%",
            height: kony.flex.USE_PREFERRED_SIZE,
            isVisible: true,
            skin: "sknBtnCastName",
            onClick: this.onPeopleClicked.bind(null, creditsList.cast[i].id)
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

          flexCast.add(imgCast, btnName, lblChar);

          this.view.flxCastCarousel.add(flexCast);
        }		
      }


    },

    onPeopleClicked: function(id) {
      alert("actor " + id);
    }
  }
});