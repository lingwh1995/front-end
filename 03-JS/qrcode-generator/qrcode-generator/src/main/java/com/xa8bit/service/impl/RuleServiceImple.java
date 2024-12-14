package com.xa8bit.service.impl;

import com.xa8bit.dao.IBarCodesDao;
import com.xa8bit.dao.IRuleDao;
import com.xa8bit.dao.IRuleFieldDao;
import com.xa8bit.domain.Rule;
import com.xa8bit.domain.RuleField;
import com.xa8bit.service.IRuleService;
import com.xa8bit.utils.UUIDUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RuleServiceImple implements IRuleService {

    @Resource
    private IRuleDao ruleDao;
    @Resource
    private IRuleFieldDao ruleFieldDao;
    @Resource
    private IBarCodesDao barCodesDao;

    @Transactional
    @Override
    public int addRule(Rule rule) {
        //设置ruleStatus字段的值
        rule.setRuleStatus(rule.getRuleStatus().equals("true") ? "0" : "1");
        //设置ruleId
        rule.setRuleId(UUIDUtils.randomUUID());
        //设置创建时间
        rule.setCreateTime(LocalDateTime.now());
        //设置更新时间
        rule.setUpdateTime(LocalDateTime.now());
        //设置ruleComments
        rule.setRuleComments(rule.getRuleComments() == "" ? "无" : rule.getRuleComments());
        //循环遍历给所有的ruleField设置id
        rule.getRuleFieldList().forEach(ruleField -> ruleField.setRuleId(rule.getRuleId()));
        //一次性批量插入所有的ruleField
        ruleFieldDao.addRuleFieldBatch(rule.getRuleFieldList());
        return ruleDao.addRule(rule);
    }

    /**
     * TODO 删除
     * @param schemeId
     * @return
     */
    @Override
    public List<Rule> getRulesBySchemeId(String schemeId) {
        return ruleDao.getRulesBySchemeId(schemeId);
    }

    @Override
    public List<Rule> getRulesBySchemeIdForSelect(String schemeId) {
        return ruleDao.getRulesBySchemeIdForSelect(schemeId);
    }

    @Override
    public List<Rule> getRules() {
        return ruleDao.getRules();
    }

    @Override
    public List<Rule> getRulesByRuleName(String ruleName) {
        return ruleDao.getRulesByRuleName(ruleName);
    }

    @Override
    public int deleteRuleById(int id) {
        //查询到对应的Rule
        Rule rule = ruleDao.getRuleById(id);
        //删除该规则生成的条码
        barCodesDao.deleteBarCodesBySchemeId(rule.getSchemeId());
        //删除从表数据
        ruleFieldDao.deleteRuleFieldByRuleId(rule.getRuleId());
        //删除主表数据
        int row = ruleDao.deleteRuleById(id);
        return row;
    }

    @Override
    public int updateRule(Rule rule) {
        //设置ruleStatus字段的值
        rule.setRuleStatus(rule.getRuleStatus().equals("true") ? "0" : "1");
        //设置更新时间
        rule.setUpdateTime(LocalDateTime.now());
        //这里是无法直接更新规则字段的，只能先删除之前所有的这个规则下面关联的字段，然后在重新插入数据
        int deleteRow = ruleFieldDao.deleteRuleFieldByRuleIdReal(rule.getRuleId());
        //循环遍历给所有的ruleField设置id
        rule.getRuleFieldList().forEach(ruleField -> ruleField.setRuleId(rule.getRuleId()));
        //一次性批量插入所有的ruleField
        ruleFieldDao.addRuleFieldBatch(rule.getRuleFieldList());
        return ruleDao.updateRule(rule);
    }
}
