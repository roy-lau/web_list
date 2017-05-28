;(function($) {

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
        this.contentItems = this.tab.find("div.content-wrap div.content-item");  // 坑-- 标签名，属性一定要正确

        // 保存config配置参数
        var config = this.config;
        if(config.triggerType === "click"){

        	this.tabItems.bind(config.triggerType,function(){
        		alert(1)
        	})

        }else if(config.triggerType === "mouseover"){
        	
        	this.tabItems.bind(config.triggerType,function(){
        		alert(2)
        		
        	})

        }else if(config.triggerType === "mouseover" || config.triggerType !== "click"){  // 规避传如入事件参数错误

        	this.tabItems.bind("mouseover",function(){
        		alert(3)
        		
        	})

        }
    }

    Tab.prototype = {
        // 获取HTML内的配置参数
        getconfig: function() {
            // 获取HTML内的data-config配置
            var config = this.tab.data("config");

            // 判断HTMl内是否有配置参数
            if (config && config !== "") {
                // 如果HTML内有配置参数,将获取到的配置参数转化为json对象--$.parseJSON(config)高版本jq不需要转化
                return config
            } else {
                // 如果没有配置参数，则返回null 使用默认配置参数
                return null;
            }
        }
    };

    window.Tab = Tab;
})(jQuery)
