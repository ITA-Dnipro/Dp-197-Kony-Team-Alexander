define(function () {
  var getUserProfile = function(userId, successCB, errorCB) {

    var sdk = kony.sdk.getCurrentInstance();
    var AlexanderUserProfileService = sdk.getIntegrationService("AlexDB");
    var headers = null;
    var body = {
      userId: userId
    };
    AlexanderUserProfileService.invokeOperation("getUserProfile", headers, body, function(response) {
      if (response.userLogin && response.userFullName) {
        successCB(response.userLogin, response.userFullName);
      } else {
        alert("User not found");
      }
    }, function(error) {
      if (errorCB) {
        errorCB(error);
      }
    }); 
  };

  var updateUserProfile = function(userId, fullName, login, successCB, errorCB) {

    var sdk = kony.sdk.getCurrentInstance();
    var AlexanderUserProfileService = sdk.getIntegrationService("AlexDB");
    var headers = null;
    var body = {
      userId: userId,
      userFullName: fullName,
      userLogin: login
    };
    AlexanderUserProfileService.invokeOperation("updateUserProfile", headers, body, function(response) {
      if (response.userUpdateResult === "success") {
        successCB();
      } else {
        var result = response.userUpdateResult;
        switch(result) {
          case "login_required": alert("Login is required"); break;
          case "full_name_required": alert("Full name is required"); break;
        }
      }
    }, function(error) {
      if (errorCB) {
        errorCB(error);
      }
    });
  };
  return {
    updateUserProfile: updateUserProfile,
    getUserProfile: getUserProfile,
  };
});