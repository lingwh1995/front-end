package com.xa8bit.dao;

import com.xa8bit.domain.Rule;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;


@Mapper
public interface IRuleDao {

    /**
     * 新增规则
     * @param rule 规则实体类
     * @return
     */
    int addRule(Rule rule);

    /**
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
     * 根据规则名称获取所有的规则
     * @return
     */
    List<Rule> getRulesByRuleName(@Param("ruleName") String ruleName);

    /**
     * 根据id删除规则
     * @param id
     * @return
     */
    int deleteRuleById(@Param("id") int id);

    /**
     * 更新规则
     * @param rule
     * @return
     */
    int updateRule(Rule rule);

    /**
     * 根据id获取规则
     * @param id
     * @return
     */
    Rule getRuleById(@Param("id") int id);

    /**
     * 根据ruleId获取规则
     * @param ruleId
     * @return
     */
    Rule getRuleByRuleId(@Param("ruleId") String ruleId);

    /**
     * 根据schemeId删除规则
     * @param schemeId
     * @return
     */
    int deleteRuleBySchemeId(@Param("schemeId") String schemeId);
}
