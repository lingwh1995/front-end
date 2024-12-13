package com.xa8bit.controller;

import com.xa8bit.domain.ResponseMessage;
import com.xa8bit.domain.Rule;
import com.xa8bit.domain.RuleField;
import com.xa8bit.service.IRuleFieldService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController
public class RuleFieldController {

    @Resource
    private IRuleFieldService ruleFieldService;

    /**
     * 根据ruleId查询所有关联的规则字段
     * @param ruleId
     * @return
     */
    @GetMapping("/rule_field/{rule_id}")
    public ResponseMessage<List<RuleField>> getRuleFieldsByRuleId(@PathVariable("rule_id") String ruleId) {
        return ResponseMessage.success(ruleFieldService.getRuleFieldsByRuleId(ruleId));
    }

    /**
     * 根据id和startSequence更新该条规则对应的ruleFieldValue中autoIncrementSequenceStartSequence信息
     * @param id
     * @param startSequence
     * @return
     */
    @PutMapping("/rule_field/{id}/{start_sequence}")
    public ResponseMessage<String> updateRuleFieldValueAutoIncrementSequenceStartSequenceById(@PathVariable("id") int id, @PathVariable("start_sequence") int startSequence) {
        int row = ruleFieldService.updateRuleFieldValueAutoIncrementSequenceStartSequenceById(id, startSequence);
        return ResponseMessage.SUCCESS(row);
    }
}
