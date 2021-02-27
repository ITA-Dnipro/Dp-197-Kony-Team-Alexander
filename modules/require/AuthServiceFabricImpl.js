define(function () {
  var registerUser = function(fullName, login, password, successCB, errorCB) {
    var sdk = kony.sdk.getCurrentInstance();
    var AlexanderMovieListService = sdk.getIntegrationService("AlexDB");
    var headers = null;
    var body = { 
      userFullName: fullName,
      userLogin: login,
      userPassword: password
    };
    AlexanderMovieListService.invokeOperation("registerUser", headers, body, function(response) {
      if (response.userNewId) {
        alert("User was created!");
        successCB();
      } else {
        var result = response.userRegistrationError;
        switch(result) {
          case "already_exists": alert("User with this login already exists"); break;
          case "login_required": alert("Login is required"); break;
          case "full_name_required": alert("Full name is required"); break;
          case "password_required": alert("Password is required"); break;
        }
      }
    }, function(error) {
      if (errorCB) {
        errorCB(error);
      }
    }); 
  };

  var checkUser = function(login, password, successCB, errorCB) {

    var sdk = kony.sdk.getCurrentInstance();
    var AlexanderMovieListService = sdk.getIntegrationService("AlexDB");
    var headers = null;
    var body = {
      userLogin: login,
      userPassword: password
    };
    AlexanderMovieListService.invokeOperation("loginUser", headers, body, function(response) {
      if (response.userLoginId) {
        successCB(response.userLoginId);
      } else {
        alert("User not found. Please registrate.");
      }
    }, function(error) {
      if (errorCB) {
        errorCB(error);
      }
    }); 
  };

  return {
    checkUser: checkUser,
    registerUser: registerUser
  };
});