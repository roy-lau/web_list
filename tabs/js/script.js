;(function($) {
    "use scrict"
    var Tab = function(tab) {
        var self = this;
        // 保存单个tab组件
        this.tab = tab;

        // 默认配置参数
        this.config = {
                "triggerType": "mouseover", // 触发方式
                "effect": "default", // 切换样式
                "invoke": 1, // 默认显示第几个
                "auto": false // 切换过渡(false：不自动切换，number自动切换时间)
            }
            // 如果配置参数存在，就将默认的配置参数扩展掉（或者叫替换）
        if (this.getconfig()) {
            $.extend(this.config, this.getconfig()) // this.getconfig()替换掉this.config，
        }

        // 保存tabs标签列表&&报存对应的内容列表
        this.tabItems = this.tab.find("ul.tab-nav li");
        this.contentItems = this.tab.find("div.content-wrap div.content-item"); // 坑-- 标签名，属性一定要正确

        // 保存config配置参数
        var config = this.config;

        //---------- 判断切换事件
        if (config.triggerType === "click") {
            this.tabItems.bind(config.triggerType, function() {
                self.invoke($(this));
            })
        } else if (config.triggerType === "mouseover") {
            this.tabItems.bind(config.triggerType, function() {
                self.invoke($(this));
            })
        } else if (config.triggerType === "mouseover" || config.triggerType !== "click") { // 规避传如入事件参数错误
            this.tabItems.bind("mouseover", function() {
                self.invoke($(this));
            })
        }


        //---------- 自动切换功能
        if (config.auto) {
        	// 定义一个全局的定时器
        	this.timer = null;
        	// 计数器
        	this.loop = 0;
        	// 自动间隔时间切换的方法
        	this.autoPlay()
        	//  移动到tab上时，停止定时器。移出时启动定时器。
        	this.tab.hover(function(){
        		// 移入时触发的事件
        		window.clearInterval(self.timer)
        	},function(){
        		// 移出时触发的事件
        		self.autoPlay()
        	})
        }


        //-------- 设置默认显示第几个tab

        if (config.invoke >1 ) {
        	this.invoke(this.tabItems.eq(config.invoke -1))
        }
    }

    Tab.prototype = {
    	// 自动间隔时间切换的方法
    	autoPlay: function(){
    		var self = this,
    		tabItems = this.tabItems,	 // 临时保存tab列表
    		tabLength = tabItems.size(), // tab的总个数（长度）
    		config = this.config;		 // 配置参数

    		this.timer = window.setInterval(function(){
    			self.loop++;
    			if (self.loop >= tabLength ) {
    				self.loop = 0;
    			}
    			tabItems.eq(self.loop).trigger(config.triggerType);  // 触发配置参数上的事件;

    		},config.auto)
    	},
        // 事件驱动函数
        invoke: function(currentTab) { // currentTab当前的tab
            var self = this;
            /*
				1. 执行tab选中状态选中状态加上actived
				2. 切换对应的内容，根据配置参数effect是default还是fade
    		*/

            // 获取图片的下标
            var index = currentTab.index()
                // 给选中的li添加actived样式，同时 移除兄弟节点的actived样式
            currentTab.addClass("actived").siblings().removeClass("actived");

            var effect = this.config.effect;
            var contentItems = this.contentItems;

            //------  判断切换方式
            if (effect === "default") {
                contentItems.eq(index).addClass("current").siblings().removeClass("current")
            } else if (effect === "fade") {
                contentItems.eq(index).fadeIn().siblings().fadeOut()

            } else if (effect === "default" || effect !== "fade") {
                contentItems.eq(index).addClass("current").siblings().removeClass("current")
            }

            // *如果配置了auto，将loop的值设为index
            if(this.config.auto){
            	this.loop=index;
            }
        },

        // 获取HTML内的配置参数
        getconfig: function() {
            // 获取HTML内的data-config配置
            var config = this.tab.data("config");

            //-------- 判断HTMl内是否有配置参数
            if (config && config !== "") {
                // 如果HTML内有配置参数,将获取到的配置参数转化为json对象--$.parseJSON(config)高版本jq不需要转化
                return config
            } else {
                // 如果没有配置参数，则返回null 使用默认配置参数
                return null;
            }
        }
    };

    // 通过init方法触发tab插件
    // 初始化插件
    Tab.init = function(tabs){
    	var self = this;
    	tabs.each(function(){
    		new self($(this))
    	})
    }

    // jq初始化插件方法
    $.fn.extend({
    	tab:function(){

    		this.each(function(){
    			new Tab($(this))
    		})
    		return this
    	}
    })
    window.Tab = Tab;
})(jQuery)
