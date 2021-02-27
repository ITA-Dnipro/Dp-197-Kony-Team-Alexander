define(["FakeAuthServiceImpl", "AuthServiceFabricImpl" ], function (concreteImpl, fake) {

  return {
    checkUser: concreteImpl.checkUser,
    registerUser: fake.registerUser,
    toggleMovieFavorites: concreteImpl.toggleMovieFavorites,
    isMovieInFavoriteList: concreteImpl.isMovieInFavoriteList
  };
});