define(function () {
  var checkUser = function(login, password, successCB, errorCB) {

    var users = [];

    if (JSON.parse(kony.store.getItem("users"))) {
      users = JSON.parse(kony.store.getItem("users"));
    }

    var matchedUsers = users.filter(function(u) { 
      return u.login === login && u.password === password; 
    });

    var callback = null;

    if (matchedUsers.length > 0) {
      callback = successCB;
    } else {
      callback = errorCB;
    }

    return callback();

  };

  var registerUser = function(fullName, login, password, cnPassword, successCB, errorCB) {
    
    var users = [];
    
    if (JSON.parse(kony.store.getItem("users"))) {
      users = JSON.parse(kony.store.getItem("users"));
    }

    var matchedUsers = users.filter(function(u) { 
      return u.login === login;  
    });
    
    var callback = null;

    if (matchedUsers.length > 0) {
      callback = errorCB;
    } else {
      var user = {login: login, password: password, fullName: fullName, id: Math.round(Math.random() * 1000)};
      users.push(user);
      kony.store.clear();
      kony.store.setItem("users", JSON.stringify(users));
      callback = successCB;
    }

    return callback();

  };

  return {
    checkUser: checkUser,
    registerUser: registerUser
  };
});