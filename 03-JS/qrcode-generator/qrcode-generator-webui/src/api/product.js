import request from '../axios/request'

/**新增产品 */
export function addProduct(data) {
    return request({
        url: '/product',
        method: 'POST',
        data: data
    })
}

/**获取产品列表 */
export function getProducts(params) {
    return request({
        url: `/product/${params.currentPage}/${params.pageSize}`,
        method: 'GET',
    })
}

/**根据ID删除产品 */
export function deleteProductById(param) {
    return request({
        url: `/product/${param}`,
        method: 'DELETE',
    })
}

/**更新产品 */
export function editProduct(data) {
    return request({
        url: '/product',
        method: 'PUT',
        data: data
    })
}

/**根据ID获取产品 */
/*
export function deleteProductById(params) {
    return request({
        url: `/product/${params.id}`,
        method: 'DELETE',
    })
}
*/

