var Utility = {
	goBack: function() {
		var navigation = new kony.mvc.Navigation(kony.application.getPreviousForm().id);
		navigation.navigate();
	},

	navigateTo: function(frmName, data) {
		var navigation = new kony.mvc.Navigation(frmName);
		
		var dataToForm = { id: data };
		navigation.navigate(dataToForm);
	}
}
