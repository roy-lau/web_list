window.onload= function () {
	waterfall('main','box');
	// 加入dataInt是后台传来的数据
	var dataInt = {"data":[{"src":"../imgs/pic_1.png"},{"src":"../imgs/pic_2.png"},{"src":"../imgs/pic_3.png"},{"src":"../imgs/pic_4.png"},{"src":"../imgs/pic_5.png"},{"src":"../imgs/pic_6.png"},{"src":"../imgs/pic_7.png"},{"src":"../imgs/pic_8.png"},{"src":"../imgs/pic_9.png"},{"src":"../imgs/pic_10.png"},{"src":"../imgs/pic_11.png"},{"src":"../imgs/pic_12.png"},{"src":"../imgs/pic_13.png"},{"src":"../imgs/pic_14.png"},{"src":"../imgs/pic_15.png"},{"src":"../imgs/pic_16.png"},{"src":"../imgs/pic_17.png"},{"src":"../imgs/pic_18.png"},{"src":"../imgs/pic_19.png"},{"src":"../imgs/pic_20.png"},{"src":"../imgs/pic_21.png"},{"src":"../imgs/pic_22.png"},{"src":"../imgs/pic_23.png"},{"src":"../imgs/pic_24.png"},{"src":"../imgs/pic_25.png"},{"src":"../imgs/pic_26.png"},{"src":"../imgs/pic_27.png"},{"src":"../imgs/pic_28.png"}]}
	window.onscroll = function(){ // 拖动滚动条时执行
		if (chechScrollSlie()) { // 判断是否满足加载图片的条件
			var oParent = document.getElementById('main');
			// 将数据块渲染到页面的尾部
			for (var i = 0; i < dataInt.data.length; i++) {
				// 创建一个div
				var oBox = document.createElement('div');
				// 给div设置className为box
				oBox.className = 'box';
				// 将classNmae为box的元素插入到#main中
				oParent.appendChild(oBox)
				// 创建一个div
				var oPic = document.createElement('div');
				// 给div设置className为pic
				oPic.className = 'pic';
				// 将classNmae为 pic 的元素插入到className为box中
				oBox.appendChild(oPic);
				// 创建一个img标签
				var oImg = document.createElement('img');
				// 设置img标签的src属性
				oImg.src = dataInt.data[i].src;
				// 将img标签插入到oPic元素中
				oPic.appendChild(oImg)
			}
			waterfall('main','box'); // 每次满足加载图片条件后，重新调用一次流式布局
		}
	}
}
// 使用js设置流式布局
function waterfall(parent,box){
	// 将main下的所有class为box的元素取出来
	var oParent = document.getElementById(parent),
		oBoxs = getByClass(oParent,box),
	// 计算整个页面显示的行数（页面的宽/box的宽）
		oBoxW = oBoxs[0].offsetWidth,
		cols = Math.floor(document.documentElement.clientWidth/oBoxW);
	// 设置main的宽
	oParent.style.cssText = 'width:'+oBoxW*cols+'px;margin:0 auto;';
	// 存放每一列高度的数组
	var hArr= [];
	for (var i = 0;i<oBoxs.length; i++) {
		if (i<cols) {
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			var minH = Math.min.apply(null,hArr); // 获取一行中高度最小的图片
			var index = getMinHIndex(hArr,minH);
			oBoxs[i].style.position = 'absolute';
			oBoxs[i].style.top = minH+'px';
			oBoxs[i].style.left= oBoxW*index+'px';
			// oBoxs[i].style.left = oBoxs[index].offsetLeft+'px'  //这是另一种写法
		}	hArr[index]+=oBoxs[i].offsetHeight;
	}
}

// 根据class获取元素
function getByClass(parent,clsName){
	var boxArr = new Array(), // 用来存储获取到的所有class为box的元素
		oElements = parent.getElementsByTagName('*');
	for (var i = 0; i < oElements.length; i++) {
		if (oElements[i].className == clsName){
			boxArr.push(oElements[i]);
		}
	}
	return boxArr
}
// 获取一行中最小的图片的下标
function getMinHIndex( arr , val){
	for (var i in arr){
		if (arr[i] == val) {
			return i
		}
	}
}
// 检测是否具备了滚动条加载数据块的条件
function chechScrollSlie(){
	var oParent = document.getElementById('main'),
		oBoxs = getByClass(oParent,'box'),
		// 获取页面中最后一个盒子高度的一半 距离document顶部的高度;
		lastBoxH = oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2),
		// 获取页面滚走的距离
		scrollTop = document.body.scrollTop||document.documentElement.scrollTop,
		// 获取页面窗口的高度
		windowHeight = document.body.clientHeight||document.documentElement.clientHeight
		// 条件：当最后一个最高的图片的一半距离顶部 小于 页面滚走的距离 加上当前窗口的高度返回true 否则返回 false
		return (lastBoxH<scrollTop+windowHeight?true:false)
}