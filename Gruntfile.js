// Please refer to the README file before trying to edit this file.
module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        // directory config
        folders: {
            res: 'resources',
            target: 'public',
            components: 'bower_components/'
        },

        concat: {
            app: {
                src: [
                    '<%=folders.components%>/jquery/jquery.js',
                    //'<%=folders.components%>/auto-suggest/jquery.autoSuggest.js',
                    //'<%=folders.components%>/bootstrap/js/affix.js',
                    //'<%=folders.components%>/bootstrap/js/alert.js',
                    //'<%=folders.components%>/bootstrap/js/button.js',
                    //'<%=folders.components%>/bootstrap/js/carousel.js',
                    //'<%=folders.components%>/bootstrap/js/collapse.js',
                    //'<%=folders.components%>/bootstrap/js/dropdown.js',
                    //'<%=folders.components%>/bootstrap/js/modal.js',
                    //'<%=folders.components%>/bootstrap/js/popover.js',
                    //'<%=folders.components%>/bootstrap/js/scrollspy.js',
                    //'<%=folders.components%>/bootstrap/js/tab.js',
                    //'<%=folders.components%>/bootstrap/js/tooltip.js',
                    //'<%=folders.components%>/bootstrap/js/transition.js',
                    //'<%=folders.components%>/bootstrap/js/typeahead.js',
                    '<%=folders.components %>/twig.js/twig.js',
                    '<%=folders.components %>/underscore/underscore.js',
                    '<%=folders.components %>/backbone/backbone.js',
                    '<%=folders.components %>/backbone.stickit/backbone.stickit.js',
                    '<%=folders.res%>/js/Util/*.js',
                    '<%=folders.res%>/js/Model/*.js',
                    '<%=folders.res%>/js/View/*.js',
                    '<%=folders.res%>/js/Dialogs/*.js',
                    '<%=folders.res%>/js/Controller/*.js'
                ],
                dest: '<%=folders.target%>/js/app.js'
            }

        },

        // Minify
        uglify: {
            jquery: {
                files:
                {
                    '<%=folders.res%>/js/app.js': ['<%=folders.target%>/js/app.js']
                }
            }
        },

        // Define here all GZip files config
        compress: {
            gzip: {
                options: {
                  mode: "gzip"
                },
                files: {
                    "<%=folders.target%>/css/screen.css.gz": "<%=folders.target%>/css/screen.css",
                    "<%=folders.target%>/css/print.css.gz": "<%=folders.target%>/css/print.css",
                    "<%=folders.target%>/js/app.js.gz": "<%=folders.target%>/js/app.js"
                }
            }
        },
        copy: {
            images: {
                files: [
                    {
                        src: '**',
                        dest: '<%= folders.target %>/images/',
                        expand: true,
                        cwd: '<%= folders.res %>/images/'
                    }
                ]
            },
            fonts: {
                files: [
                    {
                        src: ['*.eot', '*.ttf', '*.woff', '*.otf', '*.svg', '.htaccess'],
                        dest: '<%= folders.target %>/fonts/',
                        expand: true,
                        cwd: '<%= folders.res %>/fonts/'
                    }
                ]
            }

        },
        less: {
            application: {
                options: {
                    paths: [
                        "<%= folders.components %>",
                        "resources/less"
                    ],
                    yuicompress: false
                },
                files: {
                    "public/css/screen.css": "resources/less/css-screen.less"
                }
            }
        },
        // watch for SASS/JS files modifications & rebuild
        watch: {
            less: {
                files: 'resources/less/**',
                tasks: ['css']
            },
            js: {
                files: ['<%=folders.dest%>/js/**/*.js'],
                tasks: ['uglify']
            },
            images: {
                files: '<%= folders.res %>/images/**',
                tasks: ['copy:images']
            },
            fonts: {
                files: '<%= folders.res %>/fonts/**',
                tasks: ['copy:fonts']
            }
        },
        twig: {
            options: {
                template_key: function(path) {return path.split("/").pop().replace(".twig", ""); },
                amd_wrapper: false,
                each_template: 'ProjectSkeleton.Utils.Template.add("{{ filepath }}", {{ compiled }});'
            },
            base: {
                src: [
                    '<%= folders.res %>/twigjs/TestDialog.html.twig'
                ],
                dest: '<%= folders.target %>/js/templates.base.js'
            }
        }

    });

    // Loading extra tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-twig');

    // Default call = building all JS / CSS
    grunt.registerTask('default', 'build');
    grunt.registerTask('css', 'less');
    grunt.registerTask('js', ['twig', 'concat']);

    // Complete build
    grunt.registerTask('build', ['js', 'css', 'copy']);
    grunt.registerTask('deploy', ['js', 'uglify', 'css', 'img', 'compress']);
};
