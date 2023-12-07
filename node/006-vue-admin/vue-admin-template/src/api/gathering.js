import request from '@/utils/request'
const group_name = 'gathering'
export default {
  // es6提供的简单写法
  getList() {
    return request({
      url: `/${group_name}`,
      method: 'get'
    })
  },
  getPageableList(page, size, searchMap) {
    return request({
      url: `/${group_name}/city/${page}/${size}`,
      method: 'get',
      data: searchMap
    })
  },
  savePojo(pojo) {
    return request({
      url: `${group_name}`,
      method: 'post',
      data: pojo
    })
  }

  // 原生写法
  // getList: function() {
  //   return request({
  //     url: '/gathering',
  //     method: 'get'
  //   })
  // }
}
