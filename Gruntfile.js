/*
 * grunt-autoprefixer
 *
 * Copyright (c) 2013 Dmitry Nikitenko
 * Licensed under the MIT license.
 */
module.exports = function(grunt) {
  var globalConfig = {
    urls: [
      // Home page.
      'http://www.red-route.org',

      // Blog post.
      'http://www.red-route.org/articles/covers-and-cover-versions',

      // Code item.
      'http://www.red-route.org/code/bytes-and-megabytes-conversion-calculator',

      // View.
      'http://www.red-route.org/stuff/quotations',


    ]
  }

  grunt.initConfig({
    globalConfig: globalConfig,
    pkg: grunt.file.readJSON('package.json'),
    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },
    sprite:{
      all: {
        src: 'images/icons/*.png',
        dest: 'images/spritesheet.png',
        destCss: 'sass/_sprites.scss'
      }
    },
    autoprefixer: {
      dist: {
        files: {
          'css/styles.css': 'css/styles.css'
        }
      }
    },
    watch: {
      css: {
        files: 'sass/**/*.scss',
        tasks: ['compass', 'newer:imagemin', 'newer:autoprefixer'],
        options : {

        }
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'images/'
        }]
      }
    },
    analyzecss: {
      files: ['css/styles.css'],
      options: {
        outputMetrics: 'warn',
        reportFile: 'report.json',
        analyzecss: {
          // analyzecss specific options
        },
        thresholds: {
          // custom thresholds values
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default',['compass', 'newer:imagemin', 'newer:autoprefixer']);
}