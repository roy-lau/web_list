'use strict';

angular.module('app').controller('favoriteCtr',['$scope', '$state', '$http', function($scope, $state, $http) {
	$http.get('data/myFavorite.json').success(function(res){
		$scope.list = res;
	})
}])
