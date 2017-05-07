### 用到的技术，和引发的问题：

	1、 font: 400 9px/14px consolas; 	// 9px代表font-size，14px代表line-height
	2、	mouseenter：鼠标移入，mouseleave鼠标移除
	3、 bind事件绑定和unbind解绑
	4、 debounce去抖技术：在事件被频繁触发时，只执行一次处理，一般是最后一次！
	5、 通过定时器解决了子菜单抖动问题，但是，出现了新的问题--延迟
	6、 向量，差乘公式，三角函数
		向量的定义就是：终点的坐标减去起点的坐标
		向量的差乘公式：
			向量1的x坐标 乘以 向量2的y坐标 减去 向量2的x坐标 乘以 向量1的y坐标（v1.x * v2.y - v2.x * v1.y）

### bug:
	1. activeRow is null 100行报错，
	2. b is undefined 12行报错，
	