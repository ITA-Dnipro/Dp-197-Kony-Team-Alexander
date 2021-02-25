define(["MovieService"], function(movieService){ 

  return {
    onInitialize: function() {
      this.view.btnGet.onClick = this.onGetClicked.bind(this, {id: 1810, role: "actor"});
      //       this.view.btnBack.onClick = Utility.goBack;
      //       this.view.lstSimilarMovies.onRowClick = this.onSimilarMoviesRowClicked.bind(this);
      //       this.view.lstRecommendedMovies.onRowClick = this.onSimilarMoviesRowClicked.bind(this);
      //       this.view.btnFavorite.onClick = this.onbtnFavoriteClicked.bind(this);
      //       this.view.btnShowRecommendations.onClick = this.onBtnShowRecommendationsClicked.bind(this);
      //       this.view.btnShowSimilarMovie.onClick = this.onBtnShowSimilarMovieClicked.bind(this);
    },
    
    onNavigate: function(personData) {
      if (personData) {
        this.personData = personData;
      }
      
//       alert(personData.id);
      kony.application.showLoadingScreen();

      movieService.getPersonInfo(function(personInfo) {
        this.onPersonInfoReceived(personInfo);
        kony.application.dismissLoadingScreen();
      }.bind(this), function() {
        alert("Error while retrieving person info");
        kony.application.dismissLoadingScreen();
      }, this.personData.id);
      
      movieService.getPersonCredits(function(credits) {
        this.onPersonCreditsReceived(credits);
        kony.application.dismissLoadingScreen();
      }.bind(this), function() {
        alert("Error while retrieving person credits");
        kony.application.dismissLoadingScreen();
      }, this.personData.id, this.personData.role);
      
    },

    onGetClicked: function(personData) {
      alert(personData.id);

      kony.application.showLoadingScreen();

      movieService.getPersonInfo(function(personInfo) {
        this.onPersonInfoReceived(personInfo);
        kony.application.dismissLoadingScreen();
      }.bind(this), function() {
        alert("Error while retrieving person info");
        kony.application.dismissLoadingScreen();
      }, personData.id);
      
      movieService.getPersonCredits(function(credits) {
        this.onPersonCreditsReceived(credits);
        kony.application.dismissLoadingScreen();
      }.bind(this), function() {
        alert("Error while retrieving person credits");
        kony.application.dismissLoadingScreen();
      }, personData.id, personData.role);

    },

    onPersonInfoReceived: function(personInfo) {
      this.view.imgPeople.src = personInfo.img; 
      this.view.lblName.text = personInfo.name;
      this.view.lblBirthdayInfo.text = personInfo.birthday;
      this.view.lblPlaceOfBirthInfo.text = personInfo.placeOfBirth;
      this.view.lblKnownForInfo.text = personInfo.knownFor;
      this.view.lblBiographyInfo.text = personInfo.biography;

      if (personInfo.deathday) {
        this.view.lblDeathInfo.text = personInfo.deathday;
      } else {
        this.view.flxDeath.isVisible = false;
      }
    },
    
    onPersonCreditsReceived: function(creditsList) {
      
      this.view.flxBestMoviesCarousel.removeAll();

      if (creditsList.popularList.length === 0) {
        this.view.flxBestMoviesCarousel.isVisible = false;
        this.view.lblKnownForMovies.isVisible = false;

      } else {
        this.view.flxBestMoviesCarousel.isVisible = true;
        this.view.lblKnownForMovies.isVisible = true;
       
        for (var i = 0; i < creditsList.popularList.length; i++) {
          var flexBestMovie = new kony.ui.FlexContainer({
            id: "flxBestMovie" + i,
            top: "0dp",
            left: "5dp",
            width: "130dp",
            height: kony.flex.USE_PREFERRED_SIZE,
            layoutType: kony.flex.FLOW_VERTICAL
          });

          var imgBestMovie = new kony.ui.Image2({
            id: "imgBestMovie" + i,
            src: creditsList.popularList[i].img,
            top: "0dp",
            width: "100%",
            height: "130dp",
          });

          var btnBestMovieName = new kony.ui.Button({
            id: "lblBestMovieName" + i,
            text: creditsList.popularList[i].name,
            top: "5dp",
            left: "0dp",
            width: "100%",
            height: kony.flex.USE_PREFERRED_SIZE,
            isVisible: true,
            skin: "sknBtnCastName",
            onClick: this.onMovieClicked.bind(null, creditsList.popularList[i].id)
          }, {
            padding: [0,0,0,0],
            margin: [0,0,0,0],
            contentAlignment: constants.CONTENT_ALIGN_CENTER,
          });

//           var lblChar = new kony.ui.Label({
//             id: "lblCastCharacter" + i,
//             text: creditsList.cast[i].character,
//             skin: "sknCastCharacter",
//             top: "5dp",
//             left: "0dp",
//             width: "100%",
//             height: kony.flex.USE_PREFERRED_SIZE,
//             contentAlignment: constants.CONTENT_ALIGN_CENTER,
//             wrapping: constants.WIDGET_TEXT_WORD_WRAP
//           });

          flexBestMovie.add(imgBestMovie, btnBestMovieName);

          this.view.flxBestMoviesCarousel.add(flexBestMovie);
        }		
      }
    },
    
    onMovieClicked: function(movieId) {
      Utility.navigateTo("frmMovieDetails", {id: movieId});
    }

    //     onbtnFavoriteClicked: function() {
    //       this.view.btnFavorite.skin === "sknBtnFavorite" ?
    //         this.view.btnFavorite.skin = "sknBtnFavoriteActive" :
    //         this.view.btnFavorite.skin = "sknBtnFavorite";

    //       dbService.toggleMovieFavorites(this.movieId);
    //     },



    //     onSimilarMoviesRowClicked: function(widgetRef, sectionIndex, rowIndex) {
    //       alert(widgetRef.data[rowIndex].id);

    //       this.movieId = widgetRef.data[rowIndex].id;

    //       this.view.btnShowRecommendations.skin = "sknBtnRecommendedMovie";
    //       this.view.btnShowSimilarMovie.skin = "sknBtnRecommendedMovie";

    //       movieService.getMovieDetails(function(movieDetails) {
    //         this.onMovieDetailsReceived(movieDetails);
    //       }.bind(this), function() {
    //         alert("Error while retrieving movie details");
    //       }, widgetRef.data[rowIndex].id);

    //       movieService.getSimilarMovieList(function(movieList) {
    //         this.onSimilarMovieListReceived(movieList);
    //       }.bind(this), function() {
    //         alert("Error while retrieving similar movie list");
    //       }, widgetRef.data[rowIndex].id);

    //        movieService.getRecommendedMovieList(function(movieList) {
    //         this.onRecommendedMovieListReceived(movieList);
    //         kony.application.dismissLoadingScreen();
    //       }.bind(this), function() {
    //         alert("Error while retrieving recommended movie list");
    //         kony.application.dismissLoadingScreen();
    //       }, widgetRef.data[rowIndex].id);

    //       movieService.getMovieCredits(function(creditsList) {
    //         this.onMovieCreditsReceived(creditsList);
    //         kony.application.dismissLoadingScreen();
    //       }.bind(this), function() {
    //         alert("Error while retrieving similar movie list");
    //         kony.application.dismissLoadingScreen();
    //       }, widgetRef.data[rowIndex].id);

    //       this.view.flxMainScroll.setContentOffset({
    //         "x": "0dp",
    //         "y": "0dp"
    //       }, false);

    //       this.view.flxCastCarousel.setContentOffset({
    //         "x": "0dp",
    //         "y": "0dp"
    //       }, false);
    //     },
  };
});