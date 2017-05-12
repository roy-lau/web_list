// 三角函数的差乘公式-----启发式编程思想-------推测用户行为

// sameSign: 判断符号是否相同
function sameSign(a, b){
	return (a ^ b) >= 0
}

// vector:向量
function vector(a, b){
	// 返回向量的x，y坐标
	return {
		x: b.x - a.x,
		y: b.y - a.y
	}
}
// vectorProduct: 向量的差乘公式
function vectorProduct(v1,v2){
	// v1.x: 向量1的x坐标 
	// v2.y: 向量2的y坐标 
	// v2.x: 向量2的x坐标
	// v1.y: 向量1的y坐标
	return v1.x * v2.y - v2.x * v1.y
}
// 差乘的判断方法
function isPointInTrangle(p, a, b, c){
	// 差乘坐标
	var pa = vector(p, a),
		pb = vector(p, b),
		pc = vector(p, c),

	// 差乘结果
		t1 = vectorProduct(pa, pb),
		t2 = vectorProduct(pb, pc),
		t3 = vectorProduct(pc, pa);

	// 通过异或运算，返回判断的结果
	return sameSign(t1, t2) && sameSign(t2, t3);
}
function needDelay(elem, leftCorner, currMousePos){
	// 获取二级菜单的上下边缘的坐标
	var offset = elem.offset();	
		// 二级菜单左上角的坐标
	var	topLeft = {
			x: offset.left,
			y: offset.top
		};
		// 二级菜单左下角的坐标
	var	bottomLeft = {
			x: offset.left,
			y: offset.top + elem.height()
		};
		// console.log(currMousePos, leftCorner, topLeft, bottomLeft)
	// 将位置信息传入isPointInTrangle中，判断出鼠标所在的位置是否在三角形内。
	return isPointInTrangle(currMousePos, leftCorner, topLeft, bottomLeft)

	// 如果在三角形内，说明用户想从一级菜单移动到二级菜单
	// 如果不在三角形内，说明用户想在一级菜单内移动
}
