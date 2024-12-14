package com.xa8bit.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xa8bit.dao.IRuleDao;
import com.xa8bit.dao.IRuleFieldDao;
import com.xa8bit.domain.Rule;
import com.xa8bit.domain.RuleField;
import com.xa8bit.service.IRuleFieldService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@Service
public class RuleFieldServiceImpl implements IRuleFieldService {

    @Resource
    private IRuleFieldDao ruleFieldDao;

    @Resource
    private IRuleDao ruleDao;

    @Override
    public int addRuleField(RuleField ruleField) {
        return ruleFieldDao.addRuleField(ruleField);
    }

    @Override
    public List<RuleField> getRuleFieldsByRuleId(String ruleId) {
        return ruleFieldDao.getRuleFieldsByRuleId(ruleId);
    }

    @Override
    public int updateRuleFieldValueAutoIncrementSequenceStartSequenceById(int id, int startSequence) {
        RuleField ruleField = ruleFieldDao.getRuleFieldById(id);
        //更新rule中的updateTime字段
            //根据ruleId查询出对应的rule
        Rule rule = ruleDao.getRuleByRuleId(ruleField.getRuleId());
            //设置更新时间
        rule.setUpdateTime(LocalDateTime.now());
            //更新rule
        ruleDao.updateRule(rule);
        String autoIncrementSequence = ruleField.getRuleFieldValue();
        JSONObject autoIncrementSequenceJSONJSONObject = (JSONObject)JSON.parse(autoIncrementSequence);
        //设置autoIncrementSequence.startSequence的值
        autoIncrementSequenceJSONJSONObject.put("startSequence", startSequence);
        autoIncrementSequence = JSON.toJSONString(autoIncrementSequenceJSONJSONObject);
        //在这里ruleFieldValue就是autoIncrementSequence
        String ruleFieldValue = autoIncrementSequence;
        //执行更新操作
        HashMap<String, Object> paramsMap = new HashMap<>();
        paramsMap.put("id",id);
        paramsMap.put("ruleFieldValue",autoIncrementSequence);
        return ruleFieldDao.updateRuleFieldValueById(paramsMap);
    }

}
