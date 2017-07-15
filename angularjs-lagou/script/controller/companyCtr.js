'use strict';

angular.module('app').controller('companyCtr', ['$scope', '$state', '$http', function($scope, $state, $http) {
   	alert("ctr")
    $http.get('public/data/company.json?id' + $state.params.id).seccus(function(res) {
        console.log(res)
        $scope.company = res;
    })
}])
