"use strict";

angular.module('app').value('dict',{}).run(['$http','dict',function($http,dict){
	$http.get('data/city.json').success(function(res){
		dict.city = res;
	})
	$http.get('data/salary.json').success(function(res){
		dict.salary = res;
	})
	$http.get('data/scale.json').success(function(res){
		dict.scale = res;
	})
}])