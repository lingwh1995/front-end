//引入http模块
var http = require('http');
//创建一个server
var server = http.createServer();
//读取html文件
	//引入fs模块
var fs = require('fs');	
server.on('request',function(request,response){
	console.log(request.url);
	var url = request.url;
	if('/index' === url){
		fs.readFile('./index.html',function(error,data){
			response.setHeader('Content-Type','text/html;charset=utf-8');
			console.log(data);
			response.end(data.toString());
		});	
	}else if('/photo'){
		fs.readFile('./wangqw.jpg',function(error,data){
			response.setHeader('Content-Type','image/png');
			response.end(data);
		});
	}else{
		response.end('404 not found!');
	}
});
server.listen(8080,function(){
	console.log('服务器已经启动,访问端口8080');
});