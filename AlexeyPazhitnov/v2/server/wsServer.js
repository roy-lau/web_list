let app = require('http').createServer(),
    io = require('socket.io')(app)

const PORT = 2333;

// 客户端计数
let clientCount = 0,
    // 用来储存客户端 socket
    socketMap = {}

app.listen(PORT);

/**
 * 绑定客户端传来的消息
 * @param  {[type]} socket [description]
 * @param  {String} event  init：玩家A，next：玩家B
 * @return {[type]}        [description]
 */
function bindListener(socket, event) {
    socket.on(event, function(message) {
        if (socket.clientCount % 2 === 0) {
            if (socketMap[socket.clientNum - 1]) {
                socketMap[socket.clientNum - 1].emit(event, message);
            }
        } else {
            if (socketMap[socket.clientNum + 1]) {
                socketMap[socket.clientNum + 1].emit(event, message);
            }
        }
    });
}
// 连接 socket
io.on('connection', function(socket) {

    clientCount += 1;
    socket.clientNum = clientCount;
    socketMap[clientCount] = socket;

    // 如果是奇数，需要等待第二个玩家进入
    if (clientCount % 2 === 1) {
        socket.emit('waiting', '等待其他玩家进入……')
    } else { // 如果不是奇数，开玩……
    	if (socketMap[socket.clientNum - 1]) {
	        socket.emit('start'); // 玩家A
	        socketMap[(clientCount - 1)].emit('start'); // 玩家B
    	}else{
    		socket.emit('leave');
    	}
    }

    bindListener(socket, 'init'); // 玩家A 开始游戏
    bindListener(socket, 'next'); // 玩家B 开始游戏
    bindListener(socket, 'rotate'); // 玩家B
    bindListener(socket, 'right'); // 玩家B
    bindListener(socket, 'down'); // 玩家B
    bindListener(socket, 'left'); // 玩家B
    bindListener(socket, 'fall'); // 玩家B
    bindListener(socket, 'fixed'); // 玩家B
    bindListener(socket, 'line'); // 玩家B
    bindListener(socket, 'time'); // 玩家B
    bindListener(socket, 'lose'); // 玩家B
    bindListener(socket, 'bottomLines'); // 玩家B
    bindListener(socket, 'addTailLines'); // 玩家B

    // 断开连接
    socket.on('disconnect', function() {
        if (socket.clientCount % 2 === 0) {
            if (socketMap[socket.clientNum - 1]) {
                socketMap[socket.clientNum - 1].emit('leave'); //玩家A 离开
            }
        } else {
            if (socketMap[socket.clientNum + 1]) {
                socketMap[socket.clientNum + 1].emit('leave'); //玩家B 离开
            }
        };
        delete(socketMap[socket.clientNum]);
    })
})

console.log("webServer listen on port " + PORT);