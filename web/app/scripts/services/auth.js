'use strict';

angular.module('bemindApp')
.factory('auth', function ($window, $rootScope, $location, api) {
    var storage = $window.localStorage;
    var cachedToken = "-1";
    var cachedUser;
    return {
        login: function (email, password, cb) {
            var a = this;
            api.login(email, password, function (result) {

                if (result && result.user_type && result.user_type != 'consumer') {
                    localStorage.setItem('user', '{ "email" : "'+email+'" }');
                    $rootScope.user = result.user;
                    a.setToken(result.token);
                    a.setUserType(result.user_type, result.user.is_admin || false);
                    cb(result);
                }else{
                    cb(false);
                }
            });
        },
        
        setUserType: function (user_type, employee_admin) {
            
            if (user_type == 'employee' && employee_admin){
                storage.setItem('Step_UserType', 'employee_admin');
            }else{
                storage.setItem('Step_UserType', user_type);
            }
        },
        getUserType: function () {
            return storage.getItem('Step_UserType');
        },
        setToken: function (token) {
            cachedToken = token;
            storage.setItem('Step_UserToken', token);
        },
        getToken: function () {
            if (cachedToken == "-1") cachedToken = storage.getItem('Step_UserToken');
            if (cachedToken === null) cachedToken = "-1";
            return cachedToken;
        },
        isAuthenticated: function () {
            // console.log("isAuth", this.getToken());
            return this.getToken() != "-1";
        },
        logout: function () {
            this.setToken("-1");
            $rootScope.permissions = {ready: false};
            $rootScope.$emit("update-user-token", "-1");
            localStorage.removeItem('user');
        },
        getUser: function (token, cb) {
            var a = this;
            if (cachedUser) {
                return cachedUser;
            } else {
                var lookup = function (result) {
                    if (result.status == 200) {
                        cachedUser = result;
                        $rootScope.$emit("user-lookup", result);
                        cb(cachedUser);
                    } else {
                        //console.log("getUser errror");
                        storage.removeItem('Step_UserToken');
                        cachedToken = "-1";
                        $rootScope.$emit("update-user-token", "-1");
                        $location.path('/login');
                    }
                };
                api.lookup(token, lookup);
                return "NO_CACHE";
            }
        }
    };
});