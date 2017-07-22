'use strict';

angular.module('app').controller('meCtr',['$scope','$http','$state','cache', function($scope, $http ,$state, cache ) {
	if(cache.get("name")){
		$scope.name = cache.get("name");
		$scope.image = cache.get("image");
	}
	$scope.logout = function(){
		cache.remove("name");
			cache.remove("id");
			cache.remove("image");
			$state.go('login');
	}
}])
