'use strict';

angular.module('app').controller('loginCtr',['$scope', 'cache', '$state', function($scope, cache, $state) {
	$scope.login = function(name,pwd){
		cache.put("name",name);
		$state.go('main')
		// console.log(window.history)
	}
}])
