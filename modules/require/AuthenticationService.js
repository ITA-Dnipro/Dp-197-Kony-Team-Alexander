define(["FakeAuthServiceImpl", "AuthServiceFabricImpl" ], function (fake, fabricImpl) {

//   return {
//     checkUser: fake.checkUser,
//     updateUserProfile: fake.updateUserProfile,
//     registerUser: fake.registerUser,
//     toggleMovieFavorites: fake.toggleMovieFavorites,
//     getUserProfile: fake.getUserProfile,
//     isMovieInFavoriteList: fake.isMovieInFavoriteList
//   };
  
  return {
    checkUser: fabricImpl.checkUser,
    updateUserProfile: fabricImpl.updateUserProfile,
    registerUser: fabricImpl.registerUser,
    toggleMovieFavorites: fake.toggleMovieFavorites,
    getUserProfile: fabricImpl.getUserProfile,
    isMovieInFavoriteList: fake.isMovieInFavoriteList
  };
});