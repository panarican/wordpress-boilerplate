define(['jquery'], function($){

	App.socialLinks = function(){
		   // VARS
	      // -----------------------------------------------------
			var defaultShare = {
				"facebookId": 375766959201521,
				"houzzId": 3330,
				"caption": "where water meets modern",
				"title": $("title").text(),
				"link": window.location.href, 
				"image": "http://"+window.location.host+"/assets/img/bg-logo-share.png",
				"copy": "Check out blubathworks"
			}

		   // METHODS
	      // -----------------------------------------------------
			function setLinks(share) {
				// extend default share settings
				var share = $.extend({},defaultShare, share);
				 	// encode url strings
					share.caption = encodeURIComponent(share.caption);
					share.title = encodeURIComponent(share.title);
					share.link = encodeURIComponent(share.link);
					share.image = encodeURIComponent(share.image);
					share.copy = encodeURIComponent(share.copy);

				// build share url
				switch (share.share) {
					case "tumblr":
					var tumblr = "http://tumblr.com/share?s=&v=3&t="+share.title+"&u="+share.link;
					return tumblr;
					break;
					case "facebook":
						var facebook = "https://www.facebook.com/dialog/feed?";
							facebook += "app_id="+share.facebookId;
							facebook += "&link="+share.link;
							facebook += "&picture="+share.image;
							facebook += "&name="+share.title;
							facebook += "&caption="+share.caption;
							facebook += "&description="+share.copy;
							facebook += "&display=popup";
							facebook += "&redirect_uri=http://facebook.com";
						return facebook;
					break;
					case "twitter":
						var twitter = "http://twitter.com/intent/tweet?text="+share.copy;
							twitter += "&url="+share.link;		
						return twitter;
					break;
					case "pinterest":
						var pinterest = "http://pinterest.com/pin/create/button/?url="+share.link;
							pinterest +="&media="+share.image;
							pinterest += "&description="+share.copy;
						return pinterest;
					break;
					case "houzz":
					var houzz =  "http://www.houzz.com/imageClipperUpload?link="+share.link;
						houzz += "&source=button";
						houzz += "&imageUrl="+share.image;
						houzz += "&title="+share.title;
						houzz += "&ref=http://houzz.com";
						return houzz;
					break;
				}
			}
		   // EVENTS
	      // -----------------------------------------------------
			$(document).on('vclick','[data-share]', function(){
				var data = $(this).data(),
					service = data.share;
				if(service) {
					window.open(setLinks(data),"share", "menubar=0,resizable=0,width=980,height=480");			
				}
			});
		} // end socialLinks

	// run
	App.socialLinks();

}); // end define