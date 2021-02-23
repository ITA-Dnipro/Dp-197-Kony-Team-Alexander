define(["MovieServiceHttpImpl", "MovieServiceFabricImpl"], function (httpImpl, fabricImpl) {
  
//   var concreteImpl = fabricImpl;
//   alert(JSON.stringify(concreteImpl));
    return {
      getMovieDetails: httpImpl.getMovieDetails,
      getSimilarMovieList: httpImpl.getSimilarMovieList,
      getMovieList: fabricImpl.getMovieList,
      searchMovie: fabricImpl.searchMovie,
      getMovieCredits: httpImpl.getMovieCredits
    };
});