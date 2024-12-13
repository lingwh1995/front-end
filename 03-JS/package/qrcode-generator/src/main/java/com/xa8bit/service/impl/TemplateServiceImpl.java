package com.xa8bit.service.impl;

import com.xa8bit.dao.ITemplateDao;
import com.xa8bit.domain.Template;
import com.xa8bit.service.ITemplateService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class TemplateServiceImpl implements ITemplateService {
    @Resource
    private ITemplateDao templateDao;

    @Override
    public int addTemplate(Template template) {
        //设置创建时间
        template.setCreateTime(LocalDateTime.now());
        //设置更新时间
        template.setUpdateTime(LocalDateTime.now());
        return templateDao.addTemplate(template);
    }

    @Override
    public List<Template> getTemplates(Template template) {
        return templateDao.getTemplates(template);
    }

    @Override
    public int deleteTemplatesBySchemeId(String schemeId) {
        return templateDao.deleteTemplatesBySchemeId(schemeId);
    }

    @Override
    public int deleteTemplatesByRuleId(String ruleId) {
        return templateDao.deleteTemplatesByRuleId(ruleId);
    }

    @Override
    public int deleteTemplatesById(int id) {
        return templateDao.deleteTemplatesById(id);
    }

    @Override
    public int updateTemplate(Template template) {
        return templateDao.updateTemplate(template);
    }
}
