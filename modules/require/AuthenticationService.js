define(["FakeAuthServiceImpl", "AuthServiceFabricImpl" ], function (fake, fabricImpl) {

  return {
    getFavouriteMovies: fabricImpl.getFavouriteMovies,
    checkUser: fabricImpl.checkUser,
    updateUserProfile: fabricImpl.updateUserProfile,
    registerUser: fabricImpl.registerUser,
    toggleMovieFavorites: fake.toggleMovieFavorites,
    getUserProfile: fabricImpl.getUserProfile,
    isMovieInFavoriteList: fake.isMovieInFavoriteList
  };
});