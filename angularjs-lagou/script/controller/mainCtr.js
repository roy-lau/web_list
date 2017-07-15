'use strict';

angular.module('app').controller('mainCtr', ['$scope','$http', function($scope,$http) {
    $http.get("public/data/positionList.json").success(function(res){
       $scope.list = res;
    })
}])
