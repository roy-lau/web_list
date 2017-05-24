## 图片预加载API

	$.preload(imgs,{ 	// imgs:数组
			// 设置加载方式为有序加载，默认为无序加载！
			order: 'ordered',
			each: function(count){
				// 每加载一张执行的事件
			},
			all: function(){
				// 图片加载完后执行的事件
			}
		})

### demo

	无序加载：https://roy-lau.github.io/web_list/preload/unordereds-by-img
	无序加载：https://roy-lau.github.io/web_list/preload/unordereds-by-icon
	有序加载：https://roy-lau.github.io/web_list/preload/orders

