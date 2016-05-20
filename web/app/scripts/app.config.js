'use strict';

angular.module("bemindApp")
.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
}])

.constant('ApiConfig', {
    // 'API_URL': 'http://52.37.202.27/api', //PROD
    'API_URL': 'http://127.0.0.1:8000/api',    //LOCAL
});