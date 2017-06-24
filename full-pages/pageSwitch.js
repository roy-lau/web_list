;(function () {
	// 定义私有方法
	var privateFun = function(){

	}
	// 定义公共方法
	var PageSwitch = (function(){
		function PageSwitch(element, options){
			this.settins = $.extend(true,$.fn.PageSwitch.default,options||{});
			this.element = element;
			this.inti();
		}
		PageSwitch.prototype = {
			// 说明：初始化插件
			// 实现：初始化dom结构，布局，分页及绑定事件
			init: function(){

			},
			// 说明：获取滚动页面数量
			pagesCount:function(){},
			// 说明：获取滚动的宽度(横屏滚动)或高度(竖屏滚动)
			switchLength: function(){},
			// 说明：主要针对横屏情况进行页面布局
			_initLayout: function(){},
			// 说明：实现分页的dom结构及css样式
			_initPaging:function(){},
			// 说明：初始化插件事件
			_initEvent: function(){}
		};
		return PageSwitch;
	})();
	$.fn.PageSwitch = function(opt){
		return this.each(function(){
			var self - $(this),
				instance = self.data('PageSwitch');
			if (!instance) {
				instance = new PageSwitch(self,opt);
				self.data('PageSwitch',instance)
			}
			if ($.type(options) === 'String') return instance[opt]();
		})
	}
	// 定义默认配置参数
	$.fn.PageSwitch.default = {
		selectors:{
			sections:'.sections',
			section:'.section',
			page:'.pages',
			active:'.active'
		},
		index: 0,// 索引值
		easing: 'ease',// 动画效果
		duration: 500, // 动画过渡时间
		loop: false, // 页面是否可以循环播放
		pagination: true, // 是否进行分页处理
		keyboard:true, // 是否触发键盘事件
		direction: 'vertical',// 滑动方向（横屏，竖屏）
		callback: ''
	}
	$(function(){
		$('[data-PageSwitch]').PageSwitch();
	})
})(jQuery);