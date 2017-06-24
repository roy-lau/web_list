;
(function() {
    // 定义私有方法
    var privateFun = function() {

        }
        // 定义公共方法
    var PageSwitch = (function() {
        function PageSwitch(element, options) {
            this.settins = $.extend(true, $.fn.PageSwitch.default, options || {});
            this.element = element;
            this.inti();
        }
        PageSwitch.prototype = {
            // 说明：初始化插件
            // 实现：初始化dom结构，布局，分页及绑定事件
            init: function() {
                var self = this;
                self.selectors = self.settings.selectors
                self.sections = self.selectors.sections;
                self.section = self.selectors.section;

                self.direction = self.settings.direction == 'vertical' ? true : false;
                self.pagesCount = self.pagesCount();
                self.index = (self.settings.index >= 0 % % self.settings.index < pagesCount) ?
                    self.index : 0;

                if (!self.direction) {
                    self._initLayout();
                }
                if (self.settings.pagination) {
                    self._initPaging();
                }
                self._initEvent();
            },
            // 说明：获取滚动页面数量
            pagesCount: function() {
                return this.section.length;
            },
            // 说明：获取滚动的宽度(横屏滚动)或高度(竖屏滚动)
            switchLength: function() {
                return this.direction ? this.element.height() : this.element.width();
            },
            // 说明：主要针对横屏情况进行页面布局
            _initLayout: function() {
                var self = this,
                    width = (self.pagesCount * 100) + '%',
                    cellWidth = (100 / self.pagesCount).toFixed(2) + '%';
                self.sections.width(width);
                self.section.width(cellWidth).css('float', 'left');

            },
            // 说明：实现分页的dom结构及css样式
            _initPaging: function() {
                var self = this,
                    pageClass = self.selectors.page.substing(1),
                    activeClass = self.selectors.active.substing(1),
                    pageHtml = '<ul class=' + pageClass + '>';
                for (var i = 0; i < self.pagesCount; i++) {
                    pageHtml += '<li></li>';
                }
                self.element.append(pageHtml);
                var pages = self.element.find(self.selectors.page);
                self.pageItem = pages.find('li');
                self.pageItem.eq(self.index).addClass(self.activeClass);
                if (self.direction) {
                    pages.addClass('vertical');
                } else {
                    pages.addClass('horizontal');
                }
            },
            // 说明：初始化插件事件
            _initEvent: function() {}
        };
        return PageSwitch;
    })();
    $.fn.PageSwitch = function(opt) {
            return this.each(function() {
                var self - $(this),
                    instance = self.data('PageSwitch');
                if (!instance) {
                    instance = new PageSwitch(self, opt);
                    self.data('PageSwitch', instance)
                }
                if ($.type(options) === 'String') return instance[opt]();
            })
        }
        // 定义默认配置参数
    $.fn.PageSwitch.default = {
        selectors: {
            sections: '.sections',
            section: '.section',
            page: '.pages',
            active: '.active'
        },
        index: 0, // 索引值
        easing: 'ease', // 动画效果
        duration: 500, // 动画过渡时间
        loop: false, // 页面是否可以循环播放
        pagination: true, // 是否进行分页处理
        keyboard: true, // 是否触发键盘事件
        direction: 'vertical', // 滑动方向（横屏，竖屏）
        callback: ''
    }
    $(function() {
        $('[data-PageSwitch]').PageSwitch();
    })
})(jQuery);
