"use strict";

angular.module('app').value('dict',{}).run(['$http','dict',function($http,dict){
	$http.get('public/data/city.json').success(function(res){
		dict.city = res;
	})
	$http.get('public/data/salary.json').success(function(res){
		dict.salary = res;
	})
	$http.get('public/data/scale.json').success(function(res){
		dict.scale = res;
	})
}])