define(["MovieService"], function(movieService){ 

  return {
    onInitialize: function() {
      this.view.btnBack.onClick = Utility.goBack;
      this.view.btnSearch.onClick = Utility.navigateTo.bind(null, "frmSearch", {searchFor: "people"});
      //       this.view.btnGet.onClick = this.onGetClicked.bind(this, {id: 1810, role: "actor"});
      //       this.view.btnShowActing.onClick = this.onShowBtnClicked.bind(this, this.view.btnShowActing, "Acting", this.view.lstActingMovies);
      //       this.view.btnBack.onClick = Utility.goBack;
      this.view.ActingList.lstMovies.onRowClick = this.onMovieRowClicked.bind(this);
      this.view.DirectingList.lstMovies.onRowClick = this.onMovieRowClicked.bind(this);
      this.view.ProductionList.lstMovies.onRowClick = this.onMovieRowClicked.bind(this);
      this.view.WritingList.lstMovies.onRowClick = this.onMovieRowClicked.bind(this);

      this.previousCB = this.view.ActingList.btnShow.onClick;

      this.view.ActingList.btnShow.onClick = this.onShowBtnClicked.bind(this, this.view.ActingList.btnShow, this.view.ActingList.lstMovies);
      this.view.DirectingList.btnShow.onClick = this.onShowBtnClicked.bind(this, this.view.DirectingList.btnShow, this.view.DirectingList.lstMovies);
      this.view.ProductionList.btnShow.onClick = this.onShowBtnClicked.bind(this, this.view.ProductionList.btnShow, this.view.ProductionList.lstMovies);
      this.view.WritingList.btnShow.onClick = this.onShowBtnClicked.bind(this, this.view.WritingList.btnShow, this.view.WritingList.lstMovies);
    },

    onNavigate: function(personData) {
      if (personData) {
        this.personData = personData;
      }
      
      alert(JSON.stringify(this.personData));

      //       alert(this.personData.id);
      this.view.ActingList.btnShow.text = "Acting   \uf078";
      this.view.DirectingList.btnShow.text = "Directing   \uf078";
      this.view.ProductionList.btnShow.text = "Production   \uf078";
      this.view.WritingList.btnShow.text = "Writing   \uf078";

      this.view.ActingList.btnShow.skin = "sknBtnRecommendedMovie";
      this.view.DirectingList.btnShow.skin = "sknBtnRecommendedMovie";
      this.view.ProductionList.btnShow.skin = "sknBtnRecommendedMovie";
      this.view.WritingList.btnShow.skin = "sknBtnRecommendedMovie";

      kony.application.showLoadingScreen();

      movieService.getPersonInfo(function(personInfo) {
        this.onPersonInfoReceived(personInfo);
        kony.application.dismissLoadingScreen();
      }.bind(this), function() {
        alert("Error while retrieving person info");
        kony.application.dismissLoadingScreen();
      }, this.personData.id);

      movieService.getPersonCredits(function(credits) {
        this.onPersonCreditsReceived(credits);
        kony.application.dismissLoadingScreen();
      }.bind(this), function() {
        alert("Error while retrieving person credits");
        kony.application.dismissLoadingScreen();
      }, this.personData.id, this.personData.role);
    },

    onShowBtnClicked: function(btn, lst) {
      lst.isVisible = !lst.isVisible;

      if (btn.skin === "sknBtnRecommendedMovie") {
        btn.skin = "sknBtnRecommendedMovieActive";
        btn.text = btn.text.slice(0, btn.text.length - 1) + "\uf054";

        var y = this.view.flxMainScroll.contentOffsetMeasured.y; 
//         alert(y + " h: " + this.view.flxMainScroll.height);
       
        this.view.flxMainScroll.setContentOffset({
          "x": "0dp",
          "y": y + 70 + "dp"
        }, true);
      } else {
        btn.skin = "sknBtnRecommendedMovie";
        btn.text = btn.text.slice(0, btn.text.length - 1) + "\uf078";
      }
    },

    onMovieRowClicked: function(widgetRef, sectionIndex, rowIndex) {     
      Utility.navigateTo("frmMovieDetails", {id: widgetRef.data[rowIndex].id, type: widgetRef.data[rowIndex].type});
    },

    onPersonInfoReceived: function(personInfo) {
      this.view.imgPeople.src = personInfo.img; 
      this.view.lblName.text = personInfo.name;
      this.view.lblBirthdayInfo.text = personInfo.birthday;
      this.view.lblPlaceOfBirthInfo.text = personInfo.placeOfBirth;
      this.view.lblKnownForInfo.text = personInfo.knownFor;
      this.view.lblAgeInfo.text = "(" + String(personInfo.age) + " years old)";

      if (personInfo.deathday) {
        this.view.flxDeath.isVisible = true;
        this.view.lblDeathInfo.text = personInfo.deathday;
      } else {
        this.view.flxDeath.isVisible = false;
      }
    },

    onPersonCreditsReceived: function(creditsList) {

      this.view.flxBestMoviesCarousel.removeAll();

      if (creditsList.popularList.length === 0) {
        this.view.flxBestMoviesCarousel.isVisible = false;
        this.view.lblKnownForMovies.isVisible = false;
      } else {
        this.view.flxBestMoviesCarousel.isVisible = true;
        this.view.lblKnownForMovies.isVisible = true;

        for (var i = 0; i < creditsList.popularList.length; i++) {
          var flexBestMovie = new kony.ui.FlexContainer({
            id: "flxBestMovie" + i,
            top: "0dp",
            left: "5dp",
            width: "130dp",
            height: kony.flex.USE_PREFERRED_SIZE,
            layoutType: kony.flex.FLOW_VERTICAL
          });

          var imgBestMovie = new kony.ui.Image2({
            id: "imgBestMovie" + i,
            src: creditsList.popularList[i].img,
            top: "0dp",
            width: "100%",
            height: "130dp",
          });

          var btnBestMovieName = new kony.ui.Button({
            id: "btnBestMovieName" + i,
            text: creditsList.popularList[i].name,
            top: "5dp",
            left: "0dp",
            width: "100%",
            height: kony.flex.USE_PREFERRED_SIZE,
            isVisible: true,
            skin: "sknBtnTitleInPerson",
            onClick: this.onMovieClicked.bind(null, creditsList.popularList[i].id, creditsList.popularList[i].type)
          }, {
            padding: [0,0,0,0],
            margin: [0,0,0,0],
            contentAlignment: constants.CONTENT_ALIGN_CENTER,
          });

          flexBestMovie.add(imgBestMovie, btnBestMovieName);

          this.view.flxBestMoviesCarousel.add(flexBestMovie);
        }		
      }

      // change list
      this.addDataToMovieList(creditsList.actingList, this.view.ActingList);
      this.addDataToMovieList(creditsList.directingList, this.view.DirectingList);
      this.addDataToMovieList(creditsList.productionList, this.view.ProductionList);
      this.addDataToMovieList(creditsList.writingList, this.view.WritingList);

      //       if (creditsList.actingList.length === 0) {
      //         this.view.ActingList.isVisible = false;
      //       } else {
      //         var actingList = creditsList.actingList.map(function(m) {
      //           return {
      //             lblYear: String(m.year),
      //             id: m.id,
      //             lblMovieTitle: m.title,
      //             lblRole: m.character            
      //           };
      //         });
      //         this.view.ActingList.lstMovies.setData(actingList);
      //         this.view.ActingList.lstMovies.isVisible = false;
      //       }
    },

    addDataToMovieList: function(movieList, viewComp) {
      if (movieList.length === 0) {
        viewComp.isVisible = false;
      } else {
        viewComp.isVisible = true;
        var readyMovieList = movieList.map(function(m) {
          return {
            lblYear: String(m.year),
            id: m.id,
            type: m.type,
            lblMovieTitle: m.title,
            lblRole: m.additionalInfo            
          };
        });
        viewComp.lstMovies.setData(readyMovieList);
        viewComp.lstMovies.isVisible = false;
      }      
    },

    onMovieClicked: function(movieId, type) {
      Utility.navigateTo("frmMovieDetails", {id: movieId, type: type});
    },
  };
});