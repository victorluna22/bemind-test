'use strict';

/**
 * @ngdoc service
 * @name gdsApp.UserApi
 * @description
 * # UserApi
 * Service in the gdsApp.
 */
angular.module('bemindApp')
  .service('api', function ($window, $http, $location, localStorageService, ApiConfig, $rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var api = {};

    var apiUrl = ApiConfig.API_URL;
    var app_token = ApiConfig.APP_TOKEN;
    var platform = ApiConfig.PLATFORM;
    var client = ApiConfig.CLIENT;
    var storage = $window.localStorage;


    api.login = function (email, password, cb) {
        $http.post(apiUrl + '/login/', {email:email, password:password}, {headers: {}})
        .then(function (data) {
         console.log('Success loginUser: ', data);
          cb(data.data);
        }, function (error) {
          console.warn('Error loginUser: ', error.data.non_field_errors[0]);
          cb(false);
          
        });
    };


    api.getUsers = function(cb){
      $http.get(apiUrl + '/users/', {headers: {'Authorization': 'JWT '+storage.getItem('Step_UserToken')}})
        .then(function (data) {
          cb(data.data);
        }, function (error) {
          console.warn('Error getUsers: ', error);
          cb([]);
      });
    }

    api.register = function (user, cb) {
        $http.post(apiUrl + '/users/', {email: user.email, password: user.password, first_name: user.first_name, last_name: user.last_name}, {headers: {'Authorization': 'JWT '+storage.getItem('Step_UserToken')}})
        .then(function (data) {
          cb(data.data);
        }, function (error) {
          console.warn('Error register: ', error.data.non_field_errors[0]);
          cb(false);
          
        });
    };

    api.remove = function (id, cb) {
        $http.delete(apiUrl + '/users/'+id+'/', {headers: {'Authorization': 'JWT '+storage.getItem('Step_UserToken')}})
        .then(function (data) {
          cb(data.data);
        }, function (error) {
          console.warn('Error register: ', error.data.non_field_errors[0]);
          cb(false);
          
        });
    };

    return api;
});