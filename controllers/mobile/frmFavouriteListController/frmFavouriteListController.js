define(["FavouriteListService"], function(favouriteListService){
  return {
    onInitialize: function() {
      this.view.lstMovies.onRowClick = this.onRowClicked.bind(this);
      this.view.btnBack.onClick = Utility.navigateTo.bind(null, "frmMovieList");
    },

    onNavigate: function() {  
      kony.application.showLoadingScreen();
      alert(UserId);

      favouriteListService.getFavouriteMovies(UserId, function(movieList) {
        alert("1: " + movieList);
        this.onMovieListReceived(movieList);
      }.bind(this), function() {
        alert("Error while retrieving movie list");
        kony.application.dismissLoadingScreen();
      });
    },

    onRowClicked: function(widgetRef, sectionIndex, rowIndex) {
      Utility.navigateTo("frmMovieDetails", {id: widgetRef.data[rowIndex].id});
    },
      
    onMovieListReceived: function(movieList) {
      alert(movieList);
            var lst = this.view.lstMovies;
      var movieListData = movieList.map(function(m) {
        return {
          lblMovieTitle: m.title,
//           lblMovieDescription: m.genreNamesList.join(', '),
          lblMovieDescription: m.genres,
//           lblMovieYear: String(m.released),
          imgMoviePoster: m.poster_path,
          id: m.id,
          btnDeleteMoviFromList: {
            text: "\uf00d",
            onClick: function() {
              lst.removeAt(arguments[1].rowIndex);
            }
          }
        };
      });

      this.view.lstMovies.setData(movieListData);
      kony.application.dismissLoadingScreen();
    }
  };
});