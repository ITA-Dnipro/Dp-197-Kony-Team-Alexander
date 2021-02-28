var Utility = {
  goBack: function() {   
    var currentForm;
    var previousForm;
    
    if (formsStack.length > 1) {
      currentForm = formsStack.pop();
      previousForm = formsStack[formsStack.length - 1];
    }    

    if (currentForm && previousForm) {
//       alert('curr ' + currentForm.id);
//       alert('prev ' + previousForm.id);

      var navigation = new kony.mvc.Navigation(previousForm.id);
      navigation.navigate(previousForm.data);

      kony.application.destroyForm(currentForm.id);
    }
  },

  navigateTo: function(frmName, data) {
    formsStack.push({ id: frmName, data: data });
    
//     alert(formsStack.map(function(f){ return f.id; }).join('\n '));

    var navigation = new kony.mvc.Navigation(frmName);
    navigation.navigate(data);
  }
};
