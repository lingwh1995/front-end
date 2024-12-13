package com.xa8bit.service;

import com.xa8bit.domain.Rule;
import com.xa8bit.domain.Scheme;

import java.util.List;

public interface IRuleService {
    /**
     * 新增规则
     * @param rule
     * @return
     */
    int addRule(Rule rule);

    /**
     * TODO 删除
     * 根据方案id查询该方案所有的条码生成规则
     * @param schemeId
     * @return
     */
    List<Rule> getRulesBySchemeId(String schemeId);

    /**
     * 根据方案id查询该方案所有的条码生成规则-下拉框专用
     * @param schemeId
     * @return
     */
    List<Rule> getRulesBySchemeIdForSelect(String schemeId);

    /**
     * 获取所有的规则
     * @return
     */
    List<Rule> getRules();

    /**
     * 根据规则名称获取所有的方案
     * @return
     */
    List<Rule> getRulesByRuleName(String ruleName);

    /**
     * 根据id删除规则
     * @param id
     * @return
     */
    int deleteRuleById(int id);

    /**
     * 更新规则
     * @param rule
     * @return
     */
    int updateRule(Rule rule);
}
