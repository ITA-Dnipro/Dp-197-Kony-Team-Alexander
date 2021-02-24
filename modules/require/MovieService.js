define(["MovieServiceHttpImpl", "MovieServiceFabricImpl"], function (httpImpl, fabricImpl) {
  
  var concreteImpl = httpImpl;
  
//   var concreteImpl = fabricImpl;
//   alert(JSON.stringify(concreteImpl));
    return {
      getMovieDetails: fabricImpl.getMovieDetails,
      getSimilarMovieList: httpImpl.getSimilarMovieList,
      getRecommendedMovieList: concreteImpl.getRecommendedMovieList,
      searchMovie: fabricImpl.searchMovie,
      getMovieCredits: httpImpl.getMovieCredits
    };
});