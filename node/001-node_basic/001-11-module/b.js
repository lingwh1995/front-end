console.log('测试node引入其他模块......');
console.log('我是b.js');
var add = function(x,y){
	return x + y;
}
module.exports = add;