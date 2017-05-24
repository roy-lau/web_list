    var container = $("#content");
    // 页面可视区域
    var visualWidth = container.width();
    var visualHeight = container.height();

    var swipe = Swipe(container);
    // 获取数据
    var getvalue = function(classname) {
        var $elem = $('' + classname + '');
        //走路的坐标
        return {
            height: $elem.height(),
            top: $elem.position().top
        };
    };
    //路的y轴
    var pathY = function() {
        var data = getvalue('.a_background_middle');
        return data.top + data.height / 2;
    }();
    var $boy = $("#boy");
    var boyHeight = $boy.height();
    //修正男孩正确位置
    //路中间位置减去男孩的高度，25是一个修正值；
    $boy.css({
        top: pathY - boyHeight + 25
    });
    // ====================================
    //          动画处理
    // ====================================

    // 恢复走路
    function restoreWalk(){
        $boy.removeClass('pauseWalk');
    }
    // css3的动作变化
    function slowWalk(){
        $boy.addClass('slowWalk');
    }
    // 计算移动距离
    function calculateDist(direction, proportion){
        return (direction == "x" ? 
            visualWidth : visualHeight) * proportion;
    }
    // 用transition做运动
    function stratRun(options, runTime){
        var dfdPlay = $.Deferred();
        // 恢复走路
        restoreWalk();
        // 运动的属性
        $boy.transition(
            options,
            runTime,
            'linear',
            function(){});
        return dfdPlay;
    }
    // 开始走路
    function walkRun(time, dist, disY){
        time = time || 3000;
        // 脚动作
        slowWalk();
        // 开始走路
        var d1 = stratRun({
            'left' : dist +'px',
            'top' : disY ? disY : undefined
        },time);
        return d1;
    }