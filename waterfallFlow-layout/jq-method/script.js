$(window).on('load', function() {
    waterfall();
	var dataInt = {"data":[{"src":"../images/pic_1.png"},{"src":"../images/pic_2.png"},{"src":"../images/pic_3.png"},{"src":"../images/pic_4.png"},{"src":"../images/pic_5.png"},{"src":"../images/pic_6.png"},{"src":"../images/pic_7.png"},{"src":"../images/pic_8.png"},{"src":"../images/pic_9.png"},{"src":"../images/pic_10.png"},{"src":"../images/pic_11.png"},{"src":"../images/pic_12.png"},{"src":"../images/pic_13.png"},{"src":"../images/pic_14.png"},{"src":"../images/pic_15.png"},{"src":"../images/pic_16.png"},{"src":"../images/pic_17.png"},{"src":"../images/pic_18.png"},{"src":"../images/pic_19.png"},{"src":"../images/pic_20.png"},{"src":"../images/pic_21.png"},{"src":"../images/pic_22.png"},{"src":"../images/pic_23.png"},{"src":"../images/pic_24.png"},{"src":"../images/pic_25.png"},{"src":"../images/pic_26.png"},{"src":"../images/pic_27.png"},{"src":"../images/pic_28.png"}]}
    $(window).on('scroll',function(){
    	if (checkScrollSlide()) {
    		$.each(dataInt.data,function(key,value){
    			var oBox = $('<div>').addClass('box').appendTo($('#main')),
    				oPic = $('<div>').addClass('pic').appendTo($(oBox));
    			$('<img>').attr('src',value.src).appendTo($(oPic))
    		})
    		waterfall();
    	}
    })
})

function waterfall() {
    // 获取main下的所有div
    var $boxs = $('#main>div'),
        // 获取main下的第一个div的宽
        w = $boxs.eq(0).outerWidth(),
        // 获取一行图片的个数
        cols = Math.floor($(window).width() / w);
    // 设置main的宽度(一个图片的宽度 乘以 一行图片的个数)，并让main居中
    $('#main').width(w * cols).css('margin', '0 auto');
    var hArr = [];
    // 遍历所有图片
    $boxs.each(function(index, value) {
        // 获取所有遍历的图片的高度
        var h = $boxs.eq(index).outerHeight();
        if (index < cols) {
            hArr[index] = h;
        } else {
            var minH = Math.min.apply(null, hArr),
                minHIndex = $.inArray(minH, hArr);
            $(value).css({
                'position': 'absolute',
                'top': minH + 'px',
                'left': minHIndex * w + 'px'
            })
            hArr[minHIndex] += $boxs.eq(index).outerHeight();
        }
    })
}
// 判断是否需要加载图片
function checkScrollSlide(){
	var $lastBox = $('#main>div').last(),
		lastBoxDis = $lastBox.offset().top + Math.floor($lastBox.outerHeight()/2),
		scrollTop = $(window).scrollTop(),
		documentH = $(window).height();
	return (lastBoxDis<scrollTop+documentH)?true:false;
}
