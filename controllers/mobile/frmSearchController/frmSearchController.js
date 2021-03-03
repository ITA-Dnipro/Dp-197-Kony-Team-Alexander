define(["MovieService"], function(movieService){
  return {
    onInitialize: function() {
      this.view.lstMovies.onRowClick = this.onRowClicked.bind(this);
      this.view.btnBack.onClick = Utility.goBack;
      this.view.onDeviceBack = Utility.goBack;
      this.view.btnDeleteText.onClick = this.onBtnDeleteTextClicked.bind(this);
      this.view.inpSearch.onBeginEditing = this.showBtnDeleteText.bind(this);
      this.view.inpSearch.onTextChange = this.showBtnDeleteText.bind(this);
      this.view.inpSearch.keyboardActionLabel = constants.TEXTBOX_KEYBOARD_LABEL_SEARCH;
      
      this.searchFor = "movie";
      this.view.btnMovies.onClick = this.onChangeSearchFor.bind(this, "movies", this.view.btnMovies);
      this.view.btnTVShows.onClick = this.onChangeSearchFor.bind(this, "tv shows", this.view.btnTVShows);
      this.view.btnPeople.onClick = this.onChangeSearchFor.bind(this, "people", this.view.btnPeople);
    },
    
    onChangeSearchFor: function(search, btn) {
      this.searchFor = search;
      alert('curr ' + this.searchFor);
      this.view.btnMovies.skin = "sknBtnNavigateInActive";
      this.view.btnTVShows.skin = "sknBtnNavigateInActive";
      this.view.btnPeople.skin = "sknBtnNavigateInActive";
      btn.skin = "sknBtnNavigateActive";
      
      this.view.inpSearch.placeholder = "Search for " + this.searchFor;
      this.view.inpSearch.setFocus(true);
    },

    onNavigate: function(data) {  
      this.view.inpSearch.text = "";
      this.view.inpSearch.setFocus(true); // it doesn't work
      
      if (data) {
        switch (true) {
          case data.searchFor === "movies": {
            this.onChangeSearchFor(data.searchFor, this.view.btnMovies);
            break;
          }
          case data.searchFor === "tv shows": {
            this.onChangeSearchFor(data.searchFor, this.view.btnTVShows);
            break;
          }
          case data.searchFor === "people": {
            this.onChangeSearchFor(data.searchFor, this.view.btnPeople);
            break;
          }            
        }
        this.view.lstMovies.setData({});
      }
      
      this.view.lblNotFound.isVisible = false;

      this.view.btnSearch.onClick = this.loadResultList.bind(this);
      this.view.inpSearch.onDone = this.loadResultList.bind(this);
    },

    loadResultList: function() {     
      if (this.view.inpSearch.text.trim().length < 1) {
        return;
      }
      kony.application.showLoadingScreen();
      this.view.lstMovies.isVisible = true;
      
      if (this.searchFor === "movies") {
        movieService.searchMovie(function(resultList) {
          this.onResultListReceived(resultList);
        }.bind(this), function() {
          this.view.lstMovies.isVisible = false;
          alert("Error while retrieving search movie list");
          kony.application.dismissLoadingScreen();
        }, this.view.inpSearch.text.trim());
      }
      
      if (this.searchFor === "people") {
        movieService.searchPeople(function(resultList) {
          this.onResultListReceived(resultList);
        }.bind(this), function() {
          this.view.lstMovies.isVisible = false;
          alert("Error while retrieving search people list");
          kony.application.dismissLoadingScreen();
        }, this.view.inpSearch.text.trim());
      }
      
      if (this.searchFor === "tv shows") {
        movieService.searchTvShows(function(resultList) {
          this.onResultListReceived(resultList);
        }.bind(this), function() {
          this.view.lstMovies.isVisible = false;
          alert("Error while retrieving search tv list");
          kony.application.dismissLoadingScreen();
        }, this.view.inpSearch.text.trim());
      }
    },

    onRowClicked: function(widgetRef, sectionIndex, rowIndex) {      
      if (widgetRef.data[rowIndex].type === "person") {
        Utility.navigateTo("frmPersonInfo", {id: widgetRef.data[rowIndex].id, role: widgetRef.data[rowIndex].role});
      }
      
      if (widgetRef.data[rowIndex].type === "movie" || widgetRef.data[rowIndex].type === "tv") {
        Utility.navigateTo("frmMovieDetails", {id: widgetRef.data[rowIndex].id, type: widgetRef.data[rowIndex].type});        
      }
    },

    onResultListReceived: function(resultList) {    
      if (resultList.length === 0) {
        this.view.lstMovies.isVisible = false;
        this.view.lblNotFound.isVisible = true;
      } else {
        this.view.lblNotFound.isVisible = false;
        
        var resultListData = resultList.map(function(r) {
          return {
            lblMovieTitle: r.name || r.title,
            lblMovieGenres: r.knownFor || r.genreNamesList.join(', '),
            lblMovieYear: r.released !== undefined ? String(r.released) : "",
            imgMoviePoster: r.poster,
            id: r.id,
            type: r.type,
            role: r.knownFor === "Known for: Acting" ? "cast" : "crew"
          };
        });

        this.view.lstMovies.isVisible = true;
        this.view.lstMovies.setData(resultListData); 
      }
      
      kony.application.dismissLoadingScreen();
    },

    onBtnDeleteTextClicked: function() {
      this.view.inpSearch.text = "";
      this.view.btnDeleteText.isVisible = false;
    },

    showBtnDeleteText: function() {
      this.view.btnDeleteText.isVisible = true;
    }
  };
});