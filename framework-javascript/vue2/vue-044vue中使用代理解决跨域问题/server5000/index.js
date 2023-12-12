//导入express
const express = require('express')
//创建web服务器
const app=express()
// 通过ap.listen进行服务器的配置，并启动服务器，接收两个配置参数，一个是对应的端口号，一个是启动成功的回调函数
app.listen(5000,()=>{
    console.log('服务器启动成功');
})

//get接口的开发
app.get('/api/list',(err,res)=>{
    console.log('有人访问了get请求...')
    res.send({
        code:200,
        data:[{id:'001',name:'zhangsan',age:28,port:5000}]
    })
})