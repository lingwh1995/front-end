var http = require('http');
var server = http.createServer();
//给客户端返回时解决中文乱码问题
server.on('request',function(request,response){
	response.setHeader('Content-Type','text/plain;charset=utf-8');
	console.log(request.url);
	response.end('hello 世界!');
});
server.listen('8080',function(){
	console.log('服务器启动成功,端口为8080');
});
