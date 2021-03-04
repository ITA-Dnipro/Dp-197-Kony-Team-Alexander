define(function () {
  var getNearestCinemas = function(lat, lng, successCB, errorCB) {

    var sdk = kony.sdk.getCurrentInstance();
    var AlexanderMapService = sdk.getIntegrationService("GooglePlacesAPI");
    var headers = null;
    var body = {
      lat: lat,
      lng: lng
    };
    AlexanderMapService.invokeOperation("searchNearbyCinemas", headers, body, function(response) {
      if (successCB) {
        var cinemaList = response.results.map(function(m, i) {
          return{
            id: "id" + m.location.lat + m.location.lng,
            name: m.name,
            desc: "Description " + i,
            vicinity: m.vicinity,
            lat: m.location.lat,
            lon: m.location.lng,
            image: {
              source: "pin.png",
              sourceType: kony.map.PIN_IMG_SRC_TYPE_RESOURCES,
              anchor: kony.map.PIN_IMG_ANCHOR_BOTTOM_CENTER
            },
            calloutData: {
              name: m.name,
              vicinity: m.vicinity
//               image: "https://ied.eu/wp-content/uploads/2019/01/horizon-europe.jpg"
            }
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