define(function() {
  var _defaultUnits = "dp";
  var _isBackVisible = true;
  var _isDropVisible = true;
  var _destroyPreviousFormOnBack = true;
  var _dropDownList = [];
  var _dropDownWidth = "350dp";
  var _flexBackdrop = null;
  var _separatorSize = "1dp";
  var _listItemSkin = "defBtnNormal";

  var DEFAULT_OFFSET = "20dp";
  
  var BACKDROP_ZINDEX = 1000;
  
  var validateSize = function(input) {
    var pattern = /^[0-9]+(dp|px|%)$/;
    return (typeof input === "string" && pattern.test(input));
  };
  
  var parseSizeValue = function(propName, value) {
    if (typeof value === 'number' || !isNaN(Number(value))) {
      value += _defaultUnits;
    }
    if (!validateSize(value)) {
      throw new Error(propName + " has to be of valid size value.");
    }
    
    return value;
  };
  
  var validateSkin = function(skin) {
    return typeof skin === 'string' && skin.trim().length > 0;
  };
  
  
  var updateHeaderPosition = function () {
    var leftOffset = this.view.btnBack.isVisible ? this.view.btnBack.width : DEFAULT_OFFSET;
    var rightOffset = this.view.btnDrop.isVisible ? this.view.btnDrop.width : DEFAULT_OFFSET;
    
    this.view.lblCaption.left = leftOffset;
    this.view.lblCaption.right = rightOffset;
  };
  
  var showPreviousForm = function() {
    if (this.onBackClicked) {
      if (!this.onBackClicked()) {
        return;
      }
    }
    
    var currentForm = kony.application.getCurrentForm();
    var previousForm = kony.application.getPreviousForm();

    if (currentForm && previousForm) {
      (new kony.mvc.Navigation(previousForm.id)).navigate();

      if (_destroyPreviousFormOnBack) {
        kony.application.destroyForm(currentForm.id);
      }
    }
  };
  
  var showDropDown = function () {
    var form = kony.application.getCurrentForm();
    
    hideDropDown();
    
    _flexBackdrop = new kony.ui.FlexContainer({
      id: "flxHeaderControlBackdrop",
      top: "0dp",
      left: "0dp",
      right: "0dp",
      bottom: "0dp",
      zIndex: BACKDROP_ZINDEX,
      isVisible: true,
      onClick: hideDropDown,
      layoutType: kony.flex.FREE_FORM
    });

    var flexScroll = new kony.ui.FlexScrollContainer({
      id: "flxHeaderControlScrollList",
      top: this.view.height,
      width: _dropDownWidth,
      height: "100%",
      right: "0dp",
      bottom: "0dp",
      isVisible: true,
      enableScrolling: true,
      scrollDirection: kony.flex.SCROLL_VERTICAL,
      
      bounces: false,
      onClick: hideDropDown,
      layoutType: kony.flex.FLOW_VERTICAL
    }, {
        padding: [0, 0, 0, 0],
        margin: [0, 0, 0, 0]
    });


    for (var i = 0; i < _dropDownList.length; i++) {
      var button = new kony.ui.Button({
        id: "flxHeaderControlListItem" + i,
        right: "0dp",
        width: "100%",
        skin: _listItemSkin,
        height: kony.flex.USE_PREFERRED_SIZE,
        top: _separatorSize,
        isVisible: true,
        text: _dropDownList[i].name,
        onClick: function(data){ 
//           if (this.onListItemClicked) {
//             this.onListItemClicked(data);
//           }
          Utility.navigateTo(data.path);
          hideDropDown();
        }.bind(this, _dropDownList[i])
      }, {
        padding: [0, 0, 0, 0],
        margin: [0, 0, 0, 0]        
      });
      
      flexScroll.add(button);
    }

    _flexBackdrop.add(flexScroll);
    form.add(_flexBackdrop);
  };
  
  var hideDropDown = function () {
    var form = kony.application.getCurrentForm();
    
    if (_flexBackdrop) {
      form.remove(_flexBackdrop);
      _flexBackdrop = null;
    }
  };
  
  var toggleDropdown = function() {
    if (this.onDropClicked) {
      if (!this.onDropClicked()) {
        return;
      }
    }
    
    if (_flexBackdrop) {
      hideDropDown();
    } else if (_dropDownList.length > 0) {
      showDropDown();
    }
  };
  
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      updateHeaderPosition = updateHeaderPosition.bind(this);
      hideDropDown = hideDropDown.bind(this);
      showDropDown = showDropDown.bind(this);
      
      this.view.btnBack.onClick = showPreviousForm.bind(this);
      this.view.btnDrop.onClick = toggleDropdown.bind(this);
    },
    
    initGettersSetters: function() {
      defineGetter(this, "isBackVisible", function() {
        return _isBackVisible;
      });

      defineSetter(this, "isBackVisible", function(val) {
        _isBackVisible = !!val;
        
        this.view.btnBack.isVisible = _isBackVisible;
        updateHeaderPosition();
      });
      
      defineGetter(this, "isDropVisible", function() {
        return _isDropVisible;
      });

      defineSetter(this, "isDropVisible", function(val) {
        _isDropVisible = !!val;
        
        this.view.btnDrop.isVisible = _isDropVisible;
        updateHeaderPosition();
      });
      
      defineGetter(this, "destroyPreviousFormOnBack", function() {
        return _destroyPreviousFormOnBack;
      });

      defineSetter(this, "destroyPreviousFormOnBack", function(val) {
        _destroyPreviousFormOnBack = !!val;
      });
      
      defineGetter(this, "dropDownList", function() {
        return _dropDownList;
      });

      defineSetter(this, "dropDownList", function(val) {
        if (!val || !Array.isArray(val)) {
          throw new Error("dropDownList property has to be of Array type.");
        }
        
        for (var i = 0; i < val.length; i++) {
          if (typeof val[i].id === "undefined"
              || typeof val[i].name === "undefined"
              || val[i].id === null
              || val[i].name === null) {
            throw new Error("Each dropDownList item has to have at least 'id' and 'name' properties set.");
          }
        }
        
        _dropDownList = val;
      });
      
      defineGetter(this, "defaultUnits", function() {
        return _defaultUnits;
      });

      defineSetter(this, "defaultUnits", function(val) {
        _defaultUnits = val;
      });
      
      defineGetter(this, "dropDownWidth", function() {
        return _dropDownWidth;
      });
      
      defineSetter(this, "dropDownWidth", function(val) {
        _dropDownWidth = parseSizeValue("dropDownWidth", val);
      });
      
      defineSetter(this, "separatorSize", function(val) {
        _separatorSize = parseSizeValue("separatorSize", val);
      });
      
      defineGetter(this, "separatorSize", function() {
        return _separatorSize;
      });
      
      defineGetter(this, "listItemSkin", function() {
        return _listItemSkin;
      });
      
      defineSetter(this, "listItemSkin", function(val) {
        if (!validateSkin(val)) {
          throw new Error("listItemSkin has to be of valid skin name.");
        }
        _listItemSkin = val;
      });
    }
  };
});