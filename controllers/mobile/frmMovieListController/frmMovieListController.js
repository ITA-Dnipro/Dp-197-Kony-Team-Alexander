define({
  onInitialize: function() {
    this.view.postShow = this.onFormShowed.bind(this);
    this.view.btnBack.onClick = function () {
      var navigation = new kony.mvc.Navigation(kony.application.getPreviousForm().id);
      navigation.navigate();
    }.bind(this);
  },
  
  onFormShowed: function() {
    this.loadMovieList();
  },
  
  loadMovieList: function() {
    kony.application.showLoadingScreen();
    
    // Creation phase
    var httpClient = new kony.net.HttpRequest();
    // Setup phase
    httpClient.open(constants.HTTP_METHOD_GET, "https://api.themoviedb.org/3/movie/popular?api_key=69f776e126f6211fe76798c6c4b786f9&language=en-US&page=1");
    httpClient.onReadyStateChange = this.onMovieListReceived.bind(this, httpClient);
    
    // Action
    httpClient.send();
  },
  
  onMovieListReceived: function(httpClient) {
    kony.print("Movie List Retrieval State Change: " + httpClient.readyState);

    if(httpClient.readyState !== constants.HTTP_READY_STATE_DONE) {
      return;
    }
    
      
    var movieData = httpClient.response;
    var listData = movieData.results.map(function(m) {
      return {
        lblMovieTitle: m.title,
        lblDescription: m.overview,
        imgMoviePoster: "https://image.tmdb.org/t/p/w200/" + m.poster_path
      };
    });

    this.view.lstMovies.setData(listData);
    kony.application.dismissLoadingScreen();

  }

});