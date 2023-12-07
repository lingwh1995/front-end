console.log('测试node引入其他模块......');
console.log('我是b.js');
var add = function(x,y){
	return x + y;
}
var foo = 'foo';
exports.foo = foo;
//把对象挂载在exports对象上
exports.add = add;
