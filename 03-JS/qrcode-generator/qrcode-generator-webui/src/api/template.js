import request from '../axios/request'

/**新增模板 */
export function addTemplate(template) {
    return request({
        url: '/template',
        method: 'POST',
        data: template
    })
}

/**获取所有模板-分页版 */
export function getTemplatesPagination(conditions,pagingParameters) {
    return request({
        url: `/template/pagination/scheme_id/${conditions.schemeId}/rule_id/${conditions.ruleId}/current_page/${pagingParameters.currentPage}/page_size/${pagingParameters.pageSize}`,
        method: 'GET',
    })
}

/**根据id删除模板 */
export function deleteTemplateById(id) {
    return request({
        url: `/template/${id}`,
        method: 'DELETE',
    })
}

/**获取所有模板 */
export function getTemplates(conditions,templateInfo) {
    return request({
        url: `/template/scheme_id/${conditions.schemeId}/rule_id/${conditions.ruleId}/template_type/${templateInfo.templateType}`,
        method: 'GET',
    })
}




// /**根据模板名称获取所有模板-分页版 */
// export function getTemplatesByTemplateNamePagination(pagingParameters,conditions) {
//     return request({
//         url: `/template/pagination/current_page/${pagingParameters.currentPage}/page_size/${pagingParameters.pageSize}/template_name/${conditions.templateName == '' ? null : conditions.templateName}`,
//         method: 'GET',
//     })
// }


// /**更新模板 */
// export function updateTemplate(data) {
//     return request({
//         url: '/template',
//         method: 'PUT',
//         data: data
//     })
// }


