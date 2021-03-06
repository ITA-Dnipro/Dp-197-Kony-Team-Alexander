define(["MovieService"], function(movieService){
  return {
    onInitialize: function() {
      this.view.lstMovies.onRowClick = this.onRowClicked.bind(this);
      this.view.btnSearch.onClick = Utility.navigateTo.bind(null, "frmSearch", {searchFor: "movies"});
      this.view.btnMovie.onClick = this.onBtnMovieClicked.bind(this);
      this.view.btnTVShow.onClick = this.onBtnTVShowClicked.bind(this);
      this.view.btnInTheatres.onClick = this.onBtnInTheatresClicked.bind(this);
      this.view.btnGoToNearestCinemas.onClick = Utility.navigateTo.bind(null, "frmNearestCinemas");
      this.view.btnShowMore.onClick = this.onPageNumberChange.bind(this);

      this.view.onDeviceBack = Utility.goBack;

      this.view.btnMovie.skin = "sknBtnNavigateActive";
      this.view.btnTVShow.skin = "sknBtnNavigateInActive";
      this.view.btnInTheatres.skin = "sknBtnNavigateInActive";

      kony.application.showLoadingScreen();

      var btnMovieSkin = this.view.btnMovie.skin;

      movieService.getMovieList(function(movieList) {
        var movieListData = movieList.map(function(m) {
          return {
            lblMovieTitle: m.title,
            lblMovieGenres: m.genreNamesList.join(', ') || "Unknown",
            lblMovieYear: String(m.released) || "Unknown",
            imgMoviePoster: m.poster,
            id: m.id,
            type: m.type
          };
        });

        this.onMovieListReceived(movieListData, btnMovieSkin);
      }.bind(this), function() {
        alert("Error while retrieving movie list");
        kony.application.dismissLoadingScreen();
      }, "popular", MoviePageNumber);
      this.view.btnShowMore.isVisible = false; 
    },

    onNavigate: function() {
      

      this.view.HeaderControl.dropDownList = [
        {"id": "frmProfile", "name": "Profile", "path": "frmProfile"},
        {"id": "frmFavouriteList", "name": "Favourite List", "path": "frmFavouriteList"},
        {"id": "frmAuthentication", "name": "Log Out", "path": "frmAuthentication"}
      ];
    },

    loadMovieList: function(url, pageNumber) {
      kony.application.showLoadingScreen();

      var btnMovieSkin = this.view.btnMovie.skin;

      movieService.getMovieList(function(movieList) {
        var movieListData = movieList.map(function(m) {
          return {
            lblMovieTitle: m.title,
            lblMovieGenres: m.genreNamesList.join(', ') || "Unknown",
            lblMovieYear: String(m.released) || "Unknown",
            imgMoviePoster: m.poster,
            id: m.id,
            type: m.type
          };
        });

        this.onMovieListReceived(movieListData, btnMovieSkin);
      }.bind(this), function() {
        alert("Error while retrieving movie list");
        kony.application.dismissLoadingScreen();
      }, url, pageNumber);
    },

    loadTVShowList: function(pageNumber) {  
      kony.application.showLoadingScreen();

      movieService.getTVShowList(function(TVShowList) {
        var TVShowListData = TVShowList.map(function(m) {
          return {
            lblMovieTitle: m.title,
            lblMovieGenres: m.genreNamesList.join(', ') || "Unknown",
            lblMovieYear: String(m.released) || "Unknown",
            imgMoviePoster: m.poster,
            id: m.id,
            type: m.type
          };
        });
        this.onMovieListReceived(TVShowListData, "TVShow");
      }.bind(this), function() {
        alert("Error while retrieving TV show list");
        kony.application.dismissLoadingScreen();
      }, pageNumber);
    },

    onRowClicked: function(widgetRef, sectionIndex, rowIndex) {
      Utility.navigateTo("frmMovieDetails", {id: widgetRef.data[rowIndex].id, type: widgetRef.data[rowIndex].type});
    },

    onMovieListReceived: function(movieList, skin) {

      if (skin === "sknBtnNavigateActive") {
        MovieListData = MovieListData.concat(movieList);
        this.view.lstMovies.setData(MovieListData);
        if (MoviePageNumber >= 10) {
          this.view.btnShowMore.isVisible = false;
        } else {
          this.view.btnShowMore.isVisible = true;
        }
      } else if (skin === "sknBtnNavigateInActive") {
        InTheatresData = InTheatresData.concat(movieList);
        this.view.lstMovies.setData(InTheatresData);
        if (InTheatresPageNumber >= 10) {
          this.view.btnShowMore.isVisible = false;
        } else {
          this.view.btnShowMore.isVisible = true;
        }
      } else if (skin === "TVShow") {
        TVShowData = TVShowData.concat(movieList);
        this.view.lstMovies.setData(TVShowData);
        if (TVShowPageNumber >= 10) {
          this.view.btnShowMore.isVisible = false;
        } else {
          this.view.btnShowMore.isVisible = true;
        }           
      }
      kony.application.dismissLoadingScreen();
    }, 

    onPageNumberChange: function() {
      var url;
      var pageNumber;
      if (this.view.btnMovie.skin === "sknBtnNavigateActive") {
        url = "popular";
        pageNumber = MoviePageNumber + 1;
        MoviePageNumber++;
        this.loadMovieList(url, pageNumber);
      } else if (this.view.btnInTheatres.skin === "sknBtnNavigateActive") {
        url = "now_playing";
        pageNumber = InTheatresPageNumber + 1;
        InTheatresPageNumber++;
        this.loadMovieList(url, pageNumber);
      } else if (this.view.btnTVShow.skin === "sknBtnNavigateActive") {
        pageNumber = TVShowPageNumber + 1;
        TVShowPageNumber++;
        this.loadTVShowList(pageNumber);
      }
    },

    onBtnInTheatresClicked: function() {
      this.view.btnMovie.skin = "sknBtnNavigateInActive";
      this.view.btnTVShow.skin = "sknBtnNavigateInActive";
      this.view.btnInTheatres.skin = "sknBtnNavigateActive";

      if (InTheatresData.length >= 1) {
        this.view.lstMovies.setData(InTheatresData);
      } else {
        InTheatresPageNumber--;
        this.onPageNumberChange();
      }

      if (InTheatresPageNumber >= 10) {
        this.view.btnShowMore.isVisible = false;
      }

      this.onScrollUp();
    },

    onBtnMovieClicked: function() {
      this.view.btnMovie.skin = "sknBtnNavigateActive";
      this.view.btnTVShow.skin = "sknBtnNavigateInActive";
      this.view.btnInTheatres.skin = "sknBtnNavigateInActive";
      this.view.lstMovies.setData(MovieListData);

      if (MoviePageNumber >= 10) {
        this.view.btnShowMore.isVisible = false;
      }

      this.onScrollUp();
    },

    onBtnTVShowClicked: function() {
      this.view.btnMovie.skin = "sknBtnNavigateInActive";
      this.view.btnTVShow.skin = "sknBtnNavigateActive";
      this.view.btnInTheatres.skin = "sknBtnNavigateInActive";

      if (TVShowData.length >= 1) {
        this.view.lstMovies.setData(TVShowData);
      } else {
        TVShowPageNumber--;
        this.onPageNumberChange();
      }

      if (TVShowPageNumber >= 10) {
        this.view.btnShowMore.isVisible = false;
      }

      this.onScrollUp();
    },

    onScrollUp: function() {
      this.view.flxListContainer.setContentOffset({
        "x": "0dp",
        "y": "0dp"
      }, false);
    }
  };
});