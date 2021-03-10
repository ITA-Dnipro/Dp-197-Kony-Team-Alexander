define(["AuthServiceFabricImpl" ], function (fabricImpl) {
  
  return {
    checkUser: fabricImpl.checkUser,
    registerUser: fabricImpl.registerUser,
  };
});