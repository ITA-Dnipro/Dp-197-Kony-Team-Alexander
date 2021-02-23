define(["MovieServiceHttpImpl", "MovieServiceFabricImpl"], function (httpImpl, fabricImpl) {
  
  var concreteImpl = httpImpl;
   
    return {
      getMovieDetails: concreteImpl.getMovieDetails,
      getSimilarMovieList: concreteImpl.getSimilarMovieList,
      getRecommendedMovieList: concreteImpl.getRecommendedMovieList,
      getMovieList: concreteImpl.getMovieList,
      searchMovie: concreteImpl.searchMovie,
      getMovieCredits: concreteImpl.getMovieCredits
    };
});