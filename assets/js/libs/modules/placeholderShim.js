/*! wordpress-boilerplate - v0.0.1 - 2013-06-28 */define(["jquery"],function($){App.placeholderShim=function(){$("[placeholder]").focus(function(){var a=$(this);a.val()==a.attr("placeholder")&&(a.val(""),a.removeClass("placeholder"))}).blur(function(){var a=$(this);(""===a.val()||a.val()==a.attr("placeholder"))&&(a.addClass("placeholder"),a.val(a.attr("placeholder")))}).blur(),$("[placeholder]").closest("form").submit(function(){$(this).find("[placeholder]").each(function(){var a=$(this);a.val()==a.attr("placeholder")&&a.val("")})})},App.placeholderShim()});