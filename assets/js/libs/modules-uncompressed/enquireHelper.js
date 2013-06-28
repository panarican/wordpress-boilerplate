define(['jquery', 'enquire.min'], function($){
  // helper classes for enabling/disabling events on breakpoints
  App.enquireHelper = function(options) {
  
    // default options
    var defaults = {
          // based off iPad portrait viewport
          tablet: 768,
          // based from iphone5 landscape viewport
          phone: 568,
          // multiple standard dpi (96) by
          retina: 2,
          // set helper classes to
          selector: $('body')
        },
        options = (typeof options == "undefined") ? defaults : $.extend(defaults, options);
      
      // isMobile
      enquire.register("screen and (max-width: "+options.tablet+"px)", {
        match: function() {
          options.selector.addClass("isMobile");
          
        },
        unmatch: function() {
          options.selector.removeClass("isMobile");
          
        }
      });

      // isTablet
      enquire.register("screen and (max-width: "+options.tablet+"px) and (min-width: "+(options.phone+1)+"px)", {
        match: function() {
          options.selector.addClass("isTablet");
        },
        unmatch: function() {
          options.selector.removeClass("isTablet");
        }
      });

      // isPhone
      enquire.register("screen and (max-width: "+options.phone+"px)", {
        match: function() {
          options.selector.addClass("isPhone");
        },
        unmatch: function() {
          options.selector.removeClass("isPhone");
        }
      });
  
      // isRetina
      enquire.register("(-webkit-min-device-pixel-ratio: "+options.retina+"), (min-resolution: "+(96*options.retina)+"dpi)", {
        match: function() {
          options.selector.addClass("isRetina");
        },
        unmatch: function() {
          options.selector.removeClass("isRetina");
        }
      });
  } // end helperClasses

  // run helperClasses
  App.enquireHelper();

}); // end define