'use strict';

angular.module('app').directive('appPositionInfo', [function() {
    return {
        restrict: 'A', // A:属性，E:元素，M:样式。C:注释
        replace: true,
        templateUrl: 'view/template/positionInfo.html',
        scope:{
        	isActive: '='
        },
        link: function(scope){
        	scope.imagePath = scope.isActive?"public/image/star.png":"public/image/star-active.png"
        }
    }
}])
