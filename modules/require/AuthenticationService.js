define(["AuthServiceFabricImpl" ], function (fabricImpl) {

  return {
    checkUser: fabricImpl.checkUser,
    updateUserProfile: fabricImpl.updateUserProfile,
    registerUser: fabricImpl.registerUser,
    getUserProfile: fabricImpl.getUserProfile
  };
});