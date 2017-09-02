/**
 * Created by roy-lau on 2017/8/31 0031.
 * 游戏的核心
 */
var Game = function(){
    //dom元素
    var gameDiv,
        nextDiv;
    //游戏矩阵
    var gameData = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ];
    //当前方块
    var cur;
    //下一个方块
    var next;
    //divs
    var nextDivs = [];
    var gameDivs = [];

    // 初始化Div
    var initDiv = function(container,data,divs){
        for(var i = 0; i<data.length; i++){
            var div = [];
            for(var j=0; j<data[0].length; j++){
                /***
                 * @type {Element}
                 * @description{ 创建一个div,设置div的className为‘none’,设置div的位置（上，左）,
                 * 将创建的div插入到id为game的元素中,将div push到div数组中}
                 */
                var newNode = document.createElement('div');
                newNode.className = 'none';
                newNode.style.top = (i*20) + 'px';
                newNode.style.left = (j*20) + 'px';
                container.appendChild(newNode);
                div.push(newNode);
            }
            divs.push(div);
        }
    };
    //刷新div
    var refreshDiv = function(data,divs){
        for(var i = 0; i < data.length;i++){
            for(var j = 0; j<data[0].length; j++) {
                if (data[i][j] === 0) {
                    divs[i][j].className = 'none';
                } else if (data[i][j] === 1) {
                    divs[i][j].className = 'done';
                } else if (data[i][j] === 2) {
                    divs[i][j].className = 'current';
                }
            }
        }
    };
    //初始化
    var init = function(doms){
        gameDiv = doms.gameDiv;
        nextDiv = doms.nextDiv;
        cur = new Square();
        next = new Square();
        initDiv(gameDiv,gameData,gameDivs);
        initDiv(nextDiv,next.data,nextDivs);
        //拷贝next里的方块到game
        cur.origin.x = 10;
        cur.origin.y = 5;
        for(var i = 0; i<cur.data.length;i++){
            for(var j =0; j<cur.data[0].length;j++){
                gameData[cur.origin.x+i][cur.origin.y+j] = cur.data[i][j];
            }
        }
        refreshDiv(gameData,gameDivs);
        refreshDiv(next.data,nextDivs)
    };
    //导出API
    this.init = init();
};
