## angularjs-仿拉钩

### 安装运行

```bash
	1. git clone git@github.com:roy-lau/web_list.git
	2. cd web_list/angularjs-lagou-build/
	3. npm i gulp -g &&npm install
	4. gulp
```

### angularjs概念

<img src="other/angularjs概念.png" alt="angularjs概念">

### 指令(directive)
 
>定义： 通过html标签，属性样式或注释使Angularjs编译器来为指定是DOM元素绑定特定的行为，甚至是改变DOM元素和它的子元素。  
>内置指令：ng-model、ng-bind、ng-click、ng-class、ng-if、ng-hide、ng-show、ng-repeat……  
>自定义指令常用的属性： 

- restrict： 调用方式 ( A:属性，E:元素，M:样式。C:注释)
- replace：替换（false：插入父元素内，true：替换父元素）
- scope：接口  
	`@`:代表可以直接接收字符串@abc  
	`=`: 可以接收变量 如$scope.list的list  
	`&`：事件 如ng-click  
- templateUrl：模板路径(html文件路径)
- template：模板 (html片段 和transclude配合使用、ng-transclude插入外部元素)
- transclude：内嵌html（true，false）
- link：行为（function）

###  控制器(controller)和作用域($scope)

* 控制器：视图对应的业务逻辑，为数据模型添加行为和属性
* $scope
	- 常用属性:  $id、$parent、$root
	- 常用函数:  $watch、$on、$broadcast、$emit、$digest

### 服务(service)

> 服务(service) ：通过this向外暴露参数   
> 服务工厂(factory) ：通过return向外暴露参数

* 特点：单例，懒加载，公用函数
* 常用的服务：
	- $http： 发出ajax
	- $q： 处理并发的请求`Promise`
	- $timeout： 延迟ms执行
	- $interval： 循环ms执行
	- $rootScope： 根作用域
	
* [自定义服务——cache](script/services/cache.js)

### 过滤器(filter)

> 用来`格式化`或者`过滤`数据

* 内置过滤器: currency,nubmer,date,lowercase,uppercase,limitTo,orderBy
* 自定义过滤器

### 动画(animate)

/*要离开的ngView元素动画开始时的样式*/
.page.ng-leave 
/*要离开的ngView元素动画结束时的样式*/
.page.ng-leave.ng-leave-active 
/*要进入的ngView元素动画开始时的样式*/
.page.ng-enter 
/*要进入的ngView元素动画结束时的样式*/
.page.ng-enter.ng-enter-active 

进一步学习：
	官网：开发者指南，API文档
	书籍：《angularjs权威指南》
	社区：angularjs中文社区