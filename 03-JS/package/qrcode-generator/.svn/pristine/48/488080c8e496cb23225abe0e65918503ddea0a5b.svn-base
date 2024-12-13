package com.xa8bit.service.impl;

import com.xa8bit.dao.IBarCodesDao;
import com.xa8bit.dao.IRuleDao;
import com.xa8bit.dao.IRuleFieldDao;
import com.xa8bit.dao.ISchemeDao;
import com.xa8bit.domain.BarCodes;
import com.xa8bit.domain.Rule;
import com.xa8bit.domain.Scheme;
import com.xa8bit.service.IBarCodesService;
import com.xa8bit.service.ISchemeService;
import com.xa8bit.utils.UUIDUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@Service
public class SchemeServiceImpl implements ISchemeService {

    @Resource
    private ISchemeDao schemeDao;

    @Resource
    private IRuleDao ruleDao;

    @Resource
    private IRuleFieldDao ruleFieldDao;

    @Resource
    private IBarCodesDao barCodesDao;

    @Override
    public int addScheme(Scheme scheme) {
        //设置schemeId
        scheme.setSchemeId(UUIDUtils.randomUUID());
        //设置方案备注
        if(scheme.getSchemeComments() == null || scheme.getSchemeComments().isEmpty()) {
            scheme.setSchemeComments("无");
        }
        //设置方案启用状态
        scheme.setSchemeStatus(scheme.getSchemeStatus() == "true" ? "0" : "1");
        //设置方案创建时间
        scheme.setCreateTime(LocalDateTime.now());
        //设置方案更新时间
        scheme.setUpdateTime(LocalDateTime.now());
        return schemeDao.addScheme(scheme);
    }

    /**
     *
     * @return
     */
    @Override
    public List<Scheme> getSchemes() {
        return schemeDao.getSchemes();
    }

    @Override
    public List<Scheme> getSchemesForSelectInput() {
        return schemeDao.getSchemesForSelectInput();
    }


    @Override
    public List<Scheme> getSchemesBySchemeName(String schemeName) {
        return schemeDao.getSchemesBySchemeName(schemeName);
    }

    @Override
    public int deleteSchemeById(int id) {
        //根据id获取方案
        Scheme scheme = schemeDao.getSchemeById(id);
        //删除方案规则关联的所有生成的条码
        barCodesDao.deleteBarCodesBySchemeId(scheme.getSchemeId());
        //删除方案关联的规则和规则字段
            //删除关联的规则字段
        List<Rule> rules = ruleDao.getRulesBySchemeId(scheme.getSchemeId());
        //如果查询到的规则不为空，则删除该规则关联的所有规则字段
        if(! rules.isEmpty()) {
            rules.forEach(rule -> {
                ruleFieldDao.deleteRuleFieldByRuleId(rule.getRuleId());
            });
        }
            //删除关联的规则
        int deleteRuleBySchemeIdRow = ruleDao.deleteRuleBySchemeId(scheme.getSchemeId());
        //删除方案
        int deleteSchemeByIdRow = schemeDao.deleteSchemeById(id);
        return deleteSchemeByIdRow;
    }

    @Override
    public int updateScheme(Scheme scheme) {
        //设置方案启用状态
        scheme.setSchemeStatus(scheme.getSchemeStatus() == "true" ? "0" : "1");
        //设置更新时间
        scheme.setUpdateTime(LocalDateTime.now());
        return schemeDao.updateScheme(scheme);
    }
}
