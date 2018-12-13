/**
 * Created by roy-lau on 2017/8/31 0031.
 * Update by roy-lau on 2018-12-13 10:40:49
 * 对方游戏区
 */
var Remote = function(socket) {
    // 游戏对象
    var game;
    // 绑定按钮事件
    var bindEvents = function() {
        socket.on('init', function(message) {
            start(message.type, message.dir);
        })
        socket.on('next', function(message) {
            game.performNext(message.type, message.dir);
        })
        socket.on('rotate', function() { game.rotate() });
        socket.on('right', function() { game.right() });
        socket.on('down', function() { game.down() });
        socket.on('left', function() { game.left() });
        socket.on('fall', function() { game.fall() });
        socket.on('fixed', function() { game.fixed() });
        socket.on('line', function(line) {
            game.checkClear();
            game.addScore(line);
        });
        socket.on('time', function(time) {game.setTime(time); });
        socket.on('lose', function() { game.gameover(false); });
        socket.on('addTailLines', function(bottomLines) { game.addTailLines(bottomLines); });
    };
    // 开始
    var start = function(type, dir) {
        var doms = {
            gameDiv: document.getElementById('remote_game'),
            nextDiv: document.getElementById('remote_next'),
            timeDiv: document.getElementById('remote_time'),
            scoreDiv: document.getElementById('remote_score'),
            resultDiv: document.getElementById('remote_gameover')
        };
        game = new Game();
        game.init(doms, type, dir);
    };
    bindEvents();
    // 导出
    // this.start = start;
    // this.bindEvents = bindEvents;
}