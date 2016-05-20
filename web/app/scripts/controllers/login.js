'use strict';

/**
 * @ngdoc function
 * @name bemindApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the bemindApp
 */
angular.module('bemindApp')
  .controller('LoginCtrl', function ($scope, $rootScope, $location, auth) {

    $rootScope.logged_in = auth.isAuthenticated();
    $scope.email = 'victorluna22+2@gmail.com';
    $scope.password = 'v183729465';
    // if (!$rootScope.logged_in){
    //   $rootScope.login_screen = true;  
    // }
    // this.login = 1;
    // this.register = 0;
    // this.forgot = 0;
    var original;
    
    // original = angular.copy($rootScope.login_user);
    
    $scope.loginSubmit = function () {
    	console.log('email', $scope.email);
    	console.log('password', $scope.password);
        auth.login($scope.email, $scope.password, function (result) {
            if (result) {
            	console.log(result);
                // growlService.growl('Bem vindo!', 'success');
                // $state.transitionTo('home');
            } else {
               // growlService.growl('There was an error processing the request. Try again', 'danger');
           }
       });
    };

  });
