console.log('开始执行a......');
var moudleb = require('./b.js');
console.log(moudleb.foo);
console.log('b模块中a+b的结果:'+moudleb.add(1,6));
