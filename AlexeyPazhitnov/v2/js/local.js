/**
 * Created by roy-lau on 2017/8/31 0031.
 * Update by roy-lau on 2018-12-13 10:40:53
 * 己方游戏区
 */
var Local = function(socket) {
    //游戏对象
    var game;
    // 时间间隔
    var INTERVAL = 200;
    // 定时器
    var timer = null;
    // 时间计数器
    var timeConut = 0;
    // 时间
    var time = 0;
    // 绑定键盘事件
    var bindKeyEvent = function() {
        document.onkeydown = function(e) {
            if (e.keyCode == 38) { // up
                game.rotate();
                socket.emit('rotate'); // 给玩家B 发送 rotate消息
            } else if (e.keyCode == 39) { // right
                game.right();
                socket.emit('right'); // 给玩家B 发送 right消息
            } else if (e.keyCode == 40) { // down
                game.down();
                socket.emit('down'); // 给玩家B 发送 down消息
            } else if (e.keyCode == 37) { // left
                game.left();
                socket.emit('left'); // 给玩家B 发送 left消息
            } else if (e.keyCode == 32) { // space
                game.fall();
                socket.emit('fall'); // 给玩家B 发送 fall消息
            }
        }
    }
    // 自动下落
    var move = function() {
        timeFunc();
        if (!game.down()) {
            game.fixed();
            socket.emit('fixed'); // 给玩家B 发送 自动下落 消息
            var line = game.checkClear();
            if (line) {
                game.addScore(line);
                socket.emit('line', line); // 给玩家B 发送 消行 消息
                // 如果当前玩家消除了两行以上，给多方玩家增加底部干扰
                if (line>1) {
                    var bottomLines = generatabottomLines(line);
                    socket.emit('bottomLines',bottomLines);
                }
            }
            var gameOver = game.checkGameOver();
            if (gameOver) {
                game.gameover(false);
                document.getElementById('remote_gameover').innerHTML = "你赢了！";
                socket.emit('lose'); // 给玩家B 发送 游戏结束 消息
                stop();
            } else {
                var t = generateType(),
                    d = generateDir();
                game.performNext(t, d);
                // 告诉服务器 玩家B 开始游戏
                socket.emit('next', { type: t, dir: d });
            }
        } else {
            socket.emit('down'); // 给玩家B 发送 到底 消息
        }
    }
    // 随机生成干扰
    var generatabottomLines = function(lineNum) {
        var lines = [];
        for (var i = 0; i < lineNum; i++) {
            var line = [];
            for (var j = 0; j < 10; j++) {
                line.push(Math.ceil(Math.random() * 2) - 1);
            }
            lines.push(line)
        }
        return lines;
    }
    // 计时函数
    var timeFunc = function() {
        timeConut = timeConut + 1;
        if (timeConut == 5) {
            timeConut = 0;
            time = time + 1;
            game.setTime(time);
            // 同步时间
            socket.on('time', time);
            // if (time % 10 == 0) {
            //     game.addTailLines(generatabottomLines(1));
            // }
        }
    }
    // 随机生成一个方块种类
    var generateType = function() {
        return Math.ceil(Math.random() * 7) - 1; // 随机一个0-6的数字
    }
    // 随机生成一个旋转的次数
    var generateDir = function() {
        return Math.ceil(Math.random() * 4) - 1; // 随机一个0-4的数字
    }
    // 开始
    var start = function() {
        var doms = {
            gameDiv: document.getElementById('local_game'),
            nextDiv: document.getElementById('local_next'),
            timeDiv: document.getElementById('local_time'),
            scoreDiv: document.getElementById('local_score'),
            resultDiv: document.getElementById('local_gameover')
        };
        game = new Game();
        var type = generateType(),
            dir = generateDir();
        game.init(doms, type, dir);
        // 告诉服务器 玩家A（自己） 开始游戏
        socket.emit('init', { type: type, dir: dir });
        bindKeyEvent();
        var t = generateType(),
            d = generateDir();
        game.performNext(t, d);
        // 告诉服务器 玩家B 开始游戏
        socket.emit('next', { type: t, dir: d });
        timer = setInterval(move, INTERVAL);
    };
    // 结束
    var stop = function() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        document.onkeydown = null;
    }
    // 当 socket 监听到 start 方法时，开始游戏
    socket.on('start', function() {
        document.getElementById('waiting').innerHTML = '';
        start();
    })
    // 玩家B 告诉 玩家A
    socket.on('lose', function() {
        game.gameover(true);
        stop();
    });
    // 离开
    socket.on('leave', function() {
        document.getElementById('local_gameover').innerHTML = "对方掉线了！";
        document.getElementById('remote_gameover').innerHTML = "已掉线！";
        stop();
    });
    // 底部增加行
    socket.on('bottomLines', function(bottomLines) {
        game.addTailLines(bottomLines);
        socket.emit('addTailLines',bottomLines)
    });
};