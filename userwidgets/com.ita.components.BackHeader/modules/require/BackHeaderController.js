define(function() {

	return {
		onButtonClick: function(){
      var form = kony.application.getPreviousForm();
      if (form){
        (new kony.mvc.Navigation(form.id)).navigate();
      }
    }
	};
});