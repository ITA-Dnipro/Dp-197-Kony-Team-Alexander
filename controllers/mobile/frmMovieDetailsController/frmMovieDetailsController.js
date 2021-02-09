define(["MovieService"], function(movieService){ 
  this.id = 508442;
  
  return {
    onInitialize: function() {
      this.view.btnBack.onClick = Utility.goBack;
      this.view.lstSimilarMovies.onRowClick = this.onRowClicked.bind(this);
      this.view.btnFavorite.onClick = this.onbtnFavoriteClicked.bind(this);
    },
    
    onbtnFavoriteClicked: function() {
      movieService.getMovieDetails(function(movieDetails) {
//         alert(JSON.stringify(movieDetails));
//         alert(this);
//         alert(this.view);
//         this.view.lblMovieTitle.text = movieDetails.title;
        this.onMovieDetailsReceived(movieDetails);
//         alert("success");
        kony.application.dismissLoadingScreen();
      }.bind(this), function() {
        alert("Error while retrieving movie details");
        kony.application.dismissLoadingScreen();
      }.bind(this), 508442);
    },
   

    onNavigate: function(movieId) {
//       this.view.lblMovieTitle.text = movieId.id;
      movieService.getMovieDetails(function(movieDetails) {
//         alert(JSON.stringify(movieDetails));
//         alert(this);
//         alert(this.view);
//         this.view.lblMovieTitle.text = movieDetails.title;
        this.onMovieDetailsReceived(movieDetails);
//         alert("success");
        kony.application.dismissLoadingScreen();
      }.bind(this), function() {
        alert("Error while retrieving movie details");
        kony.application.dismissLoadingScreen();
      }, movieId.id);
      
//       movieService.getSimilarMovieList(movieId);
//       this.loadMovieDetails(movieId);
//       this.loadSimilarMovieList(movieId);
    },

    onRowClicked: function(widgetRef, sectionIndex, rowIndex) {
      this.loadMovieDetails(widgetRef.data[rowIndex].id);
      this.loadSimilarMovieList(widgetRef.data[rowIndex].id);

      this.view.flxMainScroll.contentOffset = {
        "x": "0dp",
        "y": "0dp"
      };
    },

    loadSimilarMovieList: function(movieId) {
      kony.application.showLoadingScreen();

      var httpClient = new kony.net.HttpRequest();

      var link = "https://api.themoviedb.org/3/movie/" + movieId + "/similar?api_key=69f776e126f6211fe76798c6c4b786f9&language=en-US&page=1";
      httpClient.open(constants.HTTP_METHOD_GET, link);
      httpClient.onReadyStateChange = this.onSimilarMovieListReceived.bind(this, httpClient);

      httpClient.send();
    },  

    loadMovieDetails: function(movieId) {
      kony.application.showLoadingScreen();

      var httpClient = new kony.net.HttpRequest();

      var link = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=69f776e126f6211fe76798c6c4b786f9&language=en-US";
      httpClient.open(constants.HTTP_METHOD_GET, link);
      httpClient.onReadyStateChange = this.onMovieDetailsReceived.bind(this, httpClient);

      httpClient.send();
    }, 

    onSimilarMovieListReceived: function(httpClient) {

      if(httpClient.readyState === constants.HTTP_READY_STATE_DONE)
      {
        var movieData = httpClient.response;
        if (movieData.results.length === 0) {
          this.view.lblTitleSimilar.opacity = 0;
          this.view.lstSimilarMovies.setData({});
        } else {
          var similarListData = movieData.results.map(function(m) {
            return {
              lblMovieTitle: m.title,
              lblMovieDescription: m.overview,
              imgMoviePoster: "https://image.tmdb.org/t/p/w200/" + m.poster_path,
              id: m.id,
            };
          });
          this.view.lblTitleSimilar.opacity = 1;
          this.view.lstSimilarMovies.setData(similarListData);
        }			

        kony.application.dismissLoadingScreen();
      } 
    },

    onMovieDetailsReceived: function(movieData) {
      kony.print("Movie List Received " + movieData.title);
    
      this.view.lblCountryInfo.text = movieData.countriesList.join(', ');
      this.view.lblDurationInfo.text = movieData.duration;
      this.view.lblReleasedInfo.text = String(movieData.released);	
      this.view.lblGenresInfo.text = movieData.genresList.join(', ');
      this.view.lblDescriptionInfo.text = movieData.description;
      this.view.lblMovieRating.text = movieData.voteAvg;
      this.view.imgMoviePoster.src = movieData.poster;
      this.view.imgBackground.src = movieData.backdrop;
      this.view.lblMovieTitle.text = movieData.title;

      kony.application.dismissLoadingScreen();
    }
    
  }
});