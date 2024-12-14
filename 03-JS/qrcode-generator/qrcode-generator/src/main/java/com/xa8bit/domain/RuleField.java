package com.xa8bit.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 规则字段实体
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RuleField {
    //规则字段表主键
    private Integer id;
    //规则唯一标识
    private String ruleId;
    //规则字段类型代码
    private String ruleFieldCategoryCode;
    //规则字段类型名称
    private String ruleFieldCategoryName;
    //规则字段名称
    private String ruleFieldName;
    //规则字段的值
    private String ruleFieldValue;
    //补齐字段所有子选项信息
    private String ruleFieldFillStrategy;
    //重置策略
    private String ruleFieldResetStrategy;
    //当前字段关联的标签页的索引值
    private Integer ruleFieldAssociationTabIndex;
}
