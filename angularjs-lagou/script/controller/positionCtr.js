'use strict';

angular.module('app').controller('positionCtr', ['$scope', '$q', '$state', '$http', function($scope, $q, $state, $http) {
    $scope.isLogin = false;
    function getPosition() {
        var def = $q.defer();
        $http.get('public/data/position.json?id' + $state.params.id).success(function(res) {
            $scope.position = res;
            def.resolve(res);
        }).error(function(err) {
            def.reject(err);
        })
        return def.promise;
    }

    function getCompany(id) {
        $http.get('public/data/company.json?id' + id).success(function(res) {
            $scope.company = res;
        })
    }
    getPosition().then(function(obj) {
        getCompany(obj.companyId)
    });
}])
