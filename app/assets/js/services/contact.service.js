/**
 * Created by Poka on 1/31/2016.
 */
angular.module('module.services')
    .factory('ContactService', function ($http) {
        var contact = {};

        contact.createContact = function (submitData, callback) {
            var data = $.param(submitData)
            $http.post(utils.GetApiUrl('contact/create-contact'), data)
                .then(function (response) {
                    callback(response);
                }, function (response) {
                    console.log(response);
                });
        }

        return contact;
    });