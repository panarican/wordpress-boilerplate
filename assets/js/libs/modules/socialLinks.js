/*! wordpress-boilerplate - v0.0.1 - 2013-07-14 */define(["jquery"],function($){App.socialLinks=function(){function a(a){var a=$.extend({},b,a);switch(a.caption=encodeURIComponent(a.caption),a.title=encodeURIComponent(a.title),a.link=encodeURIComponent(a.link),a.image=encodeURIComponent(a.image),a.copy=encodeURIComponent(a.copy),a.share){case"tumblr":var c="http://tumblr.com/share?s=&v=3&t="+a.title+"&u="+a.link;return c;case"facebook":var d="https://www.facebook.com/dialog/feed?";return d+="app_id="+a.facebookId,d+="&link="+a.link,d+="&picture="+a.image,d+="&name="+a.title,d+="&caption="+a.caption,d+="&description="+a.copy,d+="&display=popup",d+="&redirect_uri=http://facebook.com";case"twitter":var e="http://twitter.com/intent/tweet?text="+a.copy;return e+="&url="+a.link;case"pinterest":var f="http://pinterest.com/pin/create/button/?url="+a.link;return f+="&media="+a.image,f+="&description="+a.copy;case"houzz":var g="http://www.houzz.com/imageClipperUpload?link="+a.link;return g+="&source=button",g+="&imageUrl="+a.image,g+="&title="+a.title,g+="&ref=http://houzz.com"}}var b={facebookId:375766959201521,houzzId:3330,caption:"where water meets modern",title:$("title").text(),link:window.location.href,image:"http://"+window.location.host+"/assets/img/bg-logo-share.png",copy:"Check out blubathworks"};$(document).on("vclick","[data-share]",function(){var b=$(this).data(),c=b.share;c&&window.open(a(b),"share","menubar=0,resizable=0,width=980,height=480")})},App.socialLinks()});