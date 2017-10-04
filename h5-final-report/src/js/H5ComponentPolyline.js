/* 折线图组件对象 */
var H5ComponentPolyline = function(name, cfg) {
    var component = new H5ComponentBase(name, cfg);

    // 绘制网格线——背景层
    var w = cfg.width, // 宽
        h = cfg.height, // 高
        cns = document.createElement('canvas'), // 创建画布(网格线背景)
        ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    // 水平网格线 100份 -->100份
    var step = 10;
    ctx.beginPath(); // 画线
    ctx.lineWidth = 1; // 画笔的宽度为1
    ctx.strokeStyle = '#AAA'; // 画笔的颜色

    window.ctx = ctx;
    for (var i = 0; i < step + 1; i++) {
        var y = (h / step) * i;
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
    }
    // 垂直网格线（根据项目的个数划分）
    step = cfg.data.length + 1;
    var text_w = w / step >> 0;
    for (var i = 0; i < step + 1; i++) {
        var x = (w / step) * i;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        if (cfg.data[i]) {
            var text = $('<div class="text">');
            text.text(cfg.data[i][0]);
            text.css('width', text_w / 2).css('left', x / 2 + text_w / 4);
            component.append(text);
        }
    }
    ctx.stroke();
    // component.append(cns);

    /**
     * 绘制折线以及对应的数据和阴影
     * @param {floot} per 0到1之间的数据，会根据这个值绘制最终数据对应的中间状态
     * @param {DOM} 组件模板
     */
    var draw = function(per) {
        // 清空画布
        ctx.clearRect(0, 0, w, h);
        // 加入画布————数据层
        ctx.beginPath(); // 画线
        ctx.lineWidth = 3; // 画笔的宽度为3
        ctx.strokeStyle = '#FF8878'; // 画笔的颜色
        // 画点
        var x = 0,
            y = 0,
            grid = (w / (cfg.data.length + 1));
        for (i in cfg.data) {
            var item = cfg.data[i];

            x = grid * i + grid;
            y = h - (item[1] * h * per);

            ctx.moveTo(x, y);
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
        }
        // 连线
        // 移动画笔到第一个数据点的位置
        ctx.moveTo(grid, h - (cfg.data[0][1] * h * per));
        for (i in cfg.data) {
            var item = cfg.data[i];
            x = grid * i + grid;
            y = h - (item[1] * h * per);
            ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(255,255,255,0)"
        // 绘制阴影
        ctx.lineTo(x, h);
        ctx.lineTo(grid, h);
        ctx.fillStyle = 'rgba(255,136,120,0.2)';
        ctx.fill();

        // 写数据
        for (i in cfg.data) {
            var item = cfg.data[i];
            x = grid * i + grid;
            y = h - (item[1] * h * per);
            ctx.fillStyle = item[2] ? item[2] : "#595959";
            ctx.fillText(((item[1] * 100) >> 0) + '%', x - 10, y - 10);
        }
        ctx.stroke();
    }

    component.on('onLoad', function() {
        // 折线图生长动画
        var s = 0;
        for (var i = 0; i < 100; i++) {
            setTimeout(function() {
                s += .01;
                draw(s)
            }, i * 10+500)
        }
    });
    component.on('onLeave', function() {
        // 折线图退场动画
        var s = 1;
        for (var i = 0; i < 100; i++) {
            setTimeout(function() {
                s -= .01;
                draw(s)
            }, i * 10)
        }
    });
    return component;
}