define({ 
	onInitialize: function() {
		this.view.btnRegister.onClick = Utility.navigateTo.bind(null, "frmRegistration"); 
	}

 });