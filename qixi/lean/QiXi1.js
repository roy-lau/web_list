//动画结束事件
var animationend = (function () {
    var explorer = navigator.userAgent;
    if (~explorer.indexOf('webkit')) {
        return 'webkitanimationend';
    }
    return 'animationend';
})();
/////////////////////
//     灯动画
/////////////////////
var lamp = {
    elem: $('.b_backgroung'),
    bright: function () {
        this.elem.addClass('lamp_bright')
    },
    dark: function () {
        this.elem.removeClass('lamp_bright')
    }
};

var container = $("#content");
var swipe = Swipe(container);
visualwidth = container.width();
visualheight = container.height();

//页面滚动到指定位置
function scrollto(time, proportionx) {
    var distx = visualwidth * proportionx;
    swipe.scrollTo(distx, time);
}

//获取数据
var getvalue = function (classname) {
    var $elem = $('' + classname + '');
    //走路的路线坐标
    return {
        height: $elem.height(),
        top: $elem.position().top
    };
};
//桥的y轴
var bridgey = function () {
    var data = getvalue('.c_background_middle');
    return data.top;
}();
////////////
////小女孩//
////////////
var girl = {
    elem: $('.girl'),
    getheight: function () {
        return this.elem.height()
    },
    setoffset: function () {
        this.elem.css({
            left: visualwidth / 2,
            top: bridgey - this.getheight()
        });
    }
};
//修正小女孩的位置
girl.setoffset();
//
////用来临时调整页面
//swipe.scrollTo(visualwidth * 2, 0);

function dooraction(left, right, time) {
    var $door = $('.door');
    var doorleft = $('.door-left');
    var doorRight = $('.door-right');
    var defer = $.Deferred();
    var count = 2;
    //等待开门完成
    var complete = function () {
        if (count == 1) {
            defer.resolve();
            return;
        }
        count--;
    };

    doorleft.transition({
        'left': left
    }, time, complete);

    doorRight.transition({
        'left': right
    }, time, complete);
    return defer
}

//开门
function opendoor() {
    return dooraction('-50%', '100%', 2000);
}
//关门
function shutdoor() {
    return dooraction('0%', '50%', 2000);
}

// var instancex;
/**************************
 小孩走路
 **************************/
function BoyWalk() {

    var container = $("#content");
    //页面可视区域
    var visualwidth = container.width();
    var visualheight = container.height();

    //获取数据
    var getvalue = function (classname) {
        var $elem = $('' + classname + '');
        //走路的路线坐标
        return {
            height: $elem.height(),
            top: $elem.position().top
        };
    };
    //路的y轴
    var pathy = function () {
        var data = getvalue('.a_background_middle');
        return data.top + data.height / 2;
    }();

    var $boy = $("#boy");
    var boywidth = $boy.width();
    var boyheight = $boy.height();

    //修正小男孩的正确位置
    $boy.css({
        top: pathy - boyheight + 25
    });

    //暂停走路
    function pasuewalk() {
        $boy.addClass('pasuewalk');
    }

    //修复走路
    function restorewalk() {
        $boy.removeClass('pasuewalk');
    }

    //css3动画变化
    function slowWalk() {
        $boy.addClass('slowWalk');
    }

    //用tranition做运动
    function stratrun(options, runtime) {
        var dfdplay = $.Deferred();
        //恢复走路
        restorewalk();
        //运动的属性
        $boy.transition(
            options,
            runtime,
            'linear',
            function () {
                dfdplay.resolve();//动画完成
            });
        return dfdplay;
    }

    //开始走路动画
    function walkrun(time, dist, disy) {
        time = time || 3000;
        //脚动作
        slowWalk();
        //开始走路
        var d1 = stratrun({
            'left': dist + 'px',
            'top': disy ? disy : undefined
        }, time);
        return d1;
    }

    //走进商店
    function walktoshop(runtime) {
        var defer = $.Deferred();
        var doorobj = $('.door')
        //门的坐标
        var offsetdoor = doorobj.offset();
        var dooroffsetleft = offsetdoor.left;
        var dooroffsettop = offsetdoor.top
        //小男孩当前坐标
        var posboy = $boy.position();
        var boypoxleft = posboy.left;
        var boypoxtop = posboy.top;

        //中间位置
        var boymiddle = $boy.width() / 2;
        var doormiddle = doorobj.width() / 2;
        var doortopmiddle = doorobj.height() / 2;

        //当前需要移动的坐标
        instancex = (dooroffsetleft + doormiddle) - (boypoxleft + boymiddle);

        //y的坐标
        //top = 人物底部的top - 门中间的top值
        instancey = boypoxtop + boyheight - dooroffsettop + (doortopmiddle);
        //开始走路
        var walkplay = stratrun({
            transform: 'translateX(' + instancex + 'px),translateY(- ' + instancey + 'px),scale(0.5,0.5)',
            opacity: 0.1
        }, 2000);
        //走路完毕
        walkplay.done(function () {
            $boy.css({
                opacity: 0
            });
            defer.resolve();
        });
        return defer;
    }

    //走出商店
    function walkoutshop(runtime) {
        var defer = $.Deferred();
        restorewalk();
        //开始走路
        var walkplay = stratrun({
            transform: 'translateX(' + instancex + 'px),translateY(0),scale(1,1)',
            opacity: 1
        }, runtime);
        //走路完毕
        walkplay.done(function () {
            defer.resolve();
        });
        return defer;
    }


    ////取花
    //function talkflower() {
    //    //增加延时等待效果
    //    var defer = $.Deferred();
    //    setTimeout(function () {
    //        //取花
    //        $boy.addClass('slowflolerwalk');
    //        defer.resolve();
    //    }, 1000);
    //    return defer;
    //}

    //计算移动距离
    function calculatedist(direction, proportion) {
        return (direction == "x" ? visualwidth : visualheight) * proportion;
    }

    return {
        //开始走路
        walkTo: function (time, proportionx, proportiony) {
            var distx = calculatedist('x', proportionx)
            var disty = calculatedist('y', proportiony)
            return walkrun(time, distx, disty);
        },
        //走进商店
        toshop: function () {
            return walktoshop.apply(null, arguments);
        },
        outshop: function () {
            return walkoutshop.apply(null, arguments);
        },
        //停止走路
        stopwalk: function () {
            pasuewalk();
        },
        setColor: function (value) {
            $boy.css('background-color', value)
        },
        //获取男孩的宽度
        getwidth: function () {
            return $boy.width();
        },
        //恢复初始状态
        resetoriginal: function () {
            this.stopwalk();
            //恢复图片
            $boy.removeClass('slowWalk slowflolerwalk').addClass('boyoriginal');
        },
        //setflolerwalk: function () {
        //    $boy.addClass('slowflolerwalk');
        //},
        //转身动作
        rotate: function (callback) {
            restorewalk();
            $boy.addClass('boy-rotate');
            //监听转身完毕
            if (callback) {
                $boy.on(animationend, function () {
                    callback();
                    $(this).off();
                });
            }
        },
        //取花
        talkFlower: function () {
            // return talkflower();
            $boy.addClass('slowflolerwalk');
        }
    }
}
