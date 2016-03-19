// Declare app level module which depends on views, and components
define(function () {
    var app = angular.module('myApp', [
        //'ngRoute',
        'oc.lazyLoad',
        //'routeResolver',
        //'myApp.home',
        //'myApp.about',
        //'myApp.buildABed',
        //'myApp.contact',
        //'myApp._topMenu',
        //'myApp._sidebar',


        'module.utils',
        'module.services',
        'module.common',
        'ngMessages',
        'ngMaterial',
        'ngAnimate',
        'ui.router',
        'ngCookies',
        'templates',
        'cfp.loadingBar'
        //'angular-loading-bar'

    ]);
    angular.module('templates', []);
    //angular.module('module.services', []);
    //angular.module('module.utils', []);
    //angular.module('module.common', []);
    return app;
})


