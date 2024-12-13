package com.xa8bit.service;

import com.xa8bit.domain.Scheme;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ISchemeService {

    /**
     * 新增方案
     * @param scheme 方案实体类
     * @return
     */
    int addScheme(Scheme scheme);

    /**
     * TODO 删除
     * 获取所有的方案
     * @return
     */
    List<Scheme> getSchemes();

    /**
     * 获取所有的方案-下拉框专用
     * @return
     */
    List<Scheme> getSchemesForSelectInput();

    /**
     * 根据方案名称获取所有的方案
     * @return
     */
    List<Scheme> getSchemesBySchemeName(String schemeName);

    /**
     * 根据id删除方案
     * @param id
     * @return
     */
    int deleteSchemeById(int id);

    /**
     * 更新方案信息
     * @param scheme
     * @return
     */
    int updateScheme(Scheme scheme);
}
