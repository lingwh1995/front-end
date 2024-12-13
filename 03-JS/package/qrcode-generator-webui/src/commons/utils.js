//导入lodash的深克隆模块
import _, { cloneDeep } from 'lodash'

/**
 * 使用lodash实现深拷贝
 * @param obj
 */
export const deepClone = (obj) => {
    return _.cloneDeep(obj)
}