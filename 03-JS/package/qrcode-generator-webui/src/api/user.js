import request from '../axios/request'

/**新增模板 */
export function login(data) {
    return request({
        url: '/user/login',
        method: 'POST',
        data: data
    })
}


