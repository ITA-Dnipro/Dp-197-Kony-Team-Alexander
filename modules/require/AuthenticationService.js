define(["FakeAuthServiceImpl", "AuthServiceFabricImpl" ], function (fake, concreteImpl) {

  return {
    checkUser: concreteImpl.checkUser,
    registerUser: concreteImpl.registerUser,
    toggleMovieFavorites: fake.toggleMovieFavorites,
    isMovieInFavoriteList: fake.isMovieInFavoriteList
  };
});