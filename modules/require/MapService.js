define(function () {
  var getNearestCinemas = function(lat, lng, successCB, errorCB) {

    var sdk = kony.sdk.getCurrentInstance();
    var AlexanderMapService = sdk.getIntegrationService("AlexDB");
    var headers = null;
    var body = {
      lat: lat,
      lng: lng
    };
    AlexanderMapService.invokeOperation("searchNearbyCinemas", headers, body, function(response) {
      if (successCB) {
        var cinemaList = response.results.map(function(m) {
          return{
            id: "id" + m.location.lat + m.location.lng,
            name: m.name,
            vicinity: m.vicinity,
            lat: m.location.lat,
            lng: m.location.lng,
//             image: {
//               source: "pin_location.png",
//               sourceType: kony.map.PIN_IMG_SRC_TYPE_RESOURCES,
//               anchor: kony.map.PIN_IMG_ANCHOR_BOTTOM_CENTER
//             },
          }; 
        });
        successCB(cinemaList);
      }
    }, function(error) {
      if (errorCB) {
        errorCB(error);
      }
    });
  };

  return {
    getNearestCinemas: getNearestCinemas
  };
});