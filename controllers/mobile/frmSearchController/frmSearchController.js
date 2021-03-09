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
      this.view.btnShowMore.onClick = this.onShowMoreClicked.bind(this);

      this.searchFor = "movie";
      this.view.btnMovies.onClick = this.onBtnMoviesClicked.bind(this, "movies", this.view.btnMovies);
      this.view.btnTVShows.onClick = this.onBtnTVShowsClicked.bind(this, "tv shows", this.view.btnTVShows);
      this.view.btnPeople.onClick = this.onBtnPeopleClicked.bind(this, "people", this.view.btnPeople);

      this.view.postShow = this.onFormShowed.bind(this);
    },

    onFormShowed: function() {
      this.view.inpSearch.setFocus(true);      
    },   

    onNavigate: function(data) {  
      this.view.inpSearch.text = "";

      if (data) {
        this.onBtnMoviesClicked(data.searchFor, this.view.btnMovies);
        this.view.lstMovies.setData(SearchMovieListData);
      }

      this.view.lblNotFound.isVisible = false;
      this.view.btnShowMore.isVisible = false;

      this.view.btnSearch.onClick = this.onSearchClicked.bind(this);
      this.view.inpSearch.onDone = this.onSearchClicked.bind(this);
    },

    loadResultList: function(pageNumber) {     
      if (this.view.inpSearch.text.trim().length < 1) {
        return;
      }
      kony.application.showLoadingScreen();
      this.view.lstMovies.isVisible = true;

      if (this.searchFor === "movies") {
        movieService.searchMovie(function(resultList) {
          this.onResultListReceived(resultList);
          if (TotalSearchMoviePages === 1) {
            this.view.btnShowMore.isVisible = false;
          }
        }.bind(this), function() {
          alert("Error while retrieving search movie list");
          kony.application.dismissLoadingScreen();
        }, this.view.inpSearch.text.trim(), pageNumber);
      }

      if (this.searchFor === "people") {
        movieService.searchPeople(function(resultList) {
          this.onResultListReceived(resultList);
          if (TotalSearchPeoplePages === 1) {
            this.view.btnShowMore.isVisible = false;
          }
        }.bind(this), function() {
          alert("Error while retrieving search people list");
          kony.application.dismissLoadingScreen();
        }, this.view.inpSearch.text.trim(), pageNumber);
      }

      if (this.searchFor === "tv shows") {
        movieService.searchTvShows(function(resultList) {
          this.onResultListReceived(resultList);
          if (TotalSearchTVShowPages === 1) {
            this.view.btnShowMore.isVisible = false;
          }
        }.bind(this), function() {
          alert("Error while retrieving search tv list");
          kony.application.dismissLoadingScreen();
        }, this.view.inpSearch.text.trim(), pageNumber);
      }
    },

    onSearchCategoryChange: function(search, btn) {
      this.searchFor = search;
      this.view.btnMovies.skin = "sknBtnNavigateInActive";
      this.view.btnTVShows.skin = "sknBtnNavigateInActive";
      this.view.btnPeople.skin = "sknBtnNavigateInActive";
      btn.skin = "sknBtnNavigateActive";

      this.view.inpSearch.placeholder = "Search for " + this.searchFor;
      this.view.inpSearch.setFocus(true);
      this.view.lblNotFound.isVisible = false;

      this.view.flxListContainer.setContentOffset({
        "x": "0dp",
        "y": "0dp"
      }, false);
    },

    onBtnPeopleClicked: function(search, btn) {
      this.onSearchCategoryChange(search, btn);
      SearchPeopleListData = [];
      this.view.btnShowMore.isVisible = false;
      this.view.lstMovies.setData(SearchPeopleListData);
    },

    onBtnMoviesClicked: function(search, btn) {
      this.onSearchCategoryChange(search, btn);
      SearchMovieListData = [];
      this.view.btnShowMore.isVisible = false;
      this.view.lstMovies.setData(SearchMovieListData);
    },

    onBtnTVShowsClicked: function(search, btn) {
      this.onSearchCategoryChange(search, btn);
      SearchTVShowData = [];
      this.view.btnShowMore.isVisible = false;
      this.view.lstMovies.setData(SearchTVShowData);
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
      var resultListData = resultList.map(function(r) {
        return {
          lblMovieTitle: r.name || r.title,
          lblMovieGenres: r.knownFor || r.genreNamesList.join(', ') || "Unknown",
          lblMovieYear: r.released !== undefined ? String(r.released) : "",
          imgMoviePoster: r.poster || r.img,
          id: r.id,
          type: r.type,
          role: r.knownFor === "Known for: Acting" ? "cast" : "crew"
        };
      });

      this.view.lstMovies.isVisible = true; 

      if (this.view.btnMovies.skin === "sknBtnNavigateActive") {
        SearchMovieListData = SearchMovieListData.concat(resultListData);
        this.view.lstMovies.setData(SearchMovieListData);
        if (SearchMovieListData.length === 0) {
          this.view.btnShowMore.isVisible = false;
          this.view.lblNotFound.isVisible = true;
        } else {
          TotalSearchMoviePages <= SearchMoviePageNumber ?
            this.view.btnShowMore.isVisible = false :
          this.view.btnShowMore.isVisible = true;
          this.view.lblNotFound.isVisible = false;
        }

        if (SearchMoviePageNumber > TotalSearchMoviePages) {
          this.view.btnShowMore.isVisible = false;
        }
      } else if (this.view.btnPeople.skin === "sknBtnNavigateActive") {
        SearchPeopleListData = SearchPeopleListData.concat(resultListData);
        this.view.lstMovies.setData(SearchPeopleListData);
        if (SearchPeopleListData.length === 0) {
          this.view.btnShowMore.isVisible = false;
          this.view.lblNotFound.isVisible = true;
        } else {
          TotalSearchPeoplePages <= SearchPeoplePageNumber ?
            this.view.btnShowMore.isVisible = false :
          this.view.btnShowMore.isVisible = true;
          this.view.lblNotFound.isVisible = false;
        }
        
        if (SearchPeoplePageNumber > TotalSearchPeoplePages) {
          this.view.btnShowMore.isVisible = false;
        }
      } else if (this.view.btnTVShows.skin === "sknBtnNavigateActive") {
        SearchTVShowData = SearchTVShowData.concat(resultListData);
        this.view.lstMovies.setData(SearchTVShowData);
        if (SearchTVShowData.length === 0) {
          this.view.btnShowMore.isVisible = false;
          this.view.lblNotFound.isVisible = true;
        } else {
          TotalSearchTVShowPages <= SearchTVShowPageNumber ?
            this.view.btnShowMore.isVisible = false :
          this.view.btnShowMore.isVisible = true;
          this.view.lblNotFound.isVisible = false;
        }

        if (SearchTVShowPageNumber > TotalSearchTVShowPages) {
          this.view.btnShowMore.isVisible = false;
        }
      }

      kony.application.dismissLoadingScreen();
    },

    onBtnDeleteTextClicked: function() {
      this.view.inpSearch.text = "";
      this.view.btnDeleteText.isVisible = false;
    },

    onShowMoreClicked: function() {
      var pageNumber;

      this.view.btnShowMore.isVisible = true;
      if (this.view.btnMovies.skin === "sknBtnNavigateActive") {
        pageNumber = SearchMoviePageNumber + 1;
        SearchMoviePageNumber++;
        if (SearchMoviePageNumber >= TotalSearchMoviePages) {
          this.view.btnShowMore.isVisible = false;
        }
        this.loadResultList(pageNumber);
      } else if (this.view.btnPeople.skin === "sknBtnNavigateActive") {
        pageNumber = SearchPeoplePageNumber + 1;
        SearchPeoplePageNumber++;
        if (SearchPeoplePageNumber >= TotalSearchPeoplePages) {
          this.view.btnShowMore.isVisible = false;
        }
        this.loadResultList(pageNumber);
      } else if (this.view.btnTVShows.skin === "sknBtnNavigateActive") {
        pageNumber = SearchTVShowPageNumber + 1;
        SearchTVShowPageNumber++;
        if (SearchTVShowPageNumber >= TotalSearchTVShowPages) {
          this.view.btnShowMore.isVisible = false;
        }
        this.loadResultList(pageNumber);
      }
    },

    onSearchClicked: function() {
      if (this.view.btnMovies.skin === "sknBtnNavigateActive") {
        SearchMovieListData = [];
        SearchMoviePageNumber = 1;
      } else if (this.view.btnPeople.skin === "sknBtnNavigateActive"){
        SearchPeopleListData = [];
        SearchPeoplePageNumber = 1;
      } else if (this.view.btnTVShows.skin === "sknBtnNavigateActive"){
        SearchTVShowData = [];
        SearchTVShowPageNumber = 1;
      }

      this.view.flxListContainer.setContentOffset({
        "x": "0dp",
        "y": "0dp"
      }, false);
      
      var pageNumber;

      if (this.view.btnMovies.skin === "sknBtnNavigateActive") {
        pageNumber = 1;
        this.loadResultList(pageNumber);
      } else if (this.view.btnPeople.skin === "sknBtnNavigateActive") {
        pageNumber = 1;
        this.loadResultList(pageNumber);
      } else if (this.view.btnTVShows.skin === "sknBtnNavigateActive") {
        pageNumber = 1;
        this.loadResultList(pageNumber);
      }
    },

    showBtnDeleteText: function() {
      this.view.btnDeleteText.isVisible = true;
    }
  };
});