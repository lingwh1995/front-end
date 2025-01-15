//1. 引入 fs 模块
const fs = require('fs')

//读取为学
const readWeiXue = () => {
  return new Promise((resolve,reject) => {
    fs.readFile('./resource/为学.md', (err,data) => {
      //如果发生了错误
      if(err) reject(err)
      resolve(data)
    })
  })
}

//读取插秧诗
const readChaYangShi = () => {
  return new Promise((resolve,reject) => {
    fs.readFile('./resource/插秧诗.md', (err,data) => {
      //如果发生了错误
      if(err) reject(err)
      resolve(data)
    })    
  })
}

//读取观书有感
const readGuanShu = () => {
  return new Promise((resolve,reject) => {
    fs.readFile('./resource/观书有感.md', (err,data) => {
      //如果发生了错误
      if(err) reject(err)
      resolve(data)
    })   
  })
}

const readFile = async() => {
  //获取为学读取结果
  const weiXue = await readWeiXue()
  //获取插秧诗读取结果
  const chaYang = await readChaYangShi()
  //获取观书有感读取结果
  const guanshu = await readGuanShu()
  
  console.log(weiXue.toString())
  console.log(chaYang.toString())
  console.log(guanshu.toString())
}

readFile()
