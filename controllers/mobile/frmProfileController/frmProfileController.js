define({
  onInitialize: function() {
    this.view.btnBackToMovieList.onClick = Utility.goBack;
    //       this.view.btnBackToMovieList.onClick = Utility.navigateTo.bind(null, "frmMovieList");

    this.view.onDeviceBack = Utility.goBack;
  }
});