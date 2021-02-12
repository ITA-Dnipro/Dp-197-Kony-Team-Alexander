define(["MovieService"], function(movieService){
  return {
    onInitialize: function() {
      this.view.lstMovies.onRowClick = this.onRowClicked.bind(this);
      this.view.btnProfile.onClick = Utility.navigateTo.bind(null, "frmAuthentication");
      this.view.btnPopular.onClick = this.loadMovieList.bind(this, "popular", this.view.btnPopular);
      this.view.btnTopRated.onClick = this.loadMovieList.bind(this, "top_rated", this.view.btnTopRated);
      this.view.btnInTheatres.onClick = this.loadMovieList.bind(this, "now_playing", this.view.btnInTheatres);
      this.view.btnUpcoming.onClick = this.loadMovieList.bind(this, "upcoming", this.view.btnUpcoming);
    },

    onNavigate: function() {  
      kony.application.showLoadingScreen();
      
      movieService.getMovieList(function(movieList) {
        this.onMovieListReceived(movieList);
      }.bind(this), function() {
        alert("Error while retrieving movie list");
        kony.application.dismissLoadingScreen();
      }, "popular");
      this.view.btnPopular.skin = "sknBtnNavigateActive";
      this.view.btnTopRated.skin = "sknBtnNavigateInActive";
      this.view.btnInTheatres.skin = "sknBtnNavigateInActive";
      this.view.btnUpcoming.skin = "sknBtnNavigateInActive";
    },
    
    loadMovieList: function(url, btn) {  
      kony.application.showLoadingScreen();
      
      movieService.getMovieList(function(movieList) {
        this.onMovieListReceived(movieList);
      }.bind(this), function() {
        alert("Error while retrieving movie list");
        kony.application.dismissLoadingScreen();
      }, url);
      this.view.btnPopular.skin = "sknBtnNavigateInActive";
      this.view.btnTopRated.skin = "sknBtnNavigateInActive";
      this.view.btnInTheatres.skin = "sknBtnNavigateInActive";
      this.view.btnUpcoming.skin = "sknBtnNavigateInActive";
      btn.skin = "sknBtnNavigateActive";
    },

    onRowClicked: function(widgetRef, sectionIndex, rowIndex) {
      Utility.navigateTo("frmMovieDetails", {id: widgetRef.data[rowIndex].id});
    },

    onMovieListReceived: function(movieList) {
      var movieListData = movieList.map(function(m) {
        return {
          lblMovieTitle: m.title,
          lblMovieGenres: m.genreNamesList.join(', '),
          lblMovieYear: String(m.released),
          imgMoviePoster: m.poster,
          id: m.id,
        };
      });
  
      this.view.lstMovies.setData(movieListData);
      kony.application.dismissLoadingScreen();
    }
  };
});