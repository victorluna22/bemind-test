'use strict';

/**
 * @ngdoc overview
 * @name bemindApp
 * @description
 * # bemindApp
 *
 * Main module of the application.
 */
angular
  .module('bemindApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'LocalStorageModule'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/customer', {
        templateUrl: 'views/customer.html',
        controller: 'CustomerCtrl',
        controllerAs: 'customer',
        resolve: { loggedin: checkLoggedOut }
      })
      .otherwise({
        redirectTo: '/customer'
      });
  });

  var checkLoggedOut = function($q, $timeout, $location, $rootScope) {
    var deferred = $q.defer();

    if ($rootScope.logged_in) {
      deferred.resolve();
    } else {
      $timeout(deferred.reject);
      return $location.url('/login');
    }

    return deferred.promise;
};
