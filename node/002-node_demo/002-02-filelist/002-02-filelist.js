//引入http模块
var http = require('http');
//创建一个server
var server = http.createServer();
//读取html文件
	//引入fs模块
var fs = require('fs');	
server.on('request',function(request,response){
	var url = request.url;
	fs.readdir('./',function(error,data){
		console.log(data);
	});
	console.log(url);
	response.end();	
});
server.listen(8080,function(){
	console.log('服务器已经启动,访问端口8080');
});
