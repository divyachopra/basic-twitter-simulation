/**
 * Created by Divya Chopra on 1/13/2017.
 */

var app = angular.module('chirpApp',['ngRoute']);

app.config(function ($routeProvider){
    $routeProvider
   .when('/',{
       templateUrl: 'main.html',
        controller: 'mainController'
    })
   .when('/login',{
   templateUrl: 'login.html',
   controller: 'authController'
   })
   .when('/register',{
   templateUrl: 'register.html',
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

app.controller('authController',function ($scope) {
    $scope.user = {username:'', password:''};
    $scope.error_message='';

    $scope.login=function(data){
      $scope.posts=data;
    };

    $scope.register=function(){
        $scope.error_message='registeration request for '+ $scope.user.username;
        console.log('here');
    };
});

