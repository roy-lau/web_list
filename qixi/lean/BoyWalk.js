/**************************
		小孩走路
**************************/
function BoyWalk() {
	var container = $("#content");
	//页面可视区域
	var visualwidth = container.width();
	var visualheight = container.height();

	//获取数据
	var getvalue = function(classname){
		var $elem = $('' + classname + '');
		//走路的路线坐标
		return {
			height : $elem.height(),
			top : $elem.position().top
		};
	};
	//路的y轴
	var pathy = function(){
		var data = getvalue('.a_background_middle');
		return data.top + data.height / 2;
	}();

	var $boy = $("#boy");
	var boywidth = $boy.width();
	var boyheight = $boy.height();

	//修正小男孩的正确位置
	$boy.css({
		top : pathy - boyheight + 25
	});

	//暂停走路
	function pasuewalk(){
		$boy.addClass('pasuewalk');
	}

	//修复走路
	function restorewalk() {
		$boy.removeClass('pasuewalk');
	}

	//css3动画变化
	function slowWalk() {
		$boy.addClass('slowWalk');
	}

	//用tranition做运动
	function stratrun(options, runtime) {
		var dfdplay = $.Deferred();
		//恢复走路
		restorewalk();
		//运动的属性
		$boy.transition(
			options,
			runtime,
			'linear',
			function () {
				dfdplay.resolve();//动画完成
			});
		return dfdplay;
	}

	//开始动画
	function walkrun(time, dist, disy) {
		time = time || 3000;
		//脚动作
		slowWalk();
		//开始走路
		var d1 = stratrun({
			'left' : dist + 'px',
			'top' : disy ? disy : undefined
		},time);
		return d1;
	}
	
	//计算移动距离
	function calculatedist(direction, proportion) {
		return (direction == "x" ? visualwidth : visualheight) * proportion;
	}
	return {
		//开始走路
		walkTo : function(time, proportionx, proportiony) {
		 	var distx = calculatedist('x', proportionx)
		 	var disty = calculatedist('y', proportiony)
		 	return walkrun(time, distx, disty);
		},
		//停止走路
		stopwalk : function(){
			pasuewalk();
		},
		setColor : function(value){
			$boy.css('background-color',value)
		}
	}
}