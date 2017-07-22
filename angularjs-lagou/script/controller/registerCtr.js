'use strict';

angular.module('app').controller('registerCtr', ['$scope', '$state', '$interval', '$http', function($scope, $state, $interval, $http) {
    $scope.submit = function() {
        $http.post('public/data/regist.json',$scope.user).success(function(res) {
            // console.log(res)
            alert("注册成功！")
            $state.go('login');
        });
    }
    $scope.send = function() {
        $http.get('public/data/code.json').success(function(res) {
            if (1 == res.state) {
                var count = 60;
                $scope.time = "60S";
                var timer = $interval(function() {
                    if (count <= 0) {
                        $interval.cancel(timer)
                        $scope.time = "";
                        return;
                    } else {
                        count--;
                        $scope.time = count + 's ';
                    }
                }, 1000)
            }
        })
    }
}])