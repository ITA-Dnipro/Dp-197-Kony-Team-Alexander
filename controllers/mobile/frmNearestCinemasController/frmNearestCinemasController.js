define(["MapServiceFabricImpl"], function(){ 
  return { 
    onInitialize: function() {
    this.view.BackHeader.btnBackHeader.onClick = Utility.goBack; 
    },
    
    getLocation: function(){
      //Sample code to set the locationData property of a Map widget.
      frmNearestCinemas.mapWidget.locationData = [{
        lat: "17.445775",
        lon: "78.3731",
        name: "Campus 1",
        desc: "My Office Campus",
        color: "green",
        label: "C",
      }];
    }
    
    
  }
});