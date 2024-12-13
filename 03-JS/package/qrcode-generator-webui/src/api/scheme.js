import request from '../axios/request'

/**新增方案 */
export function addScheme(data) {
    return request({
        url: '/scheme',
        method: 'POST',
        data: data
    })
}

/**获取所有方案-分页版 */
export function getSchemesPagination(pagingParameters) {
    return request({
        url: `/scheme/pagination/current_page/${pagingParameters.currentPage}/page_size/${pagingParameters.pageSize}`,
        method: 'GET',
    })
}

/**根据方案名称获取所有方案-分页版 */
export function getSchemesBySchemeNamePagination(pagingParameters,conditions) {
    return request({
        url: `/scheme/pagination/current_page/${pagingParameters.currentPage}/page_size/${pagingParameters.pageSize}/scheme_name/${conditions.schemeName == '' ? null : conditions.schemeName}`,
        method: 'GET',
    })
}

/**根据id删除方案 */
export function deleteSchemeById(id) {
    return request({
        url: `/scheme/${id}`,
        method: 'DELETE',
    })
}

/**获取所有方案-下拉框专用 */
export function getSchemesForSelectInput() {
    return request({
        url: '/scheme/for_input',
        method: 'GET',
    })
}

/**更新方案 */
export function updateScheme(data) {
    return request({
        url: '/scheme',
        method: 'PUT',
        data: data
    })
}


