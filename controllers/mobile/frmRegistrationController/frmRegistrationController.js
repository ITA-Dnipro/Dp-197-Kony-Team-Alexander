define(["AuthenticationService"], function(authUser) {
  return { 
    onInitialize: function() {
      this.view.btnCreateAccount.onClick = this.onBtnCreateAccount.bind(this);
      this.view.btnBackToLogin.onClick = Utility.navigateTo.bind(null, "frmAuthentication");
      
      this.view.onDeviceBack = Utility.goBack;
    },

    onNavigate: function() {
      this.view.inpFullName.text = "";
      this.view.inpUserLogin.text = "";
      this.view.inpPassword.text = "";
      this.view.inpPasswordConfirm.text = "";
    },

    onBtnCreateAccount: function() {
      var fullName = this.view.inpFullName.text;
      var login = this.view.inpUserLogin.text;
      var password = this.view.inpPassword.text;
      if (password === this.view.inpPasswordConfirm.text) {
        authUser.registerUser(fullName, login, password, function() {
          Utility.navigateTo("frmAuthentication");
        }, function() {
          alert("Error while conecting to DB, please check your internet conection.");
        });     
      } else {
        alert("The password must match confirm password!");
      }
    }
  };
});