/*! cso - v0.0.1 - 2013-06-28 */define(["jquery","enquire.min"],function($){App.enquireHelper=function(a){var b={tablet:768,phone:568,retina:2,selector:$("body")},a="undefined"==typeof a?b:$.extend(b,a);enquire.register("screen and (max-width: "+a.tablet+"px)",{match:function(){a.selector.addClass("isMobile")},unmatch:function(){a.selector.removeClass("isMobile")}}),enquire.register("screen and (max-width: "+a.tablet+"px) and (min-width: "+(a.phone+1)+"px)",{match:function(){a.selector.addClass("isTablet")},unmatch:function(){a.selector.removeClass("isTablet")}}),enquire.register("screen and (max-width: "+a.phone+"px)",{match:function(){a.selector.addClass("isPhone")},unmatch:function(){a.selector.removeClass("isPhone")}}),enquire.register("(-webkit-min-device-pixel-ratio: "+a.retina+"), (min-resolution: "+96*a.retina+"dpi)",{match:function(){a.selector.addClass("isRetina")},unmatch:function(){a.selector.removeClass("isRetina")}})},App.enquireHelper()});