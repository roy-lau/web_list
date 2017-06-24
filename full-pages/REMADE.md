
# full-pages(全屏滚动)

1、 如何使div实现全屏？
	- 全屏的元素及其父元素都要设置height:100%;
	- 将html、body标签设置height:100%;
	- (注：height:100%是随其父元素的高度变换而变换的)

2、jquery推荐的闭包方法：
	;(function($){
		// do something
	})(jQuery);

* 闭包的作用
	- 避免全局依赖
	- 避免第三方破坏
	- 兼容jQuery操作符‘$’和jQuery

3、 jQuery插件的的开发方式
* 类级别组件开发
	- 即给jQuery命名空间下添加新的全局函数，也称为静态方法
	
	jQuery.myPlaugin = function(){
		// do something
	}

例如：
$.Ajax、 $.extend();
	
* 对象级别组件开发
	- 即挂在jQuery原型下的方法，这样通过选择器获取的jQuery对象实例也能共享该方法，也称为动态方法。

			$.fn.myPlugin = function(){
				// do something
			}
	这里$.fn === $.prototype

	例如：addClass()、attr()等，需要创建实例来调用

4、jQuery强大的链式调用

	$("div").next().addClass()……
	$fn.myPlaugin = function(){
		return this.each(){function(){
				// do something
			}}
	}

* 代码说明
	- return this 返回当前对象，来维护插件的链式调用
	- each 循环实现每个元素的访问

### 单例模式
	$.fn.MyPlugin = function(){
		var me = $(this),
		instance = me.data("myPlugin")
		if(!instance){
			me.data("myPlugin",(instance new myPlugin()))
		}
	};
* 代码说明
	- 如果实例存在则不重复创建实例
	- 利用 data()来存放插件对象的实例

#### .on()方法

* 语法：on(events[,selector][,data],handler(eventObject))
* 描述：在选定的元素上绑定一个或多个事件处理函数
	- events: 一个或多个空格分隔的事件类型，例如 click keydown。
	- selector： 一个选择器字符串，用于过滤出被选中的元素中能触发事件的后代元素，如果为null，那么被选中的元素总是能触发事件。
	- data：事件触发时，要传递给处理函数的 event.data。
	- handler(eventObject) 事件触发时，执行的函数。
* 优点： 事件委托不仅可以给未创建的后代元素绑定事件，当需要监视很多元素的时候，委托事件的开销更小。

#### 绑定鼠标滚轮事件
* js事件有很多需要兼容的地方，鼠标滚轮事件也有额外的差异。包括`IE6`浏览器在内的都适用 `mouseWheel`, 而只有`火狐`浏览器使用`DOMMouseScroll`.
* $(document).on('mouseWheel DOMMouseScroll',handler);

#### 如何判断鼠标的滚轮滑动方向
* 其他浏览器通过 `wheeldalta` 属性来判断。但是火狐浏览器没有这个属性可以通过`detail`这个属性来判断。
* 开发中发现每次向下滚动时，`wheeldalta`都是`-120`。但是，detail却是`3, 火狐浏览器判断的数值正负与其他浏览器是相反的`