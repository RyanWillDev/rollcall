module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    html2js: {
      options: {
        singleModule: true,
        useStrict: true,
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        }
      },
      main: {
        src: ['src/partials/*.html'],
        dest: 'temp/templates.js'
      }
    },
    concat: {
      options: {
        separartor: ';'
      },
      dist: {
        src: ['temp/templates.js', 'src/app.js'],
        dest: 'public/app.js'
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      compress: {
        files: {
          'public/app.min.js': 'public/app.js'
        }
      }
    },
    clean: ['./temp']
  });

  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['html2js', 'concat', 'uglify', 'clean']);
};
