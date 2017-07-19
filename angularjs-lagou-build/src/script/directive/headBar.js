'use strict';

angular.module('app').directive('appHeadBar', [function() {
    return {
        restrict: 'A', // A:属性，E:元素，M:样式。C:注释
        replace: true,
        templateUrl: 'view/template/headBar.html',
        scope: {
            text: '@'
        },
        link: function(scope, element, attr) {
            scope.back = function() {
                window.history.back();
            }
        }
    }
}])
