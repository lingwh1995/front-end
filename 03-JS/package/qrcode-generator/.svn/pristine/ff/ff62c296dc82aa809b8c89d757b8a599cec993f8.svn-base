package com.xa8bit.service;

import com.xa8bit.domain.RuleField;

import java.util.List;

public interface IRuleFieldService {
    /**
     * 新增规则字段
     * @param ruleField
     * @return
     */
    int addRuleField(RuleField ruleField);

    /**
     * 根据ruleId查询该条规则对应的所有字段信息
     * @param ruleId 条码生成规则表和规则字段表关联字段
     * @return
     */
    List<RuleField> getRuleFieldsByRuleId(String ruleId);

    /**
     * 根据id和startSequence更新该条规则对应的ruleFieldValue中autoIncrementSequenceStartSequence信息
     * @param id
     * @param startSequence
     * @return
     */
    int updateRuleFieldValueAutoIncrementSequenceStartSequenceById(int id,int startSequence);
}
