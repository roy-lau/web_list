'use strict';

angular.module('app').directive('appPositionList', ['$http',function($http) {
    return {
        restrict: 'A', // A:属性，E:元素，M:样式。C:注释
        replace: true,
        templateUrl: 'view/template/positionList.html',
        scope:{
        	data: '=',
        	filterObj: '=',
        	isFavorite: '='
        },
        link:function(scope){

        	scope.select = function(item){
        		$http.post('public/data/favorite.json',{
        			id: item.id,
        			select: !item.select
        		}).success(function(res){
	        		item.select = !item.select;
        		})
        	};
        }
    }
}])
