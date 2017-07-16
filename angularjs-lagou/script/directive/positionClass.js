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
            // 点击职位分类
            scope.showPositionList = function(i){
                // 切换不同样式(button)
                scope.isActive = i;
                // 显示不同职位描述
                scope.positionList = scope.com.positionClass[i].positionList;
        	}
        	 scope.$watch('com', function(newVal){
                if(newVal) scope.showPositionList(0);
              });
        }
    }
}])
