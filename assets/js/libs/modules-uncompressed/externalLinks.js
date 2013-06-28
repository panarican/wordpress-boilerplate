define(['jquery'], function($){
App.externalLinks = function(){
		// outside links
		$("a").filter(function () {
		    return this.hostname && this.hostname.replace(/^www\./, '') !== location.hostname.replace(/^www\./, '');
		}).each(function () {
		    $(this).attr({
		        target: "_blank",
		        title: "Visit " + this.href + " (click to open in a new window)"
		    });
		});
		// external files or mailto link
		$('a[href*=".pdf"]:not([href^=mailto])').each(function () {
		    $(this).attr({
		        target: "_blank"
		    });
		});
		$('a[href="#newsletter"]').each(function () {
		    $(this).removeAttr('target');
		});
	} // end externalLinks
	
// run
App.externalLinks();

}); // end define