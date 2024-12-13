package com.xa8bit.dao;

import com.xa8bit.domain.Scheme;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;


@Mapper
public interface ISchemeDao {

    /**
     * 新增方案
     * @param scheme 方案实体类
     * @return
     */
    int addScheme(Scheme scheme);

    /**
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
    List<Scheme> getSchemesBySchemeName(@Param("schemeName") String schemeName);

    /**
     * 根据id删除方案
     * @param id
     * @return
     */
    int deleteSchemeById(@Param("id") int id);

    /**
     * 更新方案信息
     * @param scheme
     * @return
     */
    int updateScheme(Scheme scheme);

    /**
     * 根据schemeId获取方案
     * @param schemeId
     * @return
     */
    Scheme getSchemeBySchemeId(@Param("schemeId") String schemeId);

    /**
     * 根据id获取方案
     * @param id
     * @return
     */
    Scheme getSchemeById(@Param("id") int id);


}
