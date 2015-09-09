'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'lib/*.js',
        'tasks/*.js',
        '!test/tmp/*'
      ]
    },

    jscs: {
      options: {
        config: '.jscsrc'
      },
      all: {
        src: ['<%= jshint.all %>']
      }
    },

    copy: {
      test: {
        flatten: true,
        src: ['test/fixtures/cookies.js'],
        dest: 'test/tmp/cookies-<%= grunt.template.today("yymmddHHMM") %>.js'
      }
    },
    filerev: {
      compile: {
        src: ['test/tmp/cookies-<%= grunt.template.today("yymmddHHMM") %>.js']
      },
      withConfig: {
        options: {
          algorithm: 'md5',
          length: 8
        },
        src: ['test/tmp/cfgfile.js']
      },
      withDest: {
        src: ['test/fixtures/file.js'],
        dest: 'test/tmp/dest'
      }
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-jscs');

  grunt.registerTask('default', [
    'jscs',
    'copy',
    'filerev'
  ]);

};
