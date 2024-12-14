package com.xa8bit.dao;

import com.xa8bit.domain.Template;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ITemplateDao {
    /**
     * 新增模板
     * @param template
     * @return
     */
    int addTemplate(Template template);

    /**
     * 获取该方案和该规则下所有的模板
     * @param template
     * @return
     */
    List<Template> getTemplates(Template template);

    /**
     * 根据schemeId删除所有的模板
     * @param schemeId
     * @return
     */
    int deleteTemplatesBySchemeId(String schemeId);


    /**
     * 根据ruleId删除所有的模板
     * @param ruleId
     * @return
     */
    int deleteTemplatesByRuleId(String ruleId);

    /**
     * 根据id删除模板
     * @param id
     * @return
     */
    int deleteTemplatesById(int id);

    /**
     * 更新模板信息
     * @param template
     * @return
     */
    int updateTemplate(Template template);
}
