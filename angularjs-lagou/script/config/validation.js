'use strict'

angular.module('app').config(['$validationProvider',function($validationProvider){
	var expression ={
		phone : /^1[\d]{10}/,
		pwd: function(value){
			return String(value).length > 5;
		},
		required: function(value){
			return !!value;
		}
	};
	var defaultMsg = {
		phone:{
			success: "",
			error: "必须是11为手机号！"
		},
		pwd:{
			success: "",
			error: "长度至少6位"
		},
		required:{
			success:"",
			error:"不能为空"
		}
	};
	$validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
}])