//在node中使用art-template.js
var arttemplate = require('../../node_modules/art-template');
var renderName = arttemplate.render('hello,{{name}}',{
    name:'Jack'
});
console.log('渲染字符串:'+renderName);

var tpl = `
        大家好，我叫:{{name}}
        我的年龄:{{age}}
        我的爱好:{{each hobbies}} {{$value}} {{/each}}`;
var renderObj = arttemplate.render(tpl,{
    name:'Jack',
	age:'18',
	hobbies:['抽烟','烫头']		
});
console.log('渲染对象:'+renderObj);