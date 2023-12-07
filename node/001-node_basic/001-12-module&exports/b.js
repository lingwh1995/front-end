console.log('测试node引入其他模块......');
console.log('我是b.js');
//隐藏代码一
var exports = module.exports;

exports = {};
//等价于
//module.exports = {};

exports.foo = 'XXX';
//最终返回的是这个对象
    //隐藏代码二
//return module.exports;