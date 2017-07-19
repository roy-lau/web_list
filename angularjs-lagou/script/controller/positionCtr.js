'use strict';

angular.module('app').controller('positionCtr',['$scope', '$q', '$state', '$http','cache',
    function($scope, $q, $state, $http,cache) {

    $scope.isLogin = false;
    function getPosition() {
        var def = $q.defer();       // 定义一个promise对象
        $http.get('public/data/position.json?id' + $state.params.id).success(function(res) {
            $scope.position = res;
            def.resolve(res);    // 调用promise对象resolve方法传递成功的数据
        }).error(function(err) {
            def.reject(err);     // 调用promise对象reject方法传递失败的数据
        })
        return def.promise;      // 返回一个promise对象
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
