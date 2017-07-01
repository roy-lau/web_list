$(window).on('load', function () {
	waterfall()
})

function waterfall(){
	// 获取main下的所有div
	var $boxs = $('#main>div'),
	// 获取main下的第一个div的宽
		w = $boxs.eq(0).outerWidth(),
	// 获取一行图片的个数
		cols = Math.floor($(window).width()/w);
	// 设置main的宽度(一个图片的宽度 乘以 一行图片的个数)，并让main居中
	$('#main').width(w*cols).css('margin','0 auto');
	var hArr = [];
	// 遍历所有图片
	$boxs.each(function(index,value){
		// 获取所有遍历的图片的高度
		var h = $boxs.eq(index).outerHeight();
		if (index<cols) {
			hArr[index] = h;
		}else{
			var minH = Math.min.apply(null,hArr),
				minHIndex = $.inArray(minH,hArr);
			$(value).css({
				'position':'absolute',
				'top': minH+'px',
				'left':minHIndex*w+'px'
			})
			hArr[minHIndex]+=$boxs.eq(index).outerHeight();
		}
	})

}