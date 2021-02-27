var Utility = {
  goBack: function() {
    var navigation = new kony.mvc.Navigation(kony.application.getPreviousForm().id);
    navigation.navigate();
  },

  navigateTo: function(frmName, data) {
    alert(frmName);
    var navigation = new kony.mvc.Navigation(frmName);

    navigation.navigate(data);
  }
};
