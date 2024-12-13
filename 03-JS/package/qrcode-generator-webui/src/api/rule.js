import request from '../axios/request'

/**新增规则 */
export function addRule(data) {
    return request({
        url: '/rule',
        method: 'POST',
        data: data
    })
}

/**根据schemeId查询该产品的所有条码生成规则-下拉框专用 */
export function getRulesBySchemeIdForSelect(schemeId) {
    return request({
        url: `/rule/for_select/${schemeId}`,
        method: 'GET',
    })
}

/**获取所有规则-分页版 */
export function getRulesPagination(pagingParameters) {
    return request({
        url: `/rule/pagination/${pagingParameters.currentPage}/${pagingParameters.pageSize}`,
        method: 'GET',
    })
}

/**根据规则名称获取所有规则-分页版 */
export function getRulesByRuleNamePagination(pagingParameters,conditions) {
    return request({
        url: `/rule/pagination/${pagingParameters.currentPage}/${pagingParameters.pageSize}/${conditions.ruleName == '' ? null : conditions.ruleName}`,
        method: 'GET',
    })
}

/**根据id删除方案 */
export function deleteRuleById(id) {
    return request({
        url: `/rule/${id}`,
        method: 'DELETE',
    })
}

/**更新规则 */
export function updateRule(data) {
    return request({
        url: '/rule',
        method: 'PUT',
        data: data
    })
}