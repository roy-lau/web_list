'use strict';

angular.module('app').directive('appHead', ['cache',function(cache) {
    return {
        restrict: 'A', // A:属性，E:元素，M:样式。C:注释
        replace: true,
        templateUrl: 'view/template/head.html',
        link:function(scope){
        	scope.name = cache.get("name") || '';
        }
    }
}])
