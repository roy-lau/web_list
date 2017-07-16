'use strict';

angular.module('app').directive('appPositionList', [function() {
    return {
        restrict: 'A', // A:属性，E:元素，M:样式。C:注释
        replace: true,
        templateUrl: 'view/template/positionList.html',
        scope:{
        	data: '=',
        	filterObj: '='
        }
    }
}])
