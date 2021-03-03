define(["UserProfileService"], function(userProfile) {
  return { 
    onInitialize: function() {
      this.view.btnProfileFormChange.onClick = this.onUserProfileChange.bind(this);
      this.view.BackHeader.btnBackHeader.onClick = Utility.goBack; 
    },

    onNavigate: function() {
      userProfile.getUserProfile(UserId, function(login, fullName) {
        this.view.inpProfileName.text = fullName;
        this.view.inpProfileLogin.text = login;
        UserFullName = fullName;
        UserLogin = login;
      }.bind(this), function() {
					alert("Error while conecting to DB, please check your internet conection.");
      });
    },

    onUserProfileChange: function() {
      if (UserFullName === this.view.inpProfileName.text && UserLogin === this.view.inpProfileLogin.text) {
        return;
      } else {
        UserFullName = this.view.inpProfileName.text;
        UserLogin = this.view.inpProfileLogin.text;
      }
      userProfile.updateUserProfile(UserId, UserFullName, UserLogin, function() {
        alert("User profile successfuly changed!");
      }.bind(this), function() {
					alert("Error while conecting to DB, please check your internet conection.");
      });
    }
  };
});