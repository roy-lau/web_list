"use strict";

angular.module('app').controller('mainCtr', ['$scope', function($scope) {
    $scope.list = [{
        id: 1,
        name: 'WEB前端',
        imgSrc: 'public/image/company-1.png',
        companyName: '百度',
        city: '北京',
        industry: '互联网',
        time: '2017-7-9 0:56'
    },{
        id: 2,
        name: 'PHP',
        imgSrc: 'public/image/company-2.png',
        companyName: '腾讯',
        city: '深圳',
        industry: '互联网',
        time: '2017-7-9 0:56'
    },{
        id: 3,
        name: 'JAVA',
        imgSrc: 'public/image/company-3.png',
        companyName: '千度',
        city: '上海',
        industry: '互联网',
        time: '2017-7-9 0:56'
    }]
}])
