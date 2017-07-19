"use strict"

angular.module("app")
    .service('cache',['$cookies',function($cookies){
    	this.put = function(k,v){
    		$cookies.put(k,v);
    	};
    	this.get = function(k){
    		return $cookies.get(k);
    	};
    	this.remove = function(k){
    		$cookies.remove(k);
    	};
    }])

// 服务工厂
// .factory('cache', ['$cookies', function($cookies) {
 //        return {
 //            put: function(k, v) {
 //                $cookies.put(k, v);
 //            },
 //            get: function(k) {
 //                return $cookies.get(k);
 //            },
 //            remove: function(k) {
 //                $cookies.remove(k);
 //            }
 //        }
 //    }])
