$(document).ready(function () {
	var sub = $('#sub'),
		activeRow,		// 一级菜单（左侧列表）
		activeMenu,		// 二级菜单（子菜单）
		timer,
		mouseInSub = false,		// 判断鼠标是否在子菜单内，默认不在子菜单内
		mouseTrack = [];

	/*
		1. 鼠标在子菜单内mouseInSub为true
		2. 鼠标不在子菜单内mouseInSub为false
	*/
	sub.on('mouseenter', function(e){
		mouseInSub = true;
	}).on('mouseleave', function(e){
		mouseInSub = false;
	})

	var moveHandler = function(e){
		// 将坐标放到mouseTrack数组内

		mouseTrack.push({		// 鼠标对于页面的x，y坐标
			x: e.pageX,
			y: e.pageY
		})
		// 数组内只保存3个坐标
		if (mouseTrack.length > 3) {
			mouseTrack.shift();
		}
	};

	$('#leftList')
		.on('mouseenter', function(e){
			// 鼠标移入左侧列表时，将子菜单的none属性移除
			sub.removeClass('none');
			// 鼠标移入左侧列表时，绑定moveHandler函数
			$(document).bind('mousemove', moveHandler)
		})
		.on('mouseleave', function(e){
			// 鼠标移出左侧列表时，给子菜单添加none属性
			sub.addClass('none')
			// 如果鼠标移出一级菜单，将active属性移除 并置为空
			if(activeRow){
				activeRow.removeClass('active');
				activeRow = null;
			}
			// 鼠标移出一级菜单后，给子菜单添加none属性(隐藏子菜单)，并置为空
			if(activeMenu){
				activeMenu.addClass('none');
				activeMenu = null;
			}
			// 鼠标移出一级菜单后，解绑moveHandler函数
			$(document).unbind('mousemove', moveHandler)
		})
		// 鼠标移入左侧的li时，触发的事件
		.on('mouseenter', 'li', function(e){ 	// 事件代理，将mouseenter代理给li
			sub.removeClass('none');
			/*
			1. 如果鼠标移入左侧的li时，右侧的子菜单没有显示的情况下
			2. 将li赋值给activeRow
			3. 给li添加属性active（背景）
			4. activeRow.data('id')获取了li的data-id的值，赋给activeMenu
				注：此时activeMenu相当于每个右侧的子菜单，（因为左侧菜单的data-id，和右侧子菜单的id相同）
			5. 移除子菜单的none属性，（显示）
			*/
			if (!activeRow) {
				activeRow = $(e.target)
				activeRow.addClass('active');

				activeMenu = $('#' + activeRow.data('id'));
				activeMenu.removeClass('none');
				return;
			}

			// 如果timer触发了 但是 没有执行 就清除这个计时器
			if (timer) {
				clearTimeout(timer)
			}



			// currMousePos: 鼠标当前点的坐标
			var	currMousePos = mouseTrack[mouseTrack.length - 1],
			// leftCurner: 鼠标上一次的坐标
				leftCurner  = mouseTrack[mouseTrack.length - 2],

				delay = needDelay(sub, leftCurner, currMousePos);

				// 1. 判断鼠标如果在三角形内，则延迟切换。
				// 2. 如果不在三件形内，则直接进行子菜单切换
				if (delay) {
					// 延迟300毫秒执行
					timer = setTimeout(function(){
						
						// 如果鼠标在子菜单内就立即返回
						if (mouseInSub) {
							return; 
						}
						// 1、默认情况下，先将所有li的active移除
						// 2、默认情况下，子菜单全部加上none属性	
						activeRow.removeClass('active');
						activeMenu.addClass('none');

						/*	1、当鼠标放在li上时，
							2、 将li赋值给activeRow
							3、 给li添加属性active（背景）
							4、 activeRow.data('id')获取了li的data-id的值，赋给activeMenu
								注：此时activeMenu相当于每个右侧的子菜单，（因为左侧菜单的data-id，和右侧子菜单的id相同）
							5、 移除子菜单的none属性，（显示）
							6、最后，将定时器置为空
						*/
						activeRow = $(e.target);
						activeRow.addClass('active');
						activeMenu = $('#' + activeRow.data('id'));
						activeMenu.removeClass('none');

						timer = null;
					},300)
				} else {
					var prevActiveRow = activeRow,
						prevActiveMenu = activeMenu;

					// 通过一级菜单的data-id取得 二级菜单的id
					activeRow = $(e.target);
					activeMenu = $('#' + activeRow.data('id'));
					// 1. 移除一级菜单样式active
					// 2. 隐藏二级菜单 none
					prevActiveRow.removeClass('active');
					prevActiveMenu.addClass('none');
					// 1. 鼠标移入，给一级菜单添加样式active
					// 2. 显示二级菜单
					activeRow.addClass('active');
					activeMenu.removeClass('none');
				}
		})
})