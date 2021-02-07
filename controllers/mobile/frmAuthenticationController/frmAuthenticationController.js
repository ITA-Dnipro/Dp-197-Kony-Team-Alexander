define(["FakeAuthService"], function(authUser) {
	return { 
		onInitialize: function() {
			this.view.btnLogin.onClick = this.onBtnLoginClicked.bind(this);
			this.view.btnRegister.onClick = Utility.navigateTo.bind(null,"frmRegistration");
		},

		onBtnLoginClicked: function() {
			/*if (this.view.inptStart.text && this.view.inptStart.text.toLocaleLowerCase() === "ready for the space") {
        var navigation = new kony.mvc.Navigation("frmMain");
        navigation.navigate();
      } else {
        this.view.inptStart.setFocus(true);
        this.view.inptStart.text = "";
      }*/

			authUser.checkUser(this.view.inpUserLogin.text, this.view.inpPassword.text, 
				Utility.navigateTo.bind(null,"frmMovieList"), 
				function() {
					alert("User not found. Please registrate");
			});
		}

	};

});