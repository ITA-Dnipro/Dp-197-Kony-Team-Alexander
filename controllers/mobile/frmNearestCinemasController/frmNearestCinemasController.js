define(["MapService"], function (nearestCinemas) {

  return { 
    onInitialize: function () {
      this.view.mapControl.showCurrentLocation = true;
      this.view.BackHeader.btnBackHeader.onClick = Utility.goBack;
      this.view.onDeviceBack = Utility.goBack;
      this.view.mapControl.widgetDataMapForCallout = {
        lblCalloutName: "name",
        lblCalloutVicinity: "vicinity",
      };
    },

    onNavigate: function(){
      var mapControl = this.view.mapControl;
      kony.location.getCurrentPosition(function(position) {
        nearestCinemas.getNearestCinemas(position.coords.latitude, position.coords.longitude, function(cinemaList){
          mapControl.addPins(cinemaList);
          mapControl.navigateTo(1, false);
        }, function(){
          alert("Error while retrieving cinemas list");
        }); 
      }, function(error) {
        alert("Cannot read current location:\n" + JSON.stringify(error));
      }, {
        accuracyMode: constants.ACCURACY_NO_POWER,
        enableHighAccuracy: false,
        timeout: 2000,
        useBestProvider: true
      });
    }
  };
});
