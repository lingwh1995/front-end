package com.xa8bit.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xa8bit.domain.ResponseMessage;
import com.xa8bit.domain.Template;
import com.xa8bit.service.ITemplateService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController
public class TemplateController {

    @Resource
    private ITemplateService templateService;

    @PostMapping("/template")
    public ResponseMessage<String> addTemplate(@RequestBody Template template){
        int row = templateService.addTemplate(template);
        return ResponseMessage.SUCCESS(row);
    }
    @DeleteMapping("/template/{id}")
    public ResponseMessage<String> deleteTemplateById(@PathVariable("id") int id){
        int row = templateService.deleteTemplatesById(id);
        return ResponseMessage.SUCCESS(row);
    }

    /**
     * 查询所有模板-分页版
     * @return
     */
    @GetMapping("/template/pagination/scheme_id/{scheme_id}/rule_id/{rule_id}/current_page/{current_page}/page_size/{page_size}")
    public ResponseMessage<PageInfo<Template>> getTemplatesPagination(@PathVariable("scheme_id") String schemeId,
                                                                      @PathVariable("rule_id") String ruleId,
                                                                      @PathVariable("current_page") int currentPage,
                                                                      @PathVariable("page_size") int pageSize) {
        // 设置分页条件
        PageHelper.startPage(currentPage, pageSize);
        Template template = Template.builder()
                .schemeId(schemeId)
                .ruleId(ruleId)
                .build();
        List<Template> templates = templateService.getTemplates(template);
        return ResponseMessage.success(PageInfo.of(templates));
    }


    /**
     * 查询所有模板
     * @return
     */
    @GetMapping("/template/scheme_id/{scheme_id}/rule_id/{rule_id}/template_type/{template_type}")
    public ResponseMessage<List<Template>> getTemplates(@PathVariable("scheme_id") String schemeId,
                                                        @PathVariable("rule_id") String ruleId,
                                                        @PathVariable("template_type") String templateType) {
        Template template = Template.builder()
                .schemeId(schemeId)
                .ruleId(ruleId)
                .templateType(templateType)
                .build();
        return ResponseMessage.success(templateService.getTemplates(template));
    }
}
