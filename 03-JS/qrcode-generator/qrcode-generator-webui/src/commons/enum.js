/**
 * 规则字段类型枚举
 */
export const RuleFieldTypeEnum_ = {
  FIXED_CONSTANT: {
    CODE: '0001',
    NAME: '固定常量'
  },
  DROPDOWN_SELECT_INPUT: {
    CODE: '0002',
    NAME: '下拉选择'
  },
  CASCADER_SELECT_INPUT: {
    CODE: '0003',
    NAME: '级联选择 '
  },
  COMBINATION_FORMAT_DATA: {
    CODE: '0004',
    NAME: '日期类型'
  },
  AUTO_INCREMENT_SEQUENCE: {
    CODE: '0005',
    NAME: '自增序列'
  },
  BAR_CODE_NAME: {
    CODE: '1001',
    NAME: '条码名称'
  },
}

/**表单项类型枚举 */
export const FormItemTypeEnum_ = {
  FORM_ITEM_INPUT: {
    CODE: '0001',
    NAME: '输入框'
  },
  FORM_ITEM_SELECT: {
    CODE: '0002',
    NAME: '下拉选择'
  },
  FORM_ITEM_CASCADER: {
    CODE: '0003',
    NAME: '级联选择'
  },
  FORM_ITEM_AUTO_INCREMENT_SEQUENCE: {
    CODE: '0004',
    NAME: '自增序列'
  },
}

/*导出类型枚举*/
export const TemplateEnum_ = {
  //生成模板
  GENERATE_TEMPLATE:{
    CODE:'1',
    DESC:'生成样式模板'
  },
  //导出模板
  EXPORT_TEMPLATE: {
    CODE:'2',
    DESC:'导出样式模板'
  }
}
