// 引入 fs 模块
const fs = require('fs')

/**
 * 传统方式：多文件读取（嵌套回调）
 * 缺点：代码向右偏移，形成“回调地狱”，逻辑难以追踪，变量命名（error1, error2...）极其冗余。
 */
/*
fs.readFile('./resource/为学.md', (error1, data1) => {
  const aTxt = data1.toString()
  fs.readFile('./resource/插秧诗.md', (error2, data2) => {
    const bTxt = data2.toString()
    fs.readFile('./resource/观书有感.md', (error3, data3) => {
      const cTxt = data3.toString()
      const allTxt = aTxt + '\r\n' + bTxt + '\r\n' + cTxt
      console.log(allTxt)
    })
  })
})
*/

/**
 * Promise 方式：多文件读取（链式调用）
 * 优势：将嵌套的异步逻辑打平，每一层通过 return 一个新的 Promise 将控制权和数据传递给下一个 .then()。
 */

// 1. 初始化：读取第一个文件
const promise = new Promise((resolve, reject) => {
  fs.readFile('./resource/为学.md', (error, data) => {
    if (error) reject('为学.md 文件未找到')
    resolve(data)
  })
})

// 2. 链式第一步：读取第二个文件
promise.then(value => {
  return new Promise((resolve, reject) => {
    fs.readFile('./resource/插秧诗.md', (error, data) => {
      if (error) reject('插秧诗.md 文件未找到')
      // 将上一个文件的数据和当前数据组合成数组传递
      resolve([value, data])
    })
  })
}, reason => {
  console.log(`读取失败，原因是: ${reason}`)
})
  // 3. 链式第二步：读取第三个文件
  .then(value => {
    return new Promise((resolve, reject) => {
      fs.readFile('./resource/观书有感.md', (error, data) => {
        if (error) reject('观书有感.md 文件未找到')
        // 将第三个文件的数据存入数组
        value.push(data)
        resolve(value)
      })
    })
  }, reason => {
    console.log(`读取失败，原因是: ${reason}`)
  })
  // 4. 链式第三步：合并结果并展示
  .then(value => {
    // 此时 value 包含三个文件的 Buffer 数据，进行格式化处理
    console.log(value.map(item => item.toString()).join('\r\n'))
  }, reason => {
    console.log(`读取失败，原因是: ${reason}`)
  })