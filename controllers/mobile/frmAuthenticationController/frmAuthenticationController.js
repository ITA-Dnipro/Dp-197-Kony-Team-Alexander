define(["AuthenticationService"], function(authUser) {
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
      var login = this.view.inpUserLogin.text;
      var password = this.view.inpPassword.text;
      authUser.checkUser(login, password, function(userId) {
        UserId = userId;
        Utility.navigateTo("frmMovieList");
      }, function() {
        alert("Error while connecting to DB, please check your internet conection.");
      }); 
    }
  };
});