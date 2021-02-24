define(["MovieServiceFabricImpl", "MovieServiceHttpImpl"], function (fabricImpl, httpImpl) {
  
  var concreteImpl = (fabricImpl) ? fabricImpl : httpImpl;
  
    return {
      getMovieDetails: concreteImpl.getMovieDetails,
      getSimilarMovieList: concreteImpl.getSimilarMovieList,
      getMovieList: concreteImpl.getMovieList,
      getRecommendedMovieList: concreteImpl.getRecommendedMovieList,
      searchMovie: concreteImpl.searchMovie,
      getMovieCredits: concreteImpl.getMovieCredits
    };
});