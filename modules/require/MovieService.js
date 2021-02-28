define(["MovieServiceFabricImpl", "MovieServiceHttpImpl"], function (fabricImpl, httpImpl) {
  
//   var concreteImpl = (fabricImpl) ? fabricImpl : httpImpl;
  var concreteImpl = httpImpl;
  
    return {
      getMovieDetails: concreteImpl.getMovieDetails,
      getSimilarMovieList: concreteImpl.getSimilarMovieList,
      getMovieList: concreteImpl.getMovieList,
      getRecommendedMovieList: concreteImpl.getRecommendedMovieList,
      searchMovie: concreteImpl.searchMovie,
      getMovieCredits: concreteImpl.getMovieCredits,
      getPersonInfo: concreteImpl.getPersonInfo,
      getPersonCredits: concreteImpl.getPersonCredits
    };
});