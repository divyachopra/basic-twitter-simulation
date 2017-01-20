/**
 * Created by Divya Chopra on 1/13/2017.
 */

var app = angular.module('chirpApp',['ngRoute']).run(function ($rootScope) {
    $rootScope.authenticated = false;
    $rootScope.current_user="";

    $rootScope.logout = function(){
        $http.get('/auth/signout');
        $rootScope.authenticated = false;
        $rootScope.current_user="";
    };
});

app.config(function ($routeProvider){
    $routeProvider
   .when('/',{
       templateUrl: "main.html",
        controller: 'mainController'
    })
   .when('/login',{
   templateUrl: "login.html",
   controller: 'authController'
   })
   .when('/register',{
   templateUrl: "register.html",
   controller: 'authController'
   });

});

app.controller('mainController', function ($scope) {
    $scope.posts = [];
    $scope.newPost={created_by: '', text: '', created_at:''};
    $scope.post = function () {

        $scope.newPost.created_at = Date.now();
        $scope.posts.push($scope.newPost);
        $scope.newPost = {created_by: '', text: '', created_at: ''};
    };
});

app.controller('authController',function ($scope, $http, $rootScope, $location) {
    $scope.user = {username:'', password:''};
    $scope.error_message='';

    $scope.login=function(data){
      $http.posts('/auth/login',$scope.user).success(function(data){
            $rootScope.authenticated = true;
            $rootScope.current_user=data.user.username;

            $location.path('/')
      });
    };

    $scope.register=function(){
        $http.posts('/auth/signup',$scope.user).success(function(data){
            $rootScope.authenticated = true;
            $rootScope.current_user=data.user.username;

            $location.path('/')
        });
    };
});

