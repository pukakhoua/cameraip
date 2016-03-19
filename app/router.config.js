/**
 * Created by Poka on 2/20/2016.
 */

define(['app'], function (app) {
    app.config(Config);

    function Config($locationProvider, $stateProvider, $urlRouterProvider, $uiViewScrollProvider, MODULE_CONFIG) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise(function ($injector, $location) {
            $injector.get('$state').go('404');
        });
        //$uiViewScrollProvider.useAnchorScroll();
        $stateProvider
            .state('404', {
                templateUrl: 'views/pages/404.html'
            })
            .state('root', {
                abstract: true,
                url: '',
                views: {
                    'footer': {
                        templateUrl: 'views/partials/footer/_footer.html'
                    },
                    'sidebar': {
                        templateUrl: 'views/partials/sidebar/_sidebar.html',
                        controller: '_SidebarCtrl',
                    },
                    'topmenu': {
                        templateUrl: 'views/partials/top-menu/_topMenu.html',
                        controller: '_TopMenuCtrl',
                    },
                },
                resolve: load('oc.app')
            })
            .state('root.home', {
                url: '/',
                views: {
                    '@': {
                        templateUrl: "views/ui/home/home.html",
                        controller: 'HomeCtrl',
                    }
                },
                resolve: load('oc.home')
            })
            .state('root.buildBed', {
                url: '/build-a-bed',
                views: {
                    '@': {
                        templateUrl: "views/ui/build-a-bed/buildABed.html",
                        controller: 'BuildABedCtrl',
                    }
                },
                resolve: load('oc.buildbed')
            })
            
            .state('root.contact', {
                url: '/contact',
                views: {
                    '@': {
                        templateUrl: "views/ui/contact/contact.html?v=1.0",
                        controller: 'ContactCtrl',
                    }
                },
                resolve: load('oc.contact')
            })
        ;

        function load(srcs, callback) {
            return {
                deps: ['$ocLazyLoad', '$q',
                    function ($ocLazyLoad, $q) {
                        var deferred = $q.defer();
                        var promise = false;
                        srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                        if (!promise) {
                            promise = deferred.promise;
                        }
                        angular.forEach(srcs, function (src) {
                            promise = promise.then(function () {
                                angular.forEach(MODULE_CONFIG, function (module) {
                                    if (module.name == src) {
                                        if (!module.module) {
                                            name = module.files;
                                        } else {
                                            name = module.name;
                                        }
                                    } else {
                                        name = src;
                                    }
                                });
                                return $ocLazyLoad.load(name);
                            });
                        });
                        deferred.resolve();
                        return callback ? promise.then(function () {
                            return callback();
                        }) : promise;
                    }]
            }
        }
    }
})