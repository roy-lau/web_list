/**
 * Created by roy-lau on 2017/8/31 0031.
 * 己方游戏区
 */
var Local = function(){
  //游戏对象
    var game;
    // 时间间隔
    var INTERVAL = 200;
    // 定时器
    var timer = null;
    // 绑定键盘事件
    var bindKeyEvent = function(){
        document.onkeydown = function(e){
            if(e.keyCode == 38){ // up
                game.rotate();
            }else if(e.keyCode == 39){ // right
                game.right(); 
            }else if(e.keyCode == 40){ // down
                game.down();
            }else if(e.keyCode == 37){ // left
                game.left();
            }else if(e.keyCode == 32){ // space
                game.fall();
            }
        }
    }
    // 自动下落
    var move = function(){
        if(!game.down()){
            game.fixed();
            game.checkClear();
            var gameOver = game.checkGameOver();
            if(gameOver){
                stop();
            }else{
                game.performNext(generateType(),generateDir())
            }
        }
    }
    // 随机生成一个方块种类
    var generateType = function(){
        return Math.ceil(Math.random() * 7) -1; // 随机一个0-6的数字
    }
    // 随机生成一个旋转的次数
    var generateDir = function(){
        return Math.ceil(Math.random() * 4) -1; // 随机一个0-4的数字
    }
    // 开始
    var start = function(){
        var doms = {
            gameDiv: document.getElementById('game'),
            nextDiv: document.getElementById('next')
        };
        game = new Game();
        game.init(doms);
        bindKeyEvent();
        timer = setInterval(move, INTERVAL);
    };
    // 结束
    var stop = function(){
        if(timer){
            clearInterval(timer);
            timer = null;
        }
        document.onkeydown = null;
    }
    //导出API
    this.start = start;
};
