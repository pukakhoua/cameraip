/**
 * Created by Poka on 1/31/2016.
 */

appService
    .factory('TestService', function () {
        var test = {};
        test.say = function () {
            alert('I am Test');
        }
        return test;
    });