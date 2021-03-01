define(["FavouriteListService"], function(favouriteListService){
  return {
    onInitialize: function() {
      this.view.lstMovies.onRowClick = this.onRowClicked.bind(this);
      this.view.btnBack.onClick = Utility.goBack;
//       this.view.btnBack.onClick = Utility.navigateTo.bind(null, "frmMovieList");
      
      this.view.onDeviceBack = Utility.goBack;
    },

    onNavigate: function() {  
      kony.application.showLoadingScreen();

      favouriteListService.getFavouriteMovies(UserId, function(movieList) {
        this.onMovieListReceived(movieList);
      }.bind(this), function() {
        alert("Error while retrieving movie list");
        kony.application.dismissLoadingScreen();
      });
    },

    onRowClicked: function(widgetRef, sectionIndex, rowIndex) {
      Utility.navigateTo("frmMovieDetails", {id: widgetRef.data[rowIndex].id, type: widgetRef.data[rowIndex].type});
    },

    onMovieListReceived: function(movieList) {
      var lst = this.view.lstMovies;
      var movieListData = movieList.map(function(m) {
        return {
          lblMovieTitle: m.title,
          lblMovieGenres: m.genres,
          lblMovieReleasDate: m.released,
          lblMovieType: m.type,
          imgMoviePoster: m.poster_path,
          id: m.id,
          type: m.type,
          btnDeleteMoviFromList: {
            text: "\uf00d",
            onClick: function() {
              var rowIndex = arguments[1].rowIndex;
              lst.removeAt(rowIndex);
              favouriteListService.getFavouriteMovies(UserId, function(favList) {
                favouriteListService.deleteFavouriteList(favList[rowIndex].dbId, function() {
                  alert("Deleted");
                }, function() {
                alert("Error while deleting favourite movie list");
              });
              }, function() {
                alert("Error while retrieving favourite movie list");
              });
            }
          }
        };
      });

      this.view.lstMovies.setData(movieListData);
      kony.application.dismissLoadingScreen();
    }
  };
});