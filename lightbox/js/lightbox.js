;(function($) {

    var lightBox = function() {
        var self = this;

        // 创建遮罩
        this.popupMask = $('<div id="G-lightbox-mask">')
        // 创建弹出框
        this.popupWin = $('<div id="G-lightbox-popup">')

        // 保存body
        this.bodyNode = $(document.body);

        // 渲染剩余的DOM，并且插入到body里
		this.renderDOM();
		this.picViewArea    = this.popupWin.find("div.lightbox-pic-view"); // 获取图片的预览区域
		this.popupPic       = this.popupWin.find("img.lightbox-image"); // 获取图片
		this.picCaptionArea = this.popupWin.find("div.lightbox-pic-caption"); // 获取图片描述区域
		this.nextBtn        = this.popupWin.find("span.lightbox-next-btn"); // 向右按钮
		this.prevBtn        = this.popupWin.find("span.lightbox-prev-btn"); // 向左按钮
		this.captionText    = this.popupWin.find("p.lightbox-pic-desc"); // 图片描述文字
		this.currentIndex   = this.popupWin.find("span.lightbox-of-index"); // 图片当前索引
		this.closeBtn       = this.popupWin.find("span.lightbox-close-btn"); // 关闭按钮
        //--- 准备开始事件委托，获取组的数据

        this.groupName = null;
        this.groupData = []; // 放置同一组数据
        this.bodyNode.delegate('.js-lightbox,[data-role=lightbox]', 'click', function(e) {
            // 阻止事件冒泡
            e.stopPropagation();

            // 获取当前组名
            var currentGroupName = $(this).attr('data-group');
            // 判断第一次点击和下一次点击是否是同一组的
            if (currentGroupName != self.groupName) {
                // 当两次点击的是同一组的就不进行数据获取，使用上一次的数据
                self.groupName = currentGroupName;
                // 根据当前组名获取同一组数据
                self.getGroup();
            };
            // 初始化弹框
            self.initPopup($(this));
        });
        // 关闭按钮
        this.popupMask.click(function() {
            $(this).fadeOut();
            self.popupWin.fadeOut();
            this.clear = false;
        });
        this.closeBtn.click(function() {
            self.popupMask.fadeOut();
            self.popupWin.fadeOut();
            this.clear = false;
        });
        // 优化，更完善
        this.flag = true;
        // 绑定左右切换按钮事件
        this.nextBtn.hover(function() {
            if ($(this).hasClass("disabled") && self.groupData > 1) {
                $(this).addClass("lightbox-next-btn-show");
            };
        }, function() {
            if ($(this).hasClass("disabled") && self.groupData > 1) {
                $(this).removeClass("lightbox-next-btn-show");
            };
        }).click(function(e) {
            if (!$(this).hasClass("disabled") && self.flag) {
                self.flag = false;
                e.stopPropagation();
                self.goto("next")
            };
        });
        this.prevBtn.hover(function() {
            if ($(this).hasClass("disabled") && self.groupData > 1) {
                $(this).addClass("lightbox-prev-btn-show");
            };
        }, function() {
            if ($(this).hasClass("disabled") && self.groupData > 1) {
                $(this).removeClass("lightbox-prev-btn-show");
            };
        }).click(function(e) {
            if (!$(this).hasClass("disabled") && self.flag) {
                self.flag = false;
                e.stopPropagation();
                self.goto("prev")
            };
        });
        // 绑定窗口调整事件
        var timer = null
        this.clear = false
        $(window).resize(function(){
            console.log($(window).height())
            if(self.clear){
                window.clearTimeout(timer);
                timer = window.setTimeout(function(){
                self.loadPicSize(self.groupData[self.index].src);
                },500)
            }
        }).keyup(function(e){  // 使用上下左右按键也能切换图片
                console.log(e)
            if (self.clear) {
                var keyValue = e.which;
                if(keyValue == 38||keyValue == 37){
                    self.prevBtn.click();
                }else if(keyValue == 40|| keyValue ==39){
                    self.nextBtn.click();
                };
            }
        })

    };
    lightBox.prototype = {
    // 判断左右切换按钮事件
        goto: function(dir) {
            if (dir === "next") {
                this.index++;
                if (this.index >= this.groupData.length - 1) {
                    this.nextBtn.addClass("disabled").removeClass("lightbox-next-btn-show");
                };
                if (this.index != 0) {
                    this.prevBtn.removeClass("disabled");
                };
                var src = this.groupData[this.index].src;
                this.loadPicSize(src);
            } else if (dir === "prev") {
                this.index--;
                if (this.index <= 0) {
                    this.prevBtn.addClass("disabled").removeClass("lightbox-prev-btn-show");
                };
                if (this.index != this.groupData.length - 1) {
                    this.nextBtn.removeClass("disabled");
                };
                var src = this.groupData[this.index].src;
                this.loadPicSize(src);
            };
        },
        loadPicSize: function(sourceSrc) {
            var self = this;
            self.popupPic.css({ width: "auto", height: "auto" }).hide();
            this.picCaptionArea.hide();
            // 预加载图片，接收相应的原地址
            this.preloadImg(sourceSrc, function() {
                self.popupPic.attr("src", sourceSrc);
                var picWidth = self.popupPic.width(),
                    picHeight = self.popupPic.height();
            console.log(picWidth, picHeight)
                // 改变图片的宽高
                self.changePic(picWidth, picHeight);
            })
        },
    // 根据图片大小变换弹出窗口大小
        changePic: function(picWidth, picHeight) {
            var self = this,
                winWidth = $(window).width(), // 获取当前视口的宽度
                winHeight = $(window).height(); // 获取当前视口的高度
            // 如果图片的宽高大于浏览器视口的宽高比例。我们就判断是否溢出
            var scale = Math.min(winWidth / (width + 10), winHeight / (height + 10), 1),
            width = width * scale,
            height = height * scale;

            this.picViewArea.animate({
                width: width - 10,
                height: height - 10
            });
            this.popupWin.animate({
                width: width - 10,
                height: height - 10,
                marginLeft: -(width / 2),
                top: (winHeight - height) / 2
            }, function() {
                self.popupPic.css({
                    width: width - 10,
                    height: height - 10
                }).fadeIn();
                self.picCaptionArea.fadeIn();
                self.flag = true;
                self.clear = true;
            });
            // 设置描述文字和当前索引
            this.captionText.text(this.groupData[this.index].caption);
            this.currentIndex.text("当前索引：" + (this.index + 1) + "of" + this.groupData.length)
        },
    // 加载图片，在img标签内放置图片路径
        preloadImg: function(src, callback) {

            var img = new Image();
            if (!!window.ActivwXObject) {
                //- 兼容IE
                img.onreadystatechange = function() {
                    if (this.readyState == "complete") {
                        callback();
                    }
                }
            } else {
                //- 其他浏览器,直接执行callback
                img.onload = function() {
                    callback();
                }
            };
            img.src = src;
        },
        showMaskAndPopup: function(sourceSrc, currentId) {
            var self = this;

            this.popupPic.hide();       // 隐藏图片
            this.picCaptionArea.hide(); // 隐藏描述区域
            this.popupMask.fadeIn(); // 遮罩层淡出
            // 保存当前视口的宽高
            var winWidth = $(window).width(),
                winHeight = $(window).height();
            // 设置图片的预览区域的宽高
            this.picViewArea.css({
                width: winWidth / 2,
                height: winHeight / 2
            });
            // debugger;
            this.popupWin.fadeIn(); // 图片预览区域淡出

            var viewHeight = winHeight / 2 + 10; // 视图宽度

            // 设置图片的预览区域的位置
            this.popupWin.css({
                    width: winWidth / 2 + 10,
                    height: winHeight / 2 + 10,
                    marginLeft: -(winWidth / 2 + 10) / 2,
                    top: -viewHeight
                }).animate({
                    top: (winHeight - viewHeight) / 2
                }, function() {
                    // 加载图片
                    self.loadPicSize(sourceSrc);
                })
            // 根据当前点击的元素ID获取在当前组别里的索引
            this.index = this.getIndexOf(currentId);

            var groupDataLength = this.groupData.length;
            // 判断左右切换按钮
            if (groupDataLength > 1) {
                if (this.index === 0) {
                    this.prevBtn.addClass('disabled');
                    this.prevBtn.removeClass('disabled');
                } else if (this.index === groupDataLength - 1) {
                    this.prevBtn.addClass('disabled');
                    this.nextBtn.removeClass('disabled');
                } else {
                    this.prevBtn.removeClass('disabled');
                    this.nextBtn.removeClass('disabled');
                }
            }else {
                this.prevBtn.addClass("disabled");
                this.nextBtn.addClass("disabled");
            };
        },
    // 获取数组的下标(图片的位置)
        getIndexOf: function(currentId) {
            var index;
            $(this.groupData).each(function(i) {
                index = i;
                if (this.id === currentId) {
                    return false;
                }
            });
            return index;
        },
        initPopup: function(currentObj) {
            var self = this,
                sourceSrc = currentObj.attr("data-scource"), // 获取原图
                currentId = currentObj.attr("data-id") // 获取ID值
            this.showMaskAndPopup(sourceSrc,currentId);
        },
        getGroup: function() {
            var self = this;
            // 根据当前的组别名称获取页面中所有相同组名的对象
            var groupList = this.bodyNode.find("*[data-group=" + this.groupName + "]")
            // 清空数组数据
            self.groupData.length = 0;
            groupList.each(function() {
                self.groupData.push({
                    src: $(this).attr('data-scource'),
                    id: $(this).attr('data-id'),
                    caption: $(this).attr('data-caption')
                });
            })
        },
        // 渲染模板
        renderDOM: function() {
            var strDom =
                '<div class="lightbox-pic-view">' +
                '<span class="lightbox-btn lightbox-prev-btn">  </span>' +
                '<img class="lightbox-image" src="images/1-1.jpg">' +
                '<span class="lightbox-btn lightbox-next-btn">  </span>' +
                '</div>' +
                '<div class="lightbox-pic-caption">' +
                '<div class="lightbox-caption-area">' +
                '<p class="lightbox-pic-desc"> 图片标题 </p>' +
                '<span class="lightbox-of-index">当前索引：0 of 0</span>' +
                '</div>' +
                '<span class="lightbox-close-btn" title="关闭"> </span>' +
                '</div>';

            // alert('优雅的弹出框')

            // 插入到this.popupWin
            this.popupWin.html(strDom);
            // 插入遮罩层和弹出框到body中
            this.bodyNode.append(this.popupMask, this.popupWin);
        }
    };
    window['lightBox'] = lightBox;
})(jQuery);
