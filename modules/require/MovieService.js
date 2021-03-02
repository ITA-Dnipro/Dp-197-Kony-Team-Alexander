define(["MovieServiceFabricImpl", "MovieServiceHttpImpl"], function (fabricImpl, httpImpl) {

  var concreteImpl = (fabricImpl) ? fabricImpl : httpImpl;

  return {
    getMovieDetails: concreteImpl.getMovieDetails,
    getSimilarMovieList: concreteImpl.getSimilarMovieList,
    getMovieList: concreteImpl.getMovieList,
    getRecommendedMovieList: concreteImpl.getRecommendedMovieList,
    searchMovie: concreteImpl.searchMovie,
    getMovieCredits: concreteImpl.getMovieCredits,

    searchPeople: httpImpl.searchPeople,
    getPersonInfo: httpImpl.getPersonInfo,
    getPersonCredits: httpImpl.getPersonCredits,
    getTvDetails: httpImpl.getTvDetails,
    getTvCredits: httpImpl.getTvCredits,
    getSimilarTvList: httpImpl.getSimilarTvList,
    getRecommendedTvList: httpImpl.getRecommendedTvList
  };
});