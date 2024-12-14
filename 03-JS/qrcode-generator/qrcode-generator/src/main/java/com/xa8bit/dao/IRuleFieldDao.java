package com.xa8bit.dao;

import com.xa8bit.domain.Rule;
import com.xa8bit.domain.RuleField;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;


@Mapper
public interface IRuleFieldDao {

    /**
     * TODO 待删除
     * 新增规则字段
     * @param ruleField 规则字段实体类
     * @return
     */
    int addRuleField(RuleField ruleField);

    /**
     * 批量插入ruleField
     * @param ruleFieldList
     * @return
     */
    int addRuleFieldBatch(@Param("ruleFieldList") List<RuleField> ruleFieldList);

    /**
     * 根据ruleId查询该条规则对应的所有字段信息
     * @param ruleId 条码生成规则表和规则字段表关联字段
     * @return
     */
    List<RuleField> getRuleFieldsByRuleId(String ruleId);

    /**
     * 根据id查询该条规则对应的所有字段信息
     * @param id 条码生成规则字段表主键
     * @return
     */
    RuleField getRuleFieldById(int id);

    /**
     * 根据id更新该条规则对应的RuleFieldValue信息
     * @param paramsMap
     * @return
     */
    int updateRuleFieldValueById(Map<String,Object> paramsMap);

    /**
     * 根据ruleId逻辑删除ruleField表中的数据
     * @param ruleId
     * @return
     */
    int deleteRuleFieldByRuleId(@Param("ruleId") String ruleId);

    /**
     * 根据ruleId物理删除ruleField表中的数据
     * @param ruleId
     * @return
     */
    int deleteRuleFieldByRuleIdReal(@Param("ruleId") String ruleId);
}
