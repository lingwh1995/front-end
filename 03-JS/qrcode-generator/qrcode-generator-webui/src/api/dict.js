import request from '../axios/request'

/** 根据schemeId和level查询树结构 */
export function getDictsForTreeBySchemeIdAndLevelForCascader(params) {
    return request({
        url: `/dict/scheme_id/${params.schemeId}/level/${params.level}`,
        method: 'GET',
    })
}

/** 根据schemeId查询树结构 */
export function getDictsForTreeBySchemeIdForTree(conditions) {
    return request({
        url: `/dict/scheme_id/${conditions.schemeId}`,
        method: 'GET',
    })
}

/** 新增Dict */
export function addDict(dict) {
    return request({
        url: '/dict',
        method: 'POST',
        data: dict
    })
}

/** 根据id删除Dict */
export function deleteDictByIdRecursive(id) {
    return request({
        url: `/dict/recursive/${id}`,
        method: 'DELETE',
    })
}

/** 根据dictCode查询parentId，根据parentId查询树结构 */
export function getDictsForSelectOptionsByParentIdFromSchemeIdAndDictCode(params) {
    return request({
        url: `/dict/scheme_id/${params.schemeId}/dict_code/${params.dictCode}`,
        method: 'GET',
    })
}

/** 更新Dict */
export function updateDict(dict) {
    return request({
        url: '/dict',
        method: 'PUT',
        data: dict
    })
}