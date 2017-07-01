window.onload= function () {
	waterfall('main','box');
}
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