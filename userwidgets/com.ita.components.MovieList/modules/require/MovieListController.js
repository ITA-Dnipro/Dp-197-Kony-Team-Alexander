define(function() {

  return {
    onShowBtnClicked: function() {
      this.view.lstMovies.isVisible = !this.view.lstMovies.isVisible;

      var btn = this.view.btnShow;

      btn.skin === "sknBtnRecommendedMovie" ? 
        btn.skin = "sknBtnRecommendedMovieActive" :
        btn.skin = "sknBtnRecommendedMovie";

      btn.text.slice(-1) === "\uf078" ? 
        btn.text = btn.text.slice(0, btn.text.length - 1) + "\uf054":
        btn.text = btn.text.slice(0, btn.text.length - 1) + "\uf078";
    },
  };
});