define(["MovieService"], function(movieService){ 
  
  return {
    onInitialize: function() {
      this.view.btnBack.onClick = Utility.goBack;
      this.view.lstSimilarMovies.onRowClick = this.onSimilarMoviesRowClicked.bind(this);
      this.view.btnFavorite.onClick = this.onbtnFavoriteClicked.bind(this);
    },
    
    onbtnFavoriteClicked: function() {

    },

    onNavigate: function(movieId) {
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
    },

    onSimilarMoviesRowClicked: function(widgetRef, sectionIndex, rowIndex) {
      
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

      this.view.flxMainScroll.contentOffset = {
        "x": "0dp",
        "y": "0dp"
      };
    },

    onSimilarMovieListReceived: function(movieList) {
      if (movieList.length === 0) {
        this.view.lblTitleSimilar.opacity = 0;
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
        this.view.lblTitleSimilar.opacity = 1;
        this.view.lstSimilarMovies.setData(similarListData);
      }			
    },

    onMovieDetailsReceived: function(movieData) {    
      this.view.lblCountryInfo.text = movieData.countriesList.join(', ');
      this.view.lblDurationInfo.text = movieData.duration;
      this.view.lblReleasedInfo.text = String(movieData.released);	
      this.view.lblGenresInfo.text = movieData.genreNamesList.join(', ');
      this.view.lblDescriptionInfo.text = movieData.description;
      this.view.lblMovieRating.text = movieData.voteAvg;
      this.view.imgMoviePoster.src = movieData.poster;
      this.view.imgBackground.src = movieData.backdrop;
      this.view.lblMovieTitle.text = movieData.title;
    }   
  }
});