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

    api.lookup = function (token, cb) {
        cb({status: 200, name: 'Victor'});
    };

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

    api.register = function(data, cb){
      cb('to do');
    };
    

    api.getCities = function(id, cb){
      $http.get(apiUrl + '/cities/'+id+'/', {headers: {'Authorization': 'JWT '+storage.getItem('Step_UserToken')}})
        .then(function (data) {
          cb(data.data);
        }, function (error) {
          console.warn('Error getCities: ', error);
          cb([]);
      });
    };

    api.getStates = function(cb){
      $http.get(apiUrl + '/states/', {headers: {'Authorization': 'JWT '+storage.getItem('Step_UserToken')}})
        .then(function (data) {
          cb(data.data);
        }, function (error) {
          console.warn('Error getStates: ', error);
          cb([]);
      });
    };

    api.getAddressByCEP = function(cep, cb){
      $http.get(apiUrl + '/geocoder/location/?cep='+cep, {headers: {'Authorization': 'JWT '+storage.getItem('Step_UserToken')}})
        .then(function (data) {
          cb(data.data);
        }, function (error) {
          console.warn('Error getAddress: ', error);
          cb(false);
      });
    };


    return api;
});