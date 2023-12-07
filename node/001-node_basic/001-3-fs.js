var fs = require('fs');
fs.readFile('./hello.txt',function(error,data){
	console.log('---------------------read-----------------------');
	console.log('error:'+error);
	console.log('data:'+data);
	console.log('data:'+data.toString());
	console.log('---------------------read-----------------------');
});
fs.writeFile('./hello.txt1','我是写入的内容',function(error,data){
	console.log('---------------------wirte-----------------------');
	console.log('error:'+error);
	console.log('data:'+data);
	console.log('---------------------wirte-----------------------');
});
