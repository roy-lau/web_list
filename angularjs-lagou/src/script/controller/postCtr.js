'use strict';

angular.module('app').controller('postCtr',['$scope', function($scope) {
	$scope.tabList  = [{
		id:'all',
		name:'全部'
	},{
		id:'pass',
		name:'面试邀请'
	},{
		id:'fail',
		name:'不合适'
	}]
}])
