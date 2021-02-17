define(["MovieService"], function(movieService){
  return {
    onInitialize: function() {
      this.view.lstMovies.onRowClick = this.onRowClicked.bind(this);
      this.view.btnSearch.onClick = this.loadMovieList.bind(this);
      this.view.btnBack.onClick = Utility.navigateTo.bind(null, "frmMovieList");
      this.view.btnDeleteText.onClick = this.onBtnDeleteTextClicked.bind(this);
      this.view.inpSearchMovie.onBeginEditing = this.showBtnDeleteText.bind(this);
      this.view.inpSearchMovie.onEndEditing = this.hideBtnDeleteText.bind(this);
      
//       this.view.btnUpcoming.onClick = this.loadMovieList.bind(this, "upcoming", this.view.btnUpcoming);
    },

    onNavigate: function() {  
      this.view.inpSearchMovie.text = "";
      this.view.inpSearchMovie.setFocus(true);
    },
    
    loadMovieList: function() { 
      if (this.view.inpSearchMovie.text.trim().length < 1) {
        return;
      }
      kony.application.showLoadingScreen();
      this.view.lstMovies.isVisible = true;
      
      movieService.searchMovie(function(movieList) {
        this.onMovieListReceived(movieList);
      }.bind(this), function() {
        this.view.lstMovies.isVisible = false;
        alert("Error while retrieving movie list");
        kony.application.dismissLoadingScreen();
      }, this.view.inpSearchMovie.text.trim());
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
    },
    
    onBtnDeleteTextClicked: function() {
      this.view.inpSearchMovie.text = "";
    },
    
    showBtnDeleteText: function() {
      this.view.btnDeleteText.isVisible = true;
    },
    
    hideBtnDeleteText: function() {
      this.view.btnDeleteText.isVisible = false;
    }
  };
});