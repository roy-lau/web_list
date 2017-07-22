'use strict';

angular.module('app').directive('appPositionInfo', ['$http',function($http) {
    return {
        restrict: 'A', // A:属性，E:元素，M:样式。C:注释
        replace: true,
        templateUrl: 'view/template/positionInfo.html',
        scope:{
        	isActive: '=',
            isLogin: '=',
            pos:'='
        },
        link: function(scope){
            scope.$watch('pos',function(newVal){
                if (newVal) {
                scope.pos.select = scope.pos.select || false;
                scope.imagePath = scope.pos.select?"public/image/star-active.png":"public/image/star.png";
                }
            })
            scope.favorite = function(){
                $http.post('public/data/favorite.json',{
                    id: scope.pos.id,
                    select: !scope.pos.select
                }).success(function(){
                    scope.pos.select = !scope.pos.select;
                	scope.imagePath = scope.pos.select?"public/image/star-active.png":"public/image/star.png";
                })
            }
        }
    }
}])
