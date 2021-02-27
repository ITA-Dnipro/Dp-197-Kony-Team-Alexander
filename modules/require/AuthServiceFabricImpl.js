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
        alert(response.userRegistrationError);
      }
    }, function(error) {
      if (errorCB) {
        errorCB(error);
      }
    }); 
  };
  
    return {
        registerUser: registerUser
    };
});