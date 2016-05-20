'use strict';

/**
 * @ngdoc function
 * @name bemindApp.controller:CustomerCtrl
 * @description
 * # CustomerCtrl
 * Controller of the bemindApp
 */
angular.module('bemindApp')
  .controller('CustomerCtrl', function ($scope, api) {
    
  	$scope.users = [];

  	$scope.getUsers = function(){
  		api.getUsers(function(result){
  			$scope.users = result;
  		});
  	};

  	$scope.register = function(){
  		console.log($scope.customer);
  		api.register($scope.customer, function(result){
  			$scope.customer = null;
  		});
  	}

  	$scope.remove = function(id){
  		console.log(id);
  		api.remove(id, function(result){
  			$scope.getUsers();
  		});
  	}

  	$scope.getUsers();

  });
