package com.xa8bit.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xa8bit.domain.ResponseMessage;
import com.xa8bit.domain.Rule;
import com.xa8bit.domain.RuleField;
import com.xa8bit.domain.Scheme;
import com.xa8bit.service.IRuleService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController
public class RuleController {

    @Resource
    private IRuleService ruleService;

    /**
     * 新增规则
     * @return
     */
    @PostMapping("/rule")
    public ResponseMessage<String> addRule(@RequestBody Rule rule) {
        int row = ruleService.addRule(rule);
        return ResponseMessage.SUCCESS(row);
    }

    /**
     * 根据方案id查询该方案下所有的所有的条码生成规则
     * @return
     */
    @GetMapping("/rule/for_select/{scheme_id}")
    public ResponseMessage<List<Rule>> getRulesBySchemeIdForSelect(@PathVariable("scheme_id") String schemeId) {
        return ResponseMessage.success(ruleService.getRulesBySchemeIdForSelect(schemeId));
    }

    /**
     * 查询所有规则-分页版
     * @return
     */
    @GetMapping("/rule/pagination/{current_page}/{page_size}")
    public ResponseMessage<PageInfo<Rule>> getRulesPagination(@PathVariable("current_page") int currentPage,
                                                              @PathVariable("page_size") int pageSize) {
        // 设置分页条件
        PageHelper.startPage(currentPage, pageSize);
        List<Rule> rules = ruleService.getRules();
        return ResponseMessage.success(PageInfo.of(rules));
    }

    /**
     * 根据规则名称查询所有规则-分页版
     * @return
     */
    @GetMapping("/rule/pagination/{current_page}/{page_size}/{rule_name}")
    public ResponseMessage<PageInfo<Rule>> getRulesByRuleNamePagination(@PathVariable("current_page") int currentPage,
                                                                        @PathVariable("page_size") int pageSize,
                                                                        @PathVariable("rule_name") String ruleName) {
        // 设置分页条件
        PageHelper.startPage(currentPage, pageSize);
        List<Rule> rules = ruleService.getRulesByRuleName(ruleName);
        return ResponseMessage.success(PageInfo.of(rules));
    }

    /**
     * 根据id删除规则
     *
     * @param id
     * @return
     */
    @DeleteMapping("/rule/{id}")
    public ResponseMessage<String> deleteSchemeById(@PathVariable("id") Integer id) {
        int row = ruleService.deleteRuleById(id);
        return ResponseMessage.SUCCESS(row);
    }

    /**
     * 新增规则
     * @return
     */
    @PutMapping("/rule")
    public ResponseMessage<String> updateRule(@RequestBody Rule rule) {
        int row = ruleService.updateRule(rule);
        return ResponseMessage.SUCCESS(row);
    }

}
