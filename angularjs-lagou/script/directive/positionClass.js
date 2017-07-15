'use strict';

angular.module('app').directive('appPositionClass', [function() {
    return {
        restrict: 'A', // A:属性，E:元素，M:样式。C:注释
        replace: true,
        templateUrl: 'view/template/positionClass.html',
        scope: {
            com: '='
        },
        link: function(scope){
            alert("positionClass")
        	scope.showPositionList = function(i){
        		scope.positionList = scope.com.compositionClass[i].positionList;
        		scope.isActive = i;
        	}
        	scope.showPositionList(0)
        }
    }
}])