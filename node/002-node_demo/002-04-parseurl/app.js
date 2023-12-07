var http = require('http');
var server = http.createServer()
//引入url模块i,用于解析url
var urlparser = require('url');
server.on('request',function(request,response){
    console.log('原始的url:'+request.url);
    var url = request.url;
    var url = urlparser.parse(url);
    console.log(url);
    //如果参数为true，会把请求参数封装成一个对象，是用urlObj.query可以获取查询字符串age=10
    var urlObj = urlparser.parse(url,true);
    console.log('-----------------------------');
    console.log(urlObj);
    console.log('-----------------------------');
    console.log('访问路径:'+urlObj.pathname);
    console.log('-----------------------------');
    response.end();
})
.listen('8080',function(){
    console.log('服务器已经启动,访问端口8080');
});
