define({ 
	onInitialize: function() {
		this.view.btnBackToLogin.onClick = Utility.goBack; 
	},
	
// 	goBack: function() {
// 		var navigation = new kony.mvc.Navigation(kony.application.getPreviousForm().id);
// 		navigation.navigate();
// 	}

 });