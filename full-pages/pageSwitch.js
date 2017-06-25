;
(function() {
    // 说明：获取浏览器前缀
    // 实现：判断某个元素的css样式中是否存在transition属性
    // 参数：dom元素
    // 返回值：boolean，有则返回浏览器样式前缀，否则返回false
    var _prefix = (function(element) {
        var aPrefix = ['webkit', 'Moz', 'o', 'ms'],
            props = '';
        for (var i in aPrefix) {
            props = aPrefix[i] + 'Transition';
            if (element.style[props] !== undefined) {
                return '-' + aPrefix[i].toLowerCase() + '-';
            }
        }
        return false;
    })(document.createElement(PageSwitch));
    // 定义公共方法
    var PageSwitch = (function() {
        function PageSwitch(element, options) {
            this.settings = $.extend(true, $.fn.PageSwitch.defaults, options || {});
            this.element = element;
            this.init();
        }
        PageSwitch.prototype = {
            // 说明：初始化插件
            // 实现：初始化dom结构，布局，分页及绑定事件
            init: function() {
                var self = this;
                self.selectors = self.settings.selectors;
                self.sections = self.element.find(self.selectors.sections);
                self.section = self.sections.find(self.selectors.section);

                self.direction = self.settings.direction == 'vertical' ? true : false;
                self.pagesCount = self.pagesCount();
                self.index = (self.settings.index >= 0 && self.settings.index < self.pagesCount) ?
                    self.settings.index : 0;

                self.canScroll = true;

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
            // 说明：向前滑动 即上一页
            prev: function() {
                var self = this;
                if (self.index > 0) {
                    self.index--;
                } else if (self.index < 0) {
                    self.index = self.pagesCount - 1;
                }
                self._scrollPage();
            },
            next: function() {
                var self = this;
                if (self.index < self.pagesCount) {
                    self.index++;
                } else if (self.settings.loop) {
                    self.index = 0;
                }
                self._scrollPage();
            },
            // 说明：向后滑动 即下一页
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
                    pageClass = self.selectors.page.substring(1);
                	self.activeClass = self.selectors.active.substring(1);
                    pageHtml = '<ul class=' + pageClass + '>';
                for (var i = 0; i < self.pagesCount; i++) {
                    pageHtml += '<li></li>';
                }
                pageHtml += '</ul>';
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
            _initEvent: function() {
                var　 self = this;
                self.element.on('click', self.selectors.pages + ' li', function() {
                    self.index = $(this).index();
                    self._scrollPage();
                });
                self.element.on('mousewheel DOMMouseScroll', function(e) {
                    if (self.canScroll) {
                        var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
                        if (delta > 0 && (self.index && !self.settings.loop || self.settings.loop)) {
                            self.prev();
                        } else if (delta < 0 && (self.index < (self.pagesCount - 1) && !self.settings.loop || self.settings.loop)) {
                            self.next();
                        }
                    }
                });

                if (self.settings.keyboard) {
                    $(window).on('keydown', function(e) {
                        var keyCode = e.keyCode;
                        if (keyCode == 37 || keyCode == 38) {
                            self.prev();
                        } else if (keyCode == 39 || keyCode == 40) {
                            self.next();
                        }
                    });
                }
                $(window).resize(function() {
                    var currentLength = self.switchLength();
                    offset = self.settings.direction ? self.section.eq(self.index).offset().top : self.section.eq(self.index).offset().left;
                    if (Math.abs(offset) > currentLength / 2 && self.index < self.pagesCount - 1) {
                        self.index++;
                    }
                    if (self.index) {
                        self._scrollPage()
                    }
                });

                self.sections.on('transitonend sebkitTransitionEnd oTransitionEnd otransitionend', function() {
                    self.canScroll = true;
                    if (self.settings.callback && $.type(self.settings.callback) == 'function') {
                        self.settings.callback();
                    }
                })
            },
            // 说明：滑动动画
            _scrollPage: function() {
                var self = this,
                    dest = self.section.eq(self.index).position();
                if (!dest) return;
                self.canScroll = false;
                if (_prefix) {
                    self.sections.css(_prefix + 'transition', 'all ' + self.settings.duration + 'ms ' + self.settings.easing);
                    var translate = self.direction ? 'translateY(-' + dest.top + 'px)' : 'translateX(-' + dest.left + 'px)';
                    self.sections.css(_prefix + 'transform', translate);
                } else {
                    var animateCss = self.direction ? { top: -dest.top } : { left: -dest.left };
                    self.sections.animate(animateCss, self.settings.duration, function() {
                        self.canScroll = true;
                        if (self.settings.callback && $.type(self.settings.callback) == 'function') {
                            self.settings.callback();
                        }
                    });
                }
                if (self.settings.pagination) {
                    self.pageItem.eq(self.index).addClass(self.activeClass).siblings('li').removeClass(self.activeClass);
                }
            }
        };
        return PageSwitch;
    })();
    $.fn.PageSwitch = function(opt) {
        return this.each(function() {
            var self = $(this),
                instance = self.data('PageSwitch');
            if (!instance) {
                instance = new PageSwitch(self, opt);
                self.data('PageSwitch', instance)
            }
            if ($.type(opt) === 'String') return instance[opt]();
        })
    }
        // 定义默认配置参数
    $.fn.PageSwitch.defaults = {
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
        pagination: true, // 是否展示分页
        keyboard: true, // 是否触发键盘事件
        direction: 'vertical', // 滑动方向（横屏，竖屏）
        callback: ''
    }
    $(function() {
        $('[data-PageSwitch]').PageSwitch();
    })
})(jQuery);
