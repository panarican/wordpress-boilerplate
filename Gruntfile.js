/*global module:false*/
module.exports = function(grunt) {

// vars
var jsName = 'main',
    distAssets = 'assets/',
    devAssets = 'assets/',
    jsFile = 'js/'+jsName+'.js',
    jsFileMin = 'js/'+jsName+'.min.js';
    distJs = distAssets+jsFileMin,
    devJs = devAssets+jsFile;

  // Loading in tasks
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-copy');

 // Project configuration.
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),

  uglify: {
    options: {
      mangle: {
        except: ['jQuery', 'Backbone', 'Underscore', 'RequireJs', 'History', '$', '$.cookie']
      },
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */'
    },
    dist: {
      files: [
          {
          src: [devJs],
          dest: distJs
          },
           {
            expand: true,
            cwd: devAssets+'js/libs/modules-uncompressed/',
            src: ['**/*.js','*.js'],
            dest:  distAssets+'js/libs/modules/'
          }
        ]
    }
  },

 compass: {
    dist: {
        options: {
        imagesDir: distAssets+'img',
        fontsDir: distAssets+'fonts',
        javascriptsDir: distAssets+'js',
        sassDir: devAssets+'sass',
        cssDir: distAssets+'css',
        outputStyle: "compressed"
      }
    }
  },

   imagemin: {
      dist: {
        options: {
        optimizationLevel: 7
        },
        files: [
          {
            expand: true,
            cwd: devAssets+'img-uncompressed/',
            src: ['**'],
            dest:  distAssets+'img/'
          }
        ]
      }
    },

    copy: {
      dist: {
        files: [
         {
            expand: true,
            cwd: devAssets+'img-uncompressed/',
            src: ['**/*.gif','*.gif', '**/*.svg', '*.svg'],
            dest:  distAssets+'img/'
          }
        ]
      }
    },

  watch: {
    assets: {
      files: [
      devAssets+'sass/*',
      devAssets+'sass/**',
      devAssets+'img-uncompressed/*',
      devAssets+'img-uncompressed/**',
      devJs,
      devAssets + 'js/modules-uncompressed/*',
      devAssets + 'js/modules-uncompressed/**'
      ],
      tasks: ['compass','uglify','imagemin','copy']
    }
  }

});


// src: '{,*/}*.{gif}',
// alias tasks everything in the array gets run by simply typing grunt
grunt.registerTask('default', ['uglify','compass','imagemin','copy','watch']);

}