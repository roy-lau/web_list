"use strict"

angular.module("app").config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$stateProvider.state('main',{
		url:'/main',
		templateUrl:'view/main.html'
	});
	$urlRouterProvider.otherwise('main')
}])