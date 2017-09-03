/**
 * Created by roy-lau on 2017/8/31 0031.
 */
var local = new Local();
local.start();
var remote = new Remote();
remote.start(2,2);
remote.bindEvents();
