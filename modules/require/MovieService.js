define(["MovieServiceFabricImpl", "MovieServiceHttpImpl"], function (fabricImpl, httpImpl) {
  
//   var concreteImpl = (fabricImpl) ? fabricImpl : httpImpl;
  var concreteImpl = fabricImpl;
  
    return {
      getMovieDetails: concreteImpl.getMovieDetails,
      getSimilarMovieList: concreteImpl.getSimilarMovieList,
      getMovieList: concreteImpl.getMovieList,
      getRecommendedMovieList: concreteImpl.getRecommendedMovieList,
      searchMovie: concreteImpl.searchMovie,
      getMovieCredits: concreteImpl.getMovieCredits,
      searchPeople: concreteImpl.searchPeople,
      getPersonInfo: concreteImpl.getPersonInfo,
      
//       searchPeople: httpImpl.searchPeople,
//       getPersonInfo: httpImpl.getPersonInfo,
      getPersonCredits: httpImpl.getPersonCredits,
      getTvDetails: httpImpl.getTvDetails,
      getTvCredits: httpImpl.getTvCredits,
      getSimilarTvList: httpImpl.getSimilarTvList,
      getRecommendedTvList: httpImpl.getRecommendedTvList
    };
});