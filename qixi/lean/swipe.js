////////////////////////////////
/////////////页面动画///////////	
////////////////////////////////	
function Swipe(container){
	// var container = $("#content");
	// 获取第一个节点
	var element = container.find(":first");
	 //滑动对象
	 var swipe = {};

	// li页面数量
	// var slides = element.find("li");
	var slides = element.find('>');

	// 获取容器尺寸
	var width = container.width();
	var height = container.height();

	// 设置li页面总宽度
	element.css({
		width : (slides.length * width) + 'px',
		height : height + 'px'
	});

	// 设置第一个页面li的高度
	$.each(slides, function (index){
		var slide = slides.eq(index)//获取到每一个页面的li元素
		slide.css({
			width : width + 'px',
			height : height +'px'
		});
	});

	//监控完成与移动
	swipe.scrollTo = function(x, speed){
		//执行动画移动
		element.css({
			'transition-timing-function' : 'linear',
			'transition-duration' : speed + 'ms',
			'transform' : 'translate3d(-' + x + 'px, 0px, 0px)'//设置页面x轴移动
		});
		return this;
	};
	return swipe;
}