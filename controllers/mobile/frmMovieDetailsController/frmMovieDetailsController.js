define({ 

  onInitialize: function() {
    this.view.btnBack.onClick = Utility.goBack;
    this.view.lstSimilarMovies.onRowClick = this.onRowClicked.bind(this);
  },

  onNavigate: function(movieId) {

    if (typeof movieId === 'object') {
      this.movieId = movieId.id;
    } else {
      this.movieId = 508442;
    }

    this.loadMovieDetails(this.movieId);
    this.loadSimilarMovieList(this.movieId);
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

  onMovieDetailsReceived: function(httpClient) {

    if(httpClient.readyState === constants.HTTP_READY_STATE_DONE)
    {
      var movieData = httpClient.response;

      this.view.lblCountryInfo.text = "US, GB";

      var movieDurationHours = Math.trunc(movieData.runtime / 60);
      var movieDurationMinutes = movieData.runtime % 60;
      var releasedYear = (new Date(movieData.release_date)).getFullYear();
      var genresList = movieData.genres.map(function(g) {
        return g.name;
      });

      this.view.lblDurationInfo.text = movieDurationHours + "h " + movieDurationMinutes + "m";
      this.view.lblReleasedInfo.text = String(releasedYear);	
      this.view.lblGenresInfo.text = genresList.join(', ');
      this.view.lblDescriptionInfo.text = movieData.overview;
      this.view.lblMovieRating.text = movieData.vote_average;
      this.view.imgMoviePoster.src = "https://image.tmdb.org/t/p/w200/" + movieData.poster_path;
      this.view.imgBackground.src = "https://image.tmdb.org/t/p/w200/" + movieData.backdrop_path;
      this.view.lblMovieTitle.text = movieData.title;

      kony.application.dismissLoadingScreen();
    } 
  }
});