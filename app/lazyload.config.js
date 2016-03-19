/**
 * Created by Poka on 2/20/2016.
 */
define(['app'], function(app) {
    app.config(Config)
        .constant('MODULE_CONFIG', [
            {
                name: 'oc.app',
                module: false,
                files: [
                    'views/partials/sidebar/_sidebar.js',
                    'views/partials/top-menu/_topMenu.js',
                    'assets/js/my-utils/utils.js',
                    'assets/js/implement/ApiHttpInterceptor.js',
                ]
            },
            {
                name: 'oc.home',
                module: false,
                files: [
                    'views/ui/home/home.js',
                    'assets/js/vendor/revslider/js/jquery.themepunch.tools.min.js',
                    'assets/js/vendor/revslider/js/jquery.themepunch.revolution.min.js',
                ]
            },
            {
                name: 'oc.buildbed',
                module: false,
                files: ['views/ui/build-a-bed/buildABed.js']
            }
            , {
                name: 'oc.contact',
                module: false,
                files: ['views/ui/contact/contact.js', 'assets/js/services/contact.service.js']
            }, {
                name: '',
                module: false,
                files: []
            }, {
                name: '',
                module: false,
                files: []
            }, {
                name: '',
                module: false,
                files: []
            }, {
                name: '',
                module: false,
                files: []
            }, {
                name: '',
                module: false,
                files: []
            }, {
                name: '',
                module: false,
                files: []
            }, {
                name: '',
                module: false,
                files: []
            }, {
                name: '',
                module: false,
                files: []
            }, {
                name: '',
                module: false,
                files: []
            },
        ])
        ;

    function Config($ocLazyLoadProvider, MODULE_CONFIG) {
        $ocLazyLoadProvider.config({
            events: true,
            debug: true,
            asyncLoader: require,
            modules: MODULE_CONFIG
        });

    }
})