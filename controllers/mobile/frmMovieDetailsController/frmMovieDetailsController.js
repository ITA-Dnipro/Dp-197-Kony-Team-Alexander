define({ 

	onInitialize: function() {
		this.view.btnBack.onClick = Utility.goBack;
		this.view.postShow = this.onFormShowed.bind(this);
	},


	onFormShowed: function() {
		this.loadMovieList();
	},

	loadMovieList: function() {
		kony.application.showLoadingScreen();
		// Create phase
		var httpClient = new kony.net.HttpRequest();
		//Setup phase
		httpClient.open(constants.HTTP_METHOD_GET, "https://api.themoviedb.org/3/movie/popular?api_key=69f776e126f6211fe76798c6c4b786f9&language=en-US&page=1");
		httpClient.onReadyStateChange = this.onMovieListReceived.bind(this, httpClient);
		// Action
		httpClient.send();
	},

	loadSimilarMovieList: function(movieId) {
		kony.application.showLoadingScreen();
		// Create phase
		var httpClient = new kony.net.HttpRequest();
		//Setup phase
		var link = "https://api.themoviedb.org/3/movie/" + movieId + "/similar?api_key=69f776e126f6211fe76798c6c4b786f9&language=en-US&page=1";
		httpClient.open(constants.HTTP_METHOD_GET, link);
		httpClient.onReadyStateChange = this.onSimilarMovieListReceived.bind(this, httpClient);
		// Action
		httpClient.send();
	},  

	loadMovieDetails: function(movieId) {
		kony.application.showLoadingScreen();
		// Create phase
		var httpClient = new kony.net.HttpRequest();
		//Setup phase
		var link = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=69f776e126f6211fe76798c6c4b786f9&language=en-US";
		httpClient.open(constants.HTTP_METHOD_GET, link);
		httpClient.onReadyStateChange = this.onMovieDetailsReceived.bind(this, httpClient);
		// Action
		httpClient.send();
	}, 

	onMovieListReceived: function(httpClient) {
		try
		{
			kony.print("Movie List Retrieval State Change: " + httpClient.readyState);

			if(httpClient.readyState === constants.HTTP_READY_STATE_DONE)
			{
				var movieData = httpClient.response;
				var listData = movieData.results.map(function(m) {
					return {
						voteAvg: m.vote_average,
						lblMovieTitle: m.title,
						lblDescription: m.overview,
						imgMovie: "https://image.tmdb.org/t/p/w200/" + m.poster_path,
						imgBack: "https://image.tmdb.org/t/p/w500/" + m.backdrop_path,
						id: m.id,
					};
				});

				//         this.view.lstMovies.setData(listData);
				//         this.view.lblMovieRating.text = listData[1].voteAvg;
				//         this.view.imgMoviePoster.src = listData[1].imgMovie;
				//         this.view.imgBackground.src = listData[1].imgBack;
				//         this.view.lblMovieTitle.text = listData[1].lblMovieTitle;
				this.loadMovieDetails(listData[1].id);
				this.loadSimilarMovieList(listData[1].id);
				kony.application.dismissLoadingScreen();
			} 
		}
		catch(err)
		{
			alert("exception is :: \n" + err.getMessage());
			kony.application.dismissLoadingScreen();
		}
	},

	onSimilarMovieListReceived: function(httpClient) {

		if(httpClient.readyState === constants.HTTP_READY_STATE_DONE)
		{
			var movieData = httpClient.response;
			var similarListData = movieData.results.map(function(m) {
				return {
					lblMovieTitle: m.title,
					lblDescription: m.overview,
					imgMoviePoster: "https://image.tmdb.org/t/p/w200/" + m.poster_path,
					id: m.id,
				};
			});
			this.view.similarMovieList.setData(similarListData);

			kony.application.dismissLoadingScreen();
		} 
	},

	onMovieDetailsReceived: function(httpClient) {

		if(httpClient.readyState === constants.HTTP_READY_STATE_DONE)
		{
			var movieData = httpClient.response;
			var movieDetailsList = ["id", "Country", "Duration", "Released", "Genres"];
			var movieDetailsPath = ["id", "production_countries", "runtime", "release_date", "genres"];
			var movieDetailsData = movieDetailsPath.map(function(detail, i) {
				return {
					lblMovieDetail: movieDetailsList[i],
					lblMovieDetailInfo: movieData[detail],
				};
			});

			this.view.lblCountryInfo.text = "US, GB";
			this.view.lblDurationInfo.text = String(movieData.runtime);
			this.view.lblReleasedInfo.text = movieData.release_date;
			this.view.lblGenresInfo.text = "Thriller, Action, Science Fiction";
			this.view.lblDescriptionInfo.text = movieData.overview;

			this.view.lblMovieRating.text = movieData.vote_average;
			this.view.imgMoviePoster.src = "https://image.tmdb.org/t/p/w200/" + movieData.poster_path;
			this.view.imgBackground.src = "https://image.tmdb.org/t/p/w200/" + movieData.backdrop_path;
			this.view.lblMovieTitle.text = movieData.title;

			this.view.movieDetails.setData(movieDetailsData);

			kony.application.dismissLoadingScreen();
		} 
	}

});