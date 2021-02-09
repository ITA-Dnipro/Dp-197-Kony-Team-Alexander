define(["MovieServiceHttpImpl"], function (concreteImpl) {
   
    return {
      getMovieDetails: concreteImpl.getMovieDetails,
      getSimilarMovieList: concreteImpl.getSimilarMovieList,
      getMovieList: concreteImpl.getMovieList,
    };
});