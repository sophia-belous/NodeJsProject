module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ngAnnotate: {
            app: {
                files: {
                    'public/js/build/production.js': ['public/js/build/production.js']
                }
            }
        },
        concat: {
            dist: {
                src: [
                    'public/js/controllers/MainCtrl.js',
                    'public/js/controllers/AuthCtrl.js',
                    'public/js/controllers/AdminCtrl.js',
                    'public/js/services/AnimalService.js',
                    'public/js/services/AuthService.js',
                    'public/js/appRoutes.js',
                    'public/js/appDirectives.js',
                    'public/js/app.js',
                ],
                dest: 'public/js/build/production.js',
            }
        },
        uglify: {
            build: {
                src: 'public/js/build/production.js',
                dest: 'public/js/build/production.min.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-ng-annotate');    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('heroku', ['concat', 'ngAnnotate', 'uglify']);

};	