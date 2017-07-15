'use strict';
angular.module('app').directive('appCompary', [function(){
  return {
    restrict: 'A',
    replace: true,
    scope: {
      com: '='
    },
    templateUrl: 'view/template/compary.html'
  };
}]);
