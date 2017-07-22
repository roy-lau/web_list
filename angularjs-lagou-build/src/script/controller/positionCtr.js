'use strict';

angular.module('app').controller('positionCtr',['$scope', '$q', '$state', '$http','$log','cache',
    function($scope, $q, $state, $http,$log,cache) {

    $scope.isLogin = !!cache.get('name');
    $scope.message = $scope.isLogin?'投个简历':'去登陆'
    function getPosition() {
        var def = $q.defer();       // 定义一个promise对象
        $http.get('data/position.json?id' + $state.params.id).success(function(res) {
            $scope.position = res;
            if (res.posted) {
                $scope.message = "已投递";
            }
            def.resolve(res);    // 调用promise对象resolve方法传递成功的数据
        }).error(function(err) {
            def.reject(err);     // 调用promise对象reject方法传递失败的数据
        })
        return def.promise;      // 返回一个promise对象
    }

    function getCompany(id) {
        $http.get('data/company.json?id' + id).success(function(res) {
            $scope.company = res;
        })
    }
    getPosition().then(function(obj) {
        getCompany(obj.companyId)
    });

    $scope.go = function(){
        if ($scope.message !== "已投递") {
            if ($scope.isLogin) {
                $http.post('data/handle.json',{
                    id: $scope.position.id
                }).success(function(res){
                    // $log.info(res)；
                    $scope.message = "已投递";
                })
            }else{
                $state.go('login')
            }
        }
    }
}])
