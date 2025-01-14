'use strict';

var _m = require('./m1.js');

var m1 = _interopRequireWildcard(_m);

var _m2 = require('./m2.js');

var m2 = _interopRequireWildcard(_m2);

var _m3 = require('./m3.js');

var m3 = _interopRequireWildcard(_m3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//引入 m2.js 模块内容
console.log(m1);
//引入 m3.js 模块内容
//把所有模块全部引入在这个入口文件里，使用的时候直接把这个入口文件引入就可以

//引入 m1.js 模块内容

console.log(m2);
console.log(m3);