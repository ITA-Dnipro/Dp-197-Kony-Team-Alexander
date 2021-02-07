define({ 

	onInitialize: function() {
		this.view.btnLogin.onClick = Utility.navigateTo.bind(null,"frmMovieList");
		this.view.btnRegister.onClick = Utility.navigateTo.bind(null,"frmRegistration");
	}

 });