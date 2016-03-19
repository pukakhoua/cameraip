'use strict';

angular.module('myApp._sidebar', ['ui.router'])

    .controller('_SidebarCtrl',
        function ($scope, $log, Helper, $document, $mdSidenav, $window, $timeout) {
            var body = angular.element($document[0].querySelector('body'));
            $scope.$watch(function () {//https://docs.angularjs.org/api/ng/type/$rootScope.Scope
                return window.innerWidth; //Lắng nghe cái gì?
            }, function (value) {//Invoke khi lắng nghe cái gì ở trên change
                if (value >= 640) {
                    $mdSidenav('leftSideNav').close();
                }
            });


            //$scope.$watch(function () {
            //    return $mdSidenav('leftSideNav').isOpen();;
            //}, function (value) {
            //    Helper.broadcastWhat('handlToggleBodyScrollbar',value);
            //});
        });