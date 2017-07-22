'use strict';

angular.module('app').controller('loginCtr',['$scope', 'cache', '$state','$http', function($scope, cache, $state,$http) {
	$scope.submit = function(){
		$http.post('public/data/login.json').success(function(res){
			cache.put("name",res.name);
			cache.put("id",res.id);
			cache.put("image",res.image);
			$state.go('main')
		})
	}
}])
