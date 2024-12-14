import request from '../axios/request'


/**根据ruleId查询该ruleId对应的的所有条码生成规则字段 */
export function getRuleFieldsByRuleId(ruleId) {
    return request({
        url: `/rule_field/${ruleId}`,
        method: 'GET',
    })
}

/**根据id和startSequence更新该条规则对应的ruleFieldValue中autoIncrementSequenceStartSequence信息 */
export function updateRuleFieldValueAutoIncrementSequenceStartSequenceById(params) {
    return request({
        url: `/rule_field/${params.id}/${params.startSequence}`,
        method: 'PUT',
    })
}

























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
export function deleteProductById(params) {
    return request({
        url: `/product/${params}`,
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


