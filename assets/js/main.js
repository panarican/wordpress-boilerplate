// Created by Efrain Lugo

requirejs.config({
    baseUrl: "/wp-content/themes/wordpress-boilerplate/assets/js/libs",
    paths: {
        "jquery": "//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min",
        "jquery.migrate": "//code.jquery.com/jquery-migrate-1.2.1",
        "brightcove": "//admin.brightcove.com/js/BrightcoveExperiences",
        "modernizr": "modernizr.custom",
        "sugar": "sugar-1.3.9.min"
    },
    shim: {
        'jquery.easing.min': ['jquery'],
        'jquery.migrate': ['jquery'],
        'jquery.history': ['jquery'],
        'jquery.mobile.events': ['jquery']
    }
});

// setup namespace for modules
var App = {};

// require these files
require(["modernizr",
        "jquery",
        "jquery.migrate",
        "jquery.history",
        "consoleFix",
        "modules/enquireHelper",
        "modules/externalLinks"
]);

// conditionally require these files
define(['jquery', 'modernizr', 'modules/requireIf'], function($) {

    requireIf(['modules/placeholderShim'], !Modernizr.input.placeholder);
    requireIf(['modules/socialLinks'], $('[data-share]').length);

});