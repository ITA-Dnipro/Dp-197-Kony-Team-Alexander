define(["MovieServiceFabricImpl", "MovieServiceHttpImpl"], function (fabricImpl, httpImpl) {

  var concreteImpl = (fabricImpl) ? fabricImpl : httpImpl;

  return {
    getTVShowList: concreteImpl.getTVShowList,
    getMovieDetails: concreteImpl.getMovieDetails,
    getMovieList: concreteImpl.getMovieList,
    searchMovie: concreteImpl.searchMovie,
    getMovieCredits: concreteImpl.getMovieCredits,
    searchPeople: concreteImpl.searchPeople,
    getPersonInfo: concreteImpl.getPersonInfo,
    getPersonCredits: concreteImpl.getPersonCredits,
    getTvDetails: concreteImpl.getTvDetails,
    getTvCredits: concreteImpl.getTvCredits,
    getRecommendedList: concreteImpl.getRecommendedList,
    searchTvShows: concreteImpl.searchTvShows
  };
});