define(["FakeAuthService"], function(authUser) {
  return { 
    onInitialize: function() {
      this.view.btnLogin.onClick = this.onBtnLoginClicked.bind(this);
      this.view.btnRegister.onClick = Utility.navigateTo.bind(null,"frmRegistration");
    },
    
    onNavigate: function() {
      this.view.inpUserLogin.text = "";
      this.view.inpPassword.text = "";
    },

    onBtnLoginClicked: function() {
      authUser.checkUser(this.view.inpUserLogin.text,
                         this.view.inpPassword.text,
                         Utility.navigateTo.bind(null,"frmMovieList"),
                         function() {
        alert("User not found. Please registrate");
      });
    }
  };
});