// 引入 fs 模块 (FileSystem)
const fs = require('fs')

/**
 * 传统读取文件方式：
 * 采用 Node.js 约定的“错误优先”回调函数 (Error-First Callback)。
 * 缺点：当需要按顺序读取多个文件时，容易产生多层嵌套，形成“回调地狱”。
 */
/*
fs.readFile('./resource/为学.md', (error, data) => {
  // 如果发生错误，抛出错误并中断程序
  if (error) throw error
  // 没有错误，输出文件内容（data 默认为 Buffer 格式，需 toString 转换）
  console.log(data.toString())
})
*/

/**
 * Promise 封装方式：
 * 核心逻辑：将异步的回调操作包装在 Promise 容器内。
 * 优势：可以通过 .then() 链式调用，逻辑更加线性和清晰。
 */
const promise = new Promise((resolve, reject) => {
  // 注意：Promise 构造函数内部通常封装异步函数，如 fs.readFile
  fs.readFile('./resource/为学.md', (error, data) => {
    // 失败：调用 reject 并传递自定义错误信息
    if (error) reject('a.txt 文件未找到')
    // 成功：调用 resolve 传递读取到的文件内容 (Buffer)
    resolve(data)
  })
})

/**
 * 结果处理
 */
promise.then(
  value => {
    // 成功回调
    console.log(`文件内容: ${value.toString()}`)
  },
  reason => {
    // 失败回调
    console.log(`读取失败，原因是: ${reason}`)
  }
)


/**
 * 在现代 Node.js 开发中，其实你不需要手动去 new Promise 封装 fs.readFile。Node.js 官方已经内置了 Promise 版本的 API
 */
/*
// 方式 A: Node.js 10+ 推荐写法
const fsPromises = require('fs').promises;
fsPromises.readFile('./resource/为学.md').then(data => {})

// 方式 B: 利用 util 工具转换
const util = require('util');
const readFile = util.promisify(fs.readFile);
readFile('./resource/为学.md').then(data => {})
*/