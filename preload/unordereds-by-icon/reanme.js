var fs = require('fs'),
	imgPath = __dirname + "\\images\\" 	// 要修改文件的路径
	i = 0;

fs.readdir(imgPath, function(err,files){ // 读取文件名
	if(err) return;
	files.forEach(function(item,index){
		fs.rename(imgPath + item,imgPath + "qq_"+ ++i +".png", function(err){
			if(err) return;
			console.log("正在更改第 "+ index +"个文件名");
		})
	})
	console.log("修改完成……")
})

//fs.rename('old','new',function(err,files){
//	if(err) return;
//	console.log(files);
//})
