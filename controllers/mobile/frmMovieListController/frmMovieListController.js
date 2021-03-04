define(["MovieService"], function(movieService){
  return {
    onInitialize: function() {
      this.view.lstMovies.onRowClick = this.onRowClicked.bind(this);
      this.view.btnSearch.onClick = Utility.navigateTo.bind(null, "frmSearch", {searchFor: "movies"});
      this.view.btnMovie.onClick = this.loadMovieList.bind(this, "popular", this.view.btnMovie);
      this.view.btnTVShow.onClick = this.loadTVShowList.bind(this);
      this.view.btnInTheatres.onClick = this.loadMovieList.bind(this, "now_playing", this.view.btnInTheatres);
      this.view.btnGoToNearestCinemas.onClick = Utility.navigateTo.bind(null, "frmSearch", {searchFor: "movies"});
      
      this.view.onDeviceBack = Utility.goBack;
      
      kony.application.showLoadingScreen();
      
      
      movieService.getMovieList(function(movieList) {
        this.onMovieListReceived(movieList);
      }.bind(this), function() {
        alert("Error while retrieving movie list");
        kony.application.dismissLoadingScreen();
      }, "popular");
      this.view.btnMovie.skin = "sknBtnNavigateActive";
      this.view.btnTVShow.skin = "sknBtnNavigateInActive";
      this.view.btnInTheatres.skin = "sknBtnNavigateInActive";
    },
    
    loadMovieList: function(url, btn) {  
      kony.application.showLoadingScreen();
      
      movieService.getMovieList(function(movieList) {
        this.onMovieListReceived(movieList);
      }.bind(this), function() {
        alert("Error while retrieving movie list");
        kony.application.dismissLoadingScreen();
      }, url);
      this.view.btnMovie.skin = "sknBtnNavigateInActive";
      this.view.btnTVShow.skin = "sknBtnNavigateInActive";
      this.view.btnInTheatres.skin = "sknBtnNavigateInActive";
      btn.skin = "sknBtnNavigateActive";
    },
    
    loadTVShowList: function() {  
      kony.application.showLoadingScreen();
      
      movieService.getTVShowList(function(TVShowList) {
        this.onMovieListReceived(TVShowList);
      }.bind(this), function() {
        alert("Error while retrieving TV show list");
        kony.application.dismissLoadingScreen();
      });
      this.view.btnMovie.skin = "sknBtnNavigateInActive";
      this.view.btnInTheatres.skin = "sknBtnNavigateInActive";
      this.view.btnTVShow.skin = "sknBtnNavigateActive";
    },

    onRowClicked: function(widgetRef, sectionIndex, rowIndex) {
      Utility.navigateTo("frmMovieDetails", {id: widgetRef.data[rowIndex].id, type: widgetRef.data[rowIndex].type});
    },

    onMovieListReceived: function(movieList) {
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
  
      this.view.lstMovies.setData(movieListData);
      kony.application.dismissLoadingScreen();
    }
  };
});