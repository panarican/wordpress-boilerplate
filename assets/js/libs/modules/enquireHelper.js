/*! cso - v0.0.1 - 2013-06-28 */define(["jquery","enquire.min"],function($){App.enquireHelper=function(a){var b={tablet:768,phone:568,retina:2,selector:$("body")},a="undefined"==typeof a?b:$.extend(b,a);enquire.register("screen and (max-width: "+a.tablet+"px)",{match:function(){a.selector.addClass("isMobile");var b=$("[data-phone]");b.each(function(){var a=$(this),b=a.data("phone");b&&"hide"!=b&&a.css("background-image","url("+b+")")})},unmatch:function(){a.selector.removeClass("isMobile");var b=$("[data-desktop]");b.each(function(){var a=$(this),b=a.data("desktop");b&&"hide"!=b&&a.css("background-image","url("+b+")")})}}),enquire.register("screen and (max-width: "+a.tablet+"px) and (min-width: "+(a.phone+1)+"px)",{match:function(){a.selector.addClass("isTablet")},unmatch:function(){a.selector.removeClass("isTablet")}}),enquire.register("screen and (max-width: "+a.phone+"px)",{match:function(){a.selector.addClass("isPhone")},unmatch:function(){a.selector.removeClass("isPhone")}}),enquire.register("(-webkit-min-device-pixel-ratio: "+a.retina+"), (min-resolution: "+96*a.retina+"dpi)",{match:function(){a.selector.addClass("isRetina")},unmatch:function(){a.selector.removeClass("isRetina")}})},App.enquireHelper()});