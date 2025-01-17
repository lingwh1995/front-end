// import * as m1 from "./hello.js";
//获取元素
const btn = document.getElementById('btn')

btn.onclick = function () {
  //使用import()函数实现动态导入，用的时候才导入，可以实现懒加载效果
  import('./hello.js').then(module => {
    module.hello()
  })
}