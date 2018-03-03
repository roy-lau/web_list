
# star-rating(星级评分)

## js-method

[__星评插件的使用方法(整颗星)__](js-method/index-1.html)

1、 JavaScript

```JavaScript
	rating.init('#rating', 2)
```

2、 jQuery

```JavaScript
	$('#rating').rating(4)
```


### [什么是设计模式（定义）？](https://www.imooc.com/video/14965)

> 当封装一个函数是，你是在复用代码；而当你使用一个设计模式时，你是在复用他人的经验。

[GoF](https://baike.baidu.com/item/GoF/6406151?fr=aladdin)定义: 设计模式是在面向对象软件设计过程中针对特定问题的简洁而优雅的解决方案

百度百科定义： 设计模式是一套被反复使用、多数人知晓的、经过分类编目的、代码设计经验的总结

#### 设计模式————三大类

1、 创建型模式

  单例模式、抽象工厂模式、创造着模式、工厂模式、原型模式

2、 结构型模式

  适配器模式、桥接模式、装饰器模式、组合模式、外观模式、享元模式、代理模式

3、 行为型模式

  模板方法模式、命令模式、迭代器模式、观察者模式、中介者模式、备忘录模式、解释器模式、状态模式、策略模式、职责模式、访问模式


[__星评插件的使用方法(半颗星)__](js-method/index-semi-star.html)

1、 JavaScript

```JavaScript
rating.init('#rating', {
    mode: 'LightEntire',
    num: 2,
    select: function(num, total) {
        console.log(this, num + '/' + total)
    },
    chosen: function(num, total) {
        console.log(this, num + '/' + total)
    },
})
```

2、 jQuery

```JavaScript
rating.init('#rating2', { mode: 'LightHalf', num: 2.5 })
$('#rating').on('select', function(e, num, total) {
    console.log(num + '/' + total)
}).on('chosen', function(e, num, total) {
    console.log(num + '/' + total)
    rating.init('#rating2','unbindEvent')  // 解绑所有事件
})
```

[__星评插件的使用方法(半颗星，小图片)__](js-method/index-img.html)


1、 JavaScript

```JavaScript
rating.init('#rating', {
    mode: 'LightEntire',
    num: 2,
    select: function(num, total) {
        console.log(this, num + '/' + total)
    },
    chosen: function(num, total) {
        console.log(this, num + '/' + total)
    },
})
```

2、 jQuery

```JavaScript
rating.init('#rating2', { mode: 'LightHalf', num: 2.5 })
$('#rating').on('select', function(e, num, total) {
    console.log(num + '/' + total)
}).on('chosen', function(e, num, total) {
    console.log(num + '/' + total)
    rating.init('#rating2','unbindEvent')  // 解绑所有事件
})
```

## css-method