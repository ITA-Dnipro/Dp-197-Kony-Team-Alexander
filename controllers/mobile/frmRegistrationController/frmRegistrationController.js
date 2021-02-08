define({ 

	onInitialize: function() {
		this.view.btnCreateAccount.onClick = Utility.navigateTo.bind(null,"frmMovieList");
		this.view.btnBackToLogin.onClick = Utility.goBack;
	}

});