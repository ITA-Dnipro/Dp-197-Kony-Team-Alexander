define(["UserProfileService"], function(userProfile) {
  return { 
    onInitialize: function() {
      this.view.btnProfileFormChange.onClick = this.onUserProfileChange.bind(this);
    },

    onNavigate: function() {
      userProfile.getUserProfile(UserId, function(login, fullName) {
        this.view.inpProfileName.text = fullName;
        this.view.inpProfileLogin.text = login;
      }.bind(this), function() {
					alert("Error while conecting to DB, please check your internet conection.");
      });
    },

    onUserProfileChange: function() {
      userProfile.updateUserProfile(UserId, this.view.inpProfileName.text, this.view.inpProfileLogin.text, function() {
        alert("User profile successfuly changed!");
      }.bind(this), function() {
					alert("Error while conecting to DB, please check your internet conection.");
      });
    }
  };
});