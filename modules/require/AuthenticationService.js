define(["FakeAuthServiceImpl"], function (concreteImpl) {

  return {
    checkUser: concreteImpl.checkUser,
    registerUser: concreteImpl.registerUser,
    toggleMovieFavorites: concreteImpl.toggleMovieFavorites,
    isMovieInFavoriteList: concreteImpl.isMovieInFavoriteList
  };
});