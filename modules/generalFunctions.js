var Utility = {
  goBack: function() {   
    var currentForm;
    var previousForm;

    if (formsStack.length > 1) {
      currentForm = formsStack.pop();
      previousForm = formsStack[formsStack.length - 1];
    }    

    if (currentForm && previousForm) {

      var navigation = new kony.mvc.Navigation(previousForm.id);
      navigation.navigate(previousForm.data);

      kony.application.destroyForm(currentForm.id);
    }
  },

  navigateTo: function(frmName, data) {
    if (frmName === "frmAuthentication" && kony.application.getCurrentForm().id !== "frmRegistration") {
      var confirmAlert = kony.ui.Alert({
        message: "Are you sure you want to log out?",
        alertType: constants.ALERT_TYPE_CONFIRMATION,
        contentAlignment: constants.ALERT_CONTENT_ALIGN_CENTER,
        alertHandler: function(confirm){
          if (confirm) {
            var navigation = new kony.mvc.Navigation(frmName);
            navigation.navigate(data);
            Utility.clearSessionData();  
          }       
        },
      }, {});

    } else {
      formsStack.push({ id: frmName, data: data });

      var navigation = new kony.mvc.Navigation(frmName);
      navigation.navigate(data);
    }

  },
  
  clearSessionData: function(){
    formsStack = []; 
    UserId = null;
    
    kony.application.destroyForm("frmFavouriteList");
    kony.application.destroyForm("frmMovieList");
  }
};
