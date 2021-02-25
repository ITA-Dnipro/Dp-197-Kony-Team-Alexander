define({
    onInitialize: function() {
      this.view.btnBackToMovieList.onClick = Utility.navigateTo.bind(null, "frmMovieList");
    }
});