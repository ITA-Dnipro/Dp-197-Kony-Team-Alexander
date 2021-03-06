define(["MapService"], function (nearestCinemas) {

  return { 
    onInitialize: function () {
      this.view.mapControl.showCurrentLocation = true;
      this.view.BackHeader.btnBackHeader.onClick = Utility.goBack;
      this.view.onDeviceBack = Utility.goBack;
      this.view.mapControl.widgetDataMapForCallout = {
        lblCalloutName: "name",
        lblCalloutVicinity: "vicinity",
        //               imgLocation: "image"
      };
      
     },
    
    onNavigate: function(){
        var mapControl = this.view.mapControl;
      kony.location.getCurrentPosition(function(position) {
        nearestCinemas.getNearestCinemas(position.coords.latitude, position.coords.longitude, function(cinemaList){
          mapControl.addPins(cinemaList);
          mapControl.navigateTo(1, false)
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
   
    },
    
//     onNavigate: function(){
//       var mapControl = this.view.mapControl;
//       kony.location.getCurrentPosition(function(position) {
//          var locationData = { 
//             lat : position.coords.latitude , 
//             lon : position.coords.longitude , 
//             name : "Current location" , 
//             desc : "Current location" }
//           mapControl.navigateToLocation(locationData, showcallout, dropPin) ( locationData , true , true );
//       }, function(error) {
//         alert("Cannot read current location:\n" + JSON.stringify(error));
//       }, {
//         accuracyMode: constants.ACCURACY_NO_POWER,
//         enableHighAccuracy: false,
//         timeout: 2000,
//         useBestProvider: true
//       });
     
    }
   
});

    //     onNavigate: function(){
    //       kony.location.getCurrentPosition(function (position) {
    //         nearestCinemas.getNearestCinemas(position.coords.latitude, position.coords.longitude, function(cinemaList){
    //           alert(JSON.stringify(this.view.mapControl));
    //           this.view.mapControl.addPins(cinemaList);
    //            alert(cinemaList);
    //         }, function(){
    //           alert("Error while retrieving cinemas list");
    //         }); 
    //       }.bind(this), function (error) {
    //         alert("Cannot read current location:\n" + JSON.stringify(error));
    //       }, {
    //         accuracyMode: constants.ACCURACY_NO_POWER,
    //         enableHighAccuracy: false,
    //         timeout: 2000,
    //         useBestProvider: true
    //       });
    //     }

    //         [{
    //         id: "id" + location.lat + location.lon,
    //         lat: location.lat,
    //         lon: location.lon,
    //         image: {
    //           source: "pin_location.png",
    //           sourceType: kony.map.PIN_IMG_SRC_TYPE_RESOURCES,
    //           anchor: kony.map.PIN_IMG_ANCHOR_BOTTOM_CENTER
    //         },
    //         /*name: "Name " + pinCount,
    //         desc: "Description " + pinCount,
    //         navigateAndZoom: false,*/
    //                 calloutData: {
    //                   name: "Name " + pinCount,
    //                   description: "Description " + pinCount,
    //                   image: "https://ied.eu/wp-content/uploads/2019/01/horizon-europe.jpg"
    //                 }
    //       }]);
