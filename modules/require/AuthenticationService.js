define(["FakeAuthServiceImpl", "AuthServiceFabricImpl" ], function (fake, fabricImpl) {

  return {
    checkUser: fabricImpl.checkUser,
    updateUserProfile: fabricImpl.updateUserProfile,
    registerUser: fabricImpl.registerUser,
    toggleMovieFavorites: fake.toggleMovieFavorites,
    getUserProfile: fabricImpl.getUserProfile,
    isMovieInFavoriteList: fake.isMovieInFavoriteList
  };
});