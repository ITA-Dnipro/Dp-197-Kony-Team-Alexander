define(["AuthenticationService"], function(authUser) {
  return { 
    onInitialize: function() {
      this.view.btnCreateAccount.onClick = this.onBtnCreateAccount.bind(this);
      this.view.btnBackToLogin.onClick = Utility.goBack;
    },
    
     onNavigate: function() {
       this.view.inpFullName.text = "";
       this.view.inpUserLogin.text = "";
       this.view.inpPassword.text = "";
       this.view.inpPasswordConfirm.text = "";
    },

    onBtnCreateAccount: function() {
      authUser.registerUser(
        this.view.inpFullName.text,
        this.view.inpUserLogin.text,
        this.view.inpPassword.text,
        this.view.inpPasswordConfirm.text,
        Utility.navigateTo.bind(null,"frmAuthentication"),
        function() {
          alert("A user with the same username already exists");
        });
    }
  };
});