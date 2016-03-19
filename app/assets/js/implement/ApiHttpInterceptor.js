/**
 * Created by Poka on 1/31/2016.
 */

//TODO: refer to the following link to implement session recovery
//http://www.webdeveasy.com/interceptors-in-angularjs-and-useful-examples/
angular.module('module.common', ['ui.router', 'ngCookies'])
    .factory('ApiHttpInterceptor', function ($q, $injector, $exceptionHandler) {
        var loadingCount = 0, isBusy = false;
        return {
            // optional method
            'request': function (config) {
                ++loadingCount;
                var $cookies = $injector.get('$cookies');
                var $http = $injector.get('$http');
                var $log = $injector.get('$log');

                if ((!$cookies.checkCookieExpired() && config.url.indexOf('proxy/') < 0)
                    || config.url.indexOf('views/') >= 0)
                    return config;
                if (config.url.indexOf('proxy/init-session') >= 0)
                    return config;

                //if ($cookies.checkCookieExpired() && !isBusy) {
                //    var deferred = $q.defer();
                //    var lastUrl = config.url;
                //    isBusy=true;
                //    $http.get(utils.GetApiUrl('init-session'))
                //        .then(function (response) {
                //            console.log('Renew session On request success');
                //            $http.get(lastUrl)
                //                .then(function (response) {
                //                    isBusy=false;
                //                    deferred.resolve(config);
                //                }, function (response) {
                //                    isBusy=false;
                //                    deferred.resolve(config);
                //                });
                //        }, function (response) {
                //            isBusy=false;
                //            console.log('Renew session On request failed');
                //        });
                //    return deferred.promise;
                //}
                return config;
            },

            // optional method
            'requestError': function (rejection) {
                // do something on error
                //if (canRecover(rejection)) {
                //    return responseOrNewPromise
                //}
                utils.logWithCheck(rejection);
                return $q.reject(rejection);
            },


            // optional method
            'response': function (response) {
                if (--loadingCount === 0) {
                    //console.log('Request completed');
                }
                if (response.data && response.data.Reload === 1) {
                    alert('Your session was expired. The web page will be reload now!')
                    window.location.reload();
                }
                // do something on success
                return response;
            },

            // optional method
            'responseError': function (rejection) {
                if (--loadingCount === 0) {

                }
                if (rejection.status != 404) {
                    var $mdDialog = $injector.get('$mdDialog');
                    var $mdMedia = $injector.get('$mdMedia');


                    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
                    $mdDialog.show({
                            locals: {
                                response: rejection
                            },
                            controller: DialogController,
                            templateUrl: 'views/partials/popup/dev.errorpopup.html',
                            parent: angular.element(document.body),
                            //targetEvent: ev,
                            clickOutsideToClose: true,
                            fullscreen: useFullScreen
                        })
                        .then(function (answer) {
                        });
                    // utils.logWithCheck(rejection);
                } else {//Error 404
                    //Check out this: http://stackoverflow.com/questions/31509183/how-to-remove-file-not-found-error-in-angular-js
                    //$exceptionHandler(
                    //    new Error(
                    //        rejection.config.method + ' ' +
                    //        rejection.config.url + ' ' +
                    //        rejection.status + ' ' +
                    //        '(' + rejection.statusText + ')')
                    //);
                }


                // do something on error
                //if (canRecover(rejection)) {
                //    return responseOrNewPromise
                //}
                return $q.reject(rejection);
            }
        };
    });


function DialogController($scope, $mdDialog, response, $sce) {
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.response = response;
}