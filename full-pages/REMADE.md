
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
