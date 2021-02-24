define(["MovieServiceFabricImpl", "MovieServiceHttpImpl"], function (fabricImpl, httpImpl) {
  
//   var concreteImpl = httpImpl;
    return {
      getMovieDetails: fabricImpl.getMovieDetails,
      getSimilarMovieList: fabricImpl.getSimilarMovieList,
      getMovieList: fabricImpl.getMovieList,
      getRecommendedMovieList: fabricImpl.getRecommendedMovieList,
      searchMovie: fabricImpl.searchMovie,
      getMovieCredits: fabricImpl.getMovieCredits
    };
});