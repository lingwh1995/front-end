//引入fs模块
const fs = require('fs')

/**
 * 读取文件：不使用Promise封装
 */
/*
fs.readFile('./a.txt',(error,data) => {
  //如果发生错误，抛出错误
  if(error) throw error
  //没有错误，输出文件内容
  console.log(data.toString())
})*/

/**
 * 读取文件：使用Promise封装
 */
const promise = new Promise((resolve,reject) => {
  //注意：Promise中封装的是异步函数，而fs.readFile()就是一个异步函数
  fs.readFile('./a.txt',(error,data) => {
    if(error) reject('文件未找到')
    resolve(data)
  })
})
promise.then(value => {
  console.log(`文件内容:${value.toString()}`)
}, reason => {
  console.log(`读取失败，原因是:${reason}`)
})