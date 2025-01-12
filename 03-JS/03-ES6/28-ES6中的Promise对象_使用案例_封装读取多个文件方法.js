//引入fs模块
const fs = require('fs')

/**
 * 读取文件：不使用Promise封装，容易出现多层嵌套、回调地狱问题、变量名称写错问题
 */
/*
fs.readFile('./resource/a.txt',(error1,data1) => {
  const aTxt = data1.toString()
  //没有错误，继续读取b.txt文件内容
  fs.readFile('./resource/b.txt',(error2,data2) => {
    const bTxt = data2.toString()
    fs.readFile('./resource/c.txt',(error3,data3) => {
      const cTxt = data3.toString()
      const allTxt = aTxt + '\r\n' +bTxt + '\r\n' + cTxt
      console.log(allTxt)
    })
  })
})*/


/**
 * 读取文件：使用Promise封装，不会出现多层嵌套、回调地狱问题、变量名称写错问题
 */
/**/
const promise = new Promise((resolve, reject) => {
  //注意：Promise中封装的是异步函数，而fs.readFile()就是一个异步函数
  fs.readFile('./resource/a.txt', (error, data) => {
    if (error) reject('a.txt文件未找到')
    resolve(data)
  })
})

promise.then(value => {
  return new Promise((resolve, reject) => {
    //注意：Promise中封装的是异步函数，而fs.readFile()就是一个异步函数
    fs.readFile('./resource/b.txt', (error, data) => {
      if (error) reject('b.txt文件未找到')
      resolve([value, data])
    })
  })
}, reason => {
  console.log(`读取失败，原因是:${reason}`)
})
  .then(value => {
    return new Promise((resolve, reject) => {
      //注意：Promise中封装的是异步函数，而fs.readFile()就是一个异步函数
      fs.readFile('./resource/c.txt', (error, data) => {
        if (error) reject('c.txt文件未找到')
        value.push(data)
        resolve(value)
      })
    })
  }, reason => {
    console.log(`读取失败，原因是:${reason}`)
  })
  .then(value => {
    console.log(value.map(item => item.toString()).join('\r\n'))
  }, reason => {
    console.log(`读取失败，原因是:${reason}`)
  })