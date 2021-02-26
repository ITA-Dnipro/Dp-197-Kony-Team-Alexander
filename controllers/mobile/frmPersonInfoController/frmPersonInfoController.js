define(["MovieService"], function(movieService){ 

  return {
    onInitialize: function() {
      this.view.btnGet.onClick = this.onGetClicked.bind(this, {id: 1810, role: "actor"});
//       this.view.btnShowActing.onClick = this.onShowBtnClicked.bind(this, this.view.btnShowActing, "Acting", this.view.lstActingMovies);
      //       this.view.btnBack.onClick = Utility.goBack;
      this.view.ActingList.lstMovies.onRowClick = this.onMovieRowClicked.bind(this);
    },



    onNavigate: function(personData) {
      if (personData) {
        this.personData = personData;
      }

//       this.view.btnShowActing.text = "Acting   \uf078";
//       this.view.btnShowDirecting.text = "Directing   \uf078";
//       this.view.btnShowProduction.text = "Production   \uf078";
//       this.view.btnShowWriting.text = "Writing   \uf078";

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
    
    onMovieRowClicked: function(widgetRef, sectionIndex, rowIndex) {     
      Utility.navigateTo("frmMovieDetails", {id: widgetRef.data[rowIndex].id});
    },

    onGetClicked: function(personData) {
      //       alert(personData.id);

      kony.application.showLoadingScreen();

      movieService.getPersonInfo(function(personInfo) {
        this.onPersonInfoReceived(personInfo);
        kony.application.dismissLoadingScreen();
      }.bind(this), function() {
        alert("Error while retrieving person info");
        kony.application.dismissLoadingScreen();
      }, personData.id);

      movieService.getPersonCredits(function(credits) {
        this.onPersonCreditsReceived(credits);
        kony.application.dismissLoadingScreen();
      }.bind(this), function() {
        alert("Error while retrieving person credits");
        kony.application.dismissLoadingScreen();
      }, personData.id, personData.role);

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
            id: "lblBestMovieName" + i,
            text: creditsList.popularList[i].name,
            top: "5dp",
            left: "0dp",
            width: "100%",
            height: kony.flex.USE_PREFERRED_SIZE,
            isVisible: true,
            skin: "sknBtnTitleInPerson",
            onClick: this.onMovieClicked.bind(null, creditsList.popularList[i].id)
          }, {
            padding: [0,0,0,0],
            margin: [0,0,0,0],
            contentAlignment: constants.CONTENT_ALIGN_CENTER,
          });

          flexBestMovie.add(imgBestMovie, btnBestMovieName);

          this.view.flxBestMoviesCarousel.add(flexBestMovie);
        }		
      }

      if (creditsList.actingList.length === 0) {
        this.view.ActingList.isVisible = false;

      } else {
        var actingList = creditsList.actingList.map(function(m) {
          return {
            lblYear: String(m.year),
            id: m.id,
            lblMovieTitle: m.title,
            lblRole: m.character            
          };
        });
        this.view.ActingList.lstMovies.setData(actingList);
        this.view.ActingList.lstMovies.isVisible = false;
      }
    },

    onMovieClicked: function(movieId) {
      Utility.navigateTo("frmMovieDetails", {id: movieId});
    },
  };
});