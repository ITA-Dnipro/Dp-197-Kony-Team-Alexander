define({
  onInitialize: function() {
    this.view.postShow = this.onFormShowed.bind(this);
//  this.view.lstMovies.onRowClick = Utility.navigateTo.bind(null, "frmMovieDetails");
    this.view.lstMovies.onRowClick = this.onRowClicked.bind(this);
    this.view.btnProfile.onClick = Utility.navigateTo.bind(null, "frmAuthentication");
    this.view.btnPopular.onClick = this.loadMovieList.bind(this, "popular");
    this.view.btnTopRated.onClick = this.loadMovieList.bind(this, "top_rated");
    this.view.btnInTheatres.onClick = this.loadMovieList.bind(this, "now_playing");
    this.view.btnUpcoming.onClick = this.loadMovieList.bind(this, "upcoming");
  },
  
  onRowClicked: function(widgetRef, sectionIndex, rowIndex) {
    Utility.navigateTo("frmMovieDetails", widgetRef.data[rowIndex].id);
  },
  
  onFormShowed: function() {
    this.loadMovieList.bind(null, "popular");
  },
  
  loadMovieList: function(url) {
    kony.application.showLoadingScreen();
    var httpClient = new kony.net.HttpRequest();
    httpClient.open(constants.HTTP_METHOD_GET, "https://api.themoviedb.org/3/movie/" + url +"?api_key=69f776e126f6211fe76798c6c4b786f9&language=en-US&page=1");
    httpClient.onReadyStateChange = this.onMovieListReceived.bind(this, httpClient);
    httpClient.send();
//     this.view[btn].skin = "sknBtnNavigateActive";
  },
  
  onMovieListReceived: function(httpClient) {
    kony.print("Movie List Retrieval State Change: " + httpClient.readyState);

    if(httpClient.readyState !== constants.HTTP_READY_STATE_DONE) {
      return;
    }
    
      
    var movieData = httpClient.response;
    var listData = movieData.results.map(function(m) {
      return {
        id: m.id,
        lblMovieTitle: m.title,
        lblMovieDescription: m.overview,
        imgMoviePoster: "https://image.tmdb.org/t/p/w200/" + m.poster_path
      };
    });

    this.view.lstMovies.setData(listData);
    kony.application.dismissLoadingScreen();

  }

});