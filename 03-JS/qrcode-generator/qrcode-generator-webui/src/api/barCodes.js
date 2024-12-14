import request from '../axios/request'

/**批量新增条码 */
export function addBarCodes(data) {
    return request({
        url: '/barcodes',
        method: 'POST',
        data: data,
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

/**获取所有条码生产批次-分页版 */
export function getBarCodesPagination(queryParams,pagingParameters) {
    return request({
        url: `/barcodes/pagination/rule_id/${queryParams.ruleId}/scheme_id/${queryParams.schemeId}/current_page/${pagingParameters.currentPage}/page_size/${pagingParameters.pageSize}`,
        method: 'GET',
    })
}

/**撤销批量新增条码 */
export function undoAddBarCodes() {
    return request({
        url: '/barcodes',
        method: 'DELETE',
    })
}

/**获取最后一批次生产的条码 */
export function getLastBatchGenerateBarCodesBySchemeIdAndRuleId(queryParams) {
    return request({
        url: `/barcodes/last_batch_generate/rule_id/${queryParams.ruleId}/scheme_id/${queryParams.schemeId}`,
        method: 'GET',
    })
}