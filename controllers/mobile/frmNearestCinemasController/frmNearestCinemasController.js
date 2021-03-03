define(["MapServiceFabricImpl"], function(){ 
  return { 
    onInitialize: function() {
    this.view.BackHeader.btnBackHeader.onClick = Utility.goBack; 
    this.view.mapCinemaWidget.showCurrentLocation = true;
    this.view.btnGetLocation.onClick = this.onGetLocationClicked.bind(this);   
    },
    
    onGetLocationClicked: function(){
      kony.location.getCurrentPosition(
        function(position){
          alert("Current location:\n" + JSON.stringify(position))
        }, 
        function(eror){
          alert("Cannot read current location:\n" + JSON.stringify(eror))
        }, 
        {
          accuracyMode: constants.ACCURACY_NO_POWER,
          enableHighAccuracy: false,
          timeout: 2000,
          useBestProvider: true,
        });
    },
//     getLocation: function(){
//       //change path
//       frmNearestCinemas.mapCinemaWidget.showCurrentLocation = true;
//       //Sample code to set the locationData property of a Map widget.
//       frmNearestCinemas.mapCinemaWidget.locationData = [{
//         lat: "17.445775",
//         lon: "78.3731",
//         name: "Campus 1",
//         desc: "My Office Campus",
//         color: "green",
//         label: "C",
//       }];
//     }
    
    
  }
});