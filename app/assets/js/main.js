


var utils = {
    GetApiUrl: function(path) {
        return appConfig.apiRoute + path;
    },
    getRootUrl: function(){
        return window.location.origin ? window.location.origin + '/' : window.location.protocol + '/' + window.location.host + '/';
    },
    log: function(message) {
        if (appConfig.enableConsoleLog)
            console.log(message);
    }
};

var appConfig = {
    apiRoute:utils.getRootUrl()+'proxy/',
    lastUrl: '',
    xsrfHeaderName: 'X-BSTokenWeb',
    xsrfCookieName: 'BSTokenWeb',
    isDebug: true,
    enableConsoleLog: true
};

