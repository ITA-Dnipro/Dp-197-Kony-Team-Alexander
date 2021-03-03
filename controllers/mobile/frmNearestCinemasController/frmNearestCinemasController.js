define(["MapService"], function (nearestCinemas) {

  return { 
    onInitialize: function () {
      this.view.mapControl.showCurrentLocation = true;
      this.view.BackHeader.btnBackHeader.onClick = Utility.goBack;
//       this.view.mapControl.widgetDataMapForCallout = {
//         lblName: "name",
//         lblDescription: "description",
//         imgLocation: "image"
//       };
      this.ourLocation = function () {
        kony.location.getCurrentPosition(function (position) {
          alert(JSON.stringify(position));
          return(position);
        }, function (error) {
          alert("Cannot read current location:\n" + JSON.stringify(error));
        }, {
          accuracyMode: constants.ACCURACY_NO_POWER,
          enableHighAccuracy: false,
          timeout: 2000,
          useBestProvider: true
        });
      };
    },
    
    postShow: function(){
      alert(this.location.latitude);
        nearestCinemas.getNearestCinemas(this.location.coords.latitude, this.location.coords.longitude, function(cinemaList){
        this.view.mapControl.addPins(cinemaList); 
          alert(cinemaList);
      }.bind(this), function(){
          alert("Error while retrieving cinemas list");
        }); 
//         [{
//         id: "id" + location.lat + location.lon,
//         lat: location.lat,
//         lon: location.lon,
//         image: {
//           source: "pin_location.png",
//           sourceType: kony.map.PIN_IMG_SRC_TYPE_RESOURCES,
//           anchor: kony.map.PIN_IMG_ANCHOR_BOTTOM_CENTER
//         },
        /*name: "Name " + pinCount,
        desc: "Description " + pinCount,
        navigateAndZoom: false,*/
        //         calloutData: {
        //           name: "Name " + pinCount,
        //           description: "Description " + pinCount,
        //           image: "https://ied.eu/wp-content/uploads/2019/01/horizon-europe.jpg"
        //         }
//       }]);
    } 
  };
});