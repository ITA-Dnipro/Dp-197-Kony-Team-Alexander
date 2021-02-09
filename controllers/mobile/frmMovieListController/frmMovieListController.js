define(["MovieService"], function(movieService){
  return {
    onInitialize: function() {
      this.view.lstMovies.onRowClick = this.onRowClicked.bind(this);
      this.view.btnProfile.onClick = Utility.navigateTo.bind(null, "frmAuthentication");
      this.view.btnPopular.onClick = this.loadMovieList.bind(this, "popular");
      this.view.btnTopRated.onClick = this.loadMovieList.bind(this, "top_rated");
      this.view.btnInTheatres.onClick = this.loadMovieList.bind(this, "now_playing");
      this.view.btnUpcoming.onClick = this.loadMovieList.bind(this, "upcoming");
    },

    onNavigate: function() {      
      movieService.getMovieList(function(movieList) {
        this.onMovieListReceived(movieList);
      }.bind(this), function() {
        alert("Error while retrieving movie list");
        kony.application.dismissLoadingScreen();
      }, "popular");
    },
    
    loadMovieList: function(url) {      
      movieService.getMovieList(function(movieList) {
        this.onMovieListReceived(movieList);
      }.bind(this), function() {
        alert("Error while retrieving movie list");
        kony.application.dismissLoadingScreen();
      }, url);
    },

    onRowClicked: function(widgetRef, sectionIndex, rowIndex) {
      Utility.navigateTo("frmMovieDetails", widgetRef.data[rowIndex].id);
    },

    onMovieListReceived: function(movieList) {
      var movieListData = movieList.map(function(m) {
        return {
          lblMovieTitle: m.title,
          lblMovieGenres: m.genreNamesList.join(', '),
          imgMoviePoster: m.poster,
          id: m.id,
        };
      });
  
      this.view.lstMovies.setData(movieListData);
      kony.application.dismissLoadingScreen();
    }
  }
});