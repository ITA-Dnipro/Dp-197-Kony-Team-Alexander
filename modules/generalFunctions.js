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
    // alert(frmName);

    if (frmName === "frmAuthentication" && kony.application.getCurrentForm().id !== "frmRegistration") {
      //       alert('if');
      var confirmAlert = kony.ui.Alert({
        message: "Are you sure you want to log out?",
        alertType: constants.ALERT_TYPE_CONFIRMATION,
        contentAlignment: constants.ALERT_CONTENT_ALIGN_CENTER,
        alertHandler: function(confirm){
          if (confirm) {
            var navigation = new kony.mvc.Navigation(frmName);
            navigation.navigate(data);
          }       
        },
      }, {});

      //       var alertHandlerCallBck = function(confirm) {
      //         alert("callback " + confirm);
      // //         if (confirm) {
      // //           var navigation = new kony.mvc.Navigation(frmName);
      // //           navigation.navigate(data);
      // //         }
      //       }

    } else {
      formsStack.push({ id: frmName, data: data });

      //     alert(formsStack.map(function(f){ return f.id; }).join('\n '));

      var navigation = new kony.mvc.Navigation(frmName);
      navigation.navigate(data);
    }

  }
};
