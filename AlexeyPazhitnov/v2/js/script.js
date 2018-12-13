/**
 * Created by roy-lau on 2017/8/31 0031.
 * Update by roy-lau on 2018-12-13 10:39:07
 */

var socket = io('ws://localhost:2333');

var local = new Local(socket);
var remote = new Remote(socket);

socket.on('waiting',function(str) {
	document.getElementById('waiting').innerHTML = str;
})
