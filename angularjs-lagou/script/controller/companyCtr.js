'use strict';

angular.module('app').controller('companyCtr',
	['$scope', '$state', '$http', function($scope, $state, $http) {

    $http.get('public/data/company.json?id' + $state.params.id).success(function(res) {
        $scope.company = res;
        console.log(res)
    })
}])
