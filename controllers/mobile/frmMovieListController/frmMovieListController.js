define(["MovieService"], function(movieService){
  return {
    onInitialize: function() {
      this.view.lstMovies.onRowClick = this.onRowClicked.bind(this);
      this.view.btnSearch.onClick = Utility.navigateTo.bind(null, "frmSearch", {searchFor: "movies"});
      this.view.btnMovie.onClick = this.onBtnMovieClicked.bind(this);
      this.view.btnTVShow.onClick = this.onBtnTVShowClicked.bind(this);
      this.view.btnInTheatres.onClick = this.onBtnInTheatresClicked.bind(this);
      this.view.btnGoToNearestCinemas.onClick = Utility.navigateTo.bind(null, "frmSearch", {searchFor: "movies"});
      this.view.btnShowMore.onClick = this.onBtnShowMoreClicked.bind(this);

      this.view.onDeviceBack = Utility.goBack;

      this.view.btnMovie.skin = "sknBtnNavigateActive";
      this.view.btnTVShow.skin = "sknBtnNavigateInActive";
      this.view.btnInTheatres.skin = "sknBtnNavigateInActive";

      kony.application.showLoadingScreen();

      var btnMovieSkin = "sknBtnNavigateInActive";
      movieService.getMovieList(function(movieList) {
        var movieListData = movieList.map(function(m) {
          return {
            lblMovieTitle: m.title,
            lblMovieGenres: m.genreNamesList.join(', '),
            lblMovieYear: String(m.released),
            imgMoviePoster: m.poster,
            id: m.id,
            type: m.type
          };
        });

        this.onMovieListReceived(movieListData, btnMovieSkin);
        movieService.getMovieList(function(inCinemaList) {
          var inCinemaListData = inCinemaList.map(function(m) {
            return {
              lblMovieTitle: m.title,
              lblMovieGenres: m.genreNamesList.join(', '),
              lblMovieYear: String(m.released),
              imgMoviePoster: m.poster,
              id: m.id,
              type: m.type
            };
          });
          btnMovieSkin = "sknBtnNavigateActive";
          this.onMovieListReceived(inCinemaListData, btnMovieSkin);
        }.bind(this), function() {
          alert("Error while retrieving movie list");
          kony.application.dismissLoadingScreen();
        }, "popular", InTheatresPageNumber);
      }.bind(this), function() {
        alert("Error while retrieving movie list");
        kony.application.dismissLoadingScreen();
      }, "now_playing", MoviePageNumber);

      movieService.getTVShowList(function(TVShowList) {
        var TVShowListData = TVShowList.map(function(m) {
          return {
            lblMovieTitle: m.title,
            lblMovieGenres: m.genreNamesList.join(', '),
            lblMovieYear: String(m.released),
            imgMoviePoster: m.poster,
            id: m.id,
            type: m.type
          };
        });
        this.onMovieListReceived(TVShowListData, "TVShow");
      }.bind(this), function() {
        alert("Error while retrieving TV show list");
        kony.application.dismissLoadingScreen();
      }, TVShowPageNumber);
    },

    loadMovieList: function(url, n) {

      kony.application.showLoadingScreen();

      var btnMovieSkin = this.view.btnMovie.skin;

      movieService.getMovieList(function(movieList) {
        var movieListData = movieList.map(function(m) {
          return {
            lblMovieTitle: m.title,
            lblMovieGenres: m.genreNamesList.join(', '),
            lblMovieYear: String(m.released),
            imgMoviePoster: m.poster,
            id: m.id,
            type: m.type
          };
        });

        this.onMovieListReceived(movieListData, btnMovieSkin);
      }.bind(this), function() {
        alert("Error while retrieving movie list");
        kony.application.dismissLoadingScreen();
      }, url, n);
    },

    loadTVShowList: function(n) {  
      kony.application.showLoadingScreen();

      movieService.getTVShowList(function(TVShowList) {
        var TVShowListData = TVShowList.map(function(m) {
          return {
            lblMovieTitle: m.title,
            lblMovieGenres: m.genreNamesList.join(', '),
            lblMovieYear: String(m.released),
            imgMoviePoster: m.poster,
            id: m.id,
            type: m.type
          };
        });
        this.onMovieListReceived(TVShowListData, "TVShow");
      }.bind(this), function() {
        alert("Error while retrieving TV show list");
        kony.application.dismissLoadingScreen();
      }, n);
    },

    onRowClicked: function(widgetRef, sectionIndex, rowIndex) {
      Utility.navigateTo("frmMovieDetails", {id: widgetRef.data[rowIndex].id, type: widgetRef.data[rowIndex].type});
    },

    onMovieListReceived: function(movieList, skin) {
      var setData = function() {
        if (skin === "sknBtnNavigateActive") {
          MovieListData = MovieListData.concat(movieList);
          this.view.lstMovies.setData(MovieListData);
          kony.application.dismissLoadingScreen();
        } else if (skin === "sknBtnNavigateInActive") {
          InTheatresData = InTheatresData.concat(movieList);
          this.view.lstMovies.setData(InTheatresData);
          kony.application.dismissLoadingScreen();
        } else if (skin === "TVShow") {
          TVShowData = TVShowData.concat(movieList);
          this.view.lstMovies.setData(TVShowData);
          kony.application.dismissLoadingScreen();
        }
      }.bind(this);

      setData();
    }, 

    onBtnShowMoreClicked: function() {
      var url;
      var n;
      if (this.view.btnMovie.skin === "sknBtnNavigateActive") {
        url = "popular";
        n = MoviePageNumber + 1;
        MoviePageNumber++;
        this.loadMovieList(url, n);
      } else if (this.view.btnInTheatres.skin === "sknBtnNavigateActive") {
        url = "now_playing";
        n = InTheatresPageNumber + 1;
        InTheatresPageNumber++;
        this.loadMovieList(url, n);
      } else if (this.view.btnTVShow.skin === "sknBtnNavigateActive") {
        n = TVShowPageNumber + 1;
        TVShowPageNumber++;
        this.loadTVShowList(n);
      }
    },

    onBtnInTheatresClicked: function() {
      this.view.btnMovie.skin = "sknBtnNavigateInActive";
      this.view.btnTVShow.skin = "sknBtnNavigateInActive";
      this.view.btnInTheatres.skin = "sknBtnNavigateActive";
      this.view.lstMovies.setData(InTheatresData);
    },

    onBtnMovieClicked: function() {
      this.view.btnMovie.skin = "sknBtnNavigateActive";
      this.view.btnTVShow.skin = "sknBtnNavigateInActive";
      this.view.btnInTheatres.skin = "sknBtnNavigateInActive";
      this.view.lstMovies.setData(MovieListData);
    },

    onBtnTVShowClicked: function() {
      this.view.btnMovie.skin = "sknBtnNavigateInActive";
      this.view.btnTVShow.skin = "sknBtnNavigateActive";
      this.view.btnInTheatres.skin = "sknBtnNavigateInActive";
      this.view.lstMovies.setData(TVShowData);
    }
  };
});