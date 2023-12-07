import request from '~/utils/request'
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
      url: `/${group_name}/search/${page}/${size}`,
      method: 'post',
      data: searchMap
    })
  },
  savePojo(pojo) {
    return request({
      url: `${group_name}`,
      method: 'post',
      data: pojo
    })
  },
  findActivityById(id){
    return request({
      url: `${group_name}/{gatheringId}`,
      method: 'get',
      data: 'id'
    })
  }
} 