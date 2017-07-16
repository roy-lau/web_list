'use strict';

angular.module('app').directive('appTab', [function() {
    return {
        restrict: 'A', // A:属性，E:元素，M:样式。C:注释
        replace: true,
        templateUrl: 'view/template/tab.html',
        scope: {
        	list:'=',
        	tabClick:'&'
        },
        link:function(scope){
        	scope.swict = function(tab){
        		scope.selectId = tab.id;
        		scope.tabClick(tab)
        	}
        }
    }
}])
