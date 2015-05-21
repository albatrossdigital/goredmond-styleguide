'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
    app: 'app',
    dist: 'dist',
    bootSass: 'bower_components/bootstrap-sass-official/assets/stylesheets/',
    bootJs:   'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/',
    bourbon:  'bower_components/bourbon/dist/',
    theme_css: 'css',
    theme_scss: 'scss',

		sass: {
      options: {
        includePaths: [
          '<%= app %>/<%= bootSass %>',
          '<%= app %>/<%= bourbon %>'
        ]
      },
      dist: {
        options: {
          outputStyle: 'extended'
        },
        files: {
          '<%= app %>/<%= theme_css %>/app.css': '<%= app %>/<%= theme_scss %>/app.<%= theme_scss %>'
        }
      }
    },

		clean: {
			dist: {
				src: ['<%= dist %>/*']
			},
		},
		copy: {
			dist: {
				files: [{
					expand: true,
					cwd:'<%= app %>/',
					src: ['fonts/**', '**/*.html', '**/*.mst', '!**/*.<%= theme_scss %>', '!bower_components/**'],
					dest: '<%= dist %>/'
				} , {
					expand: true,
					flatten: true,
					src: ['<%= app %>/bower_components/font-awesome/fonts/**'],
					dest: '<%= dist %>/fonts/',
					filter: 'isFile'
				} ]
			},
		},

		imagemin: {
			target: {
				files: [{
					expand: true,
					cwd: '<%= app %>/images/',
					src: ['**/*.{jpg,gif,svg,jpeg,png}'],
					dest: '<%= dist %>/images/'
				}]
			}
		},

		uglify: {
			options: {
				preserveComments: 'some',
				mangle: false
			}
		},

		useminPrepare: {
			html: ['<%= app %>/index.html'],
			options: {
				dest: '<%= dist %>'
			}
		},

		usemin: {
			html: ['<%= dist %>/**/*.html', '!<%= app %>/bower_components/**'],
			css: ['<%= dist %>/css/**/*.css'],
			options: {
				dirs: ['<%= dist %>']
			}
		},

		watch: {
			grunt: {
				files: ['Gruntfile.js'],
				tasks: ['sass']
			},
			sass: {
				files: '<%= app %>/<%= theme_scss %>/**/*.<%= theme_scss %>',
				tasks: ['sass']
			},
			livereload: {
				files: ['<%= app %>/**/*.html', '<%= app %>/**/*.mst', '!<%= app %>/bower_components/**', '<%= app %>/js/**/*.js', '<%= app %>/css/**/*.css', '<%= app %>/images/**/*.{jpg,gif,svg,jpeg,png}'],
				options: {
					livereload: true
				}
			}
		},

		connect: {
			app: {
				options: {
					port: 9000,
					base: '<%= app %>/',
					open: true,
					livereload: true,
					hostname: '127.0.0.1'
				}
			},
			dist: {
				options: {
					port: 9001,
					base: '<%= dist %>/',
					open: true,
					keepalive: true,
					livereload: false,
					hostname: '127.0.0.1'
				}
			}
		},

		wiredep: {
			target: {
				src: [
					'<%= app %>/**/*.html'
				],
				exclude: [
					'modernizr',
					'jquery-placeholder',
					'jquery.cookie',
					'bootstrap-sass-official'
				]
			}
		},

    'gh-pages': {
      options: {
        base: 'dist'
      },
      src: ['**']
    }

	});

	
	grunt.registerTask('compile-sass', ['sass']);
	grunt.registerTask('bower-install', ['wiredep']);
	
	grunt.registerTask('default', ['compile-sass', 'bower-install', 'connect:app', 'watch']);
	grunt.registerTask('server-dist', ['connect:dist']);
	
	grunt.registerTask('publish', ['compile-sass', 'clean:dist', 'useminPrepare', 'copy:dist', 'newer:imagemin', 'concat', 'cssmin', 'uglify', 'usemin']);

	grunt.registerTask('github', ['publish', 'gh-pages']);

};
