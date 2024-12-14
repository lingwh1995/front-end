package com.xa8bit.service;

import com.alibaba.fastjson.JSONObject;
import com.xa8bit.domain.Dict;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;


public interface IDictService {

    /**
     * 根据方案id和level查询树形json数据
     * @param params 方案id + 层级
     * @return
     */
    JSONObject getDictsForTreeBySchemeIdAndLevelForCascader(Map<String,Object> params);

    /**
     * 根据方案id查询树形json数据
     * @param schemeId 方案id
     * @return
     */
    JSONObject getDictsForTreeBySchemeIdForTree(String schemeId);

    /**
     * 新增Dict
     * @param dict
     * @return
     */
    int addDict(Dict dict);

    /**
     * 根据id递归删除Dict
     * @param id
     * @return
     */
    int deleteDictByIdRecursive(@Param("id") int id);

    /**
     * 根据dictCode查询出数据,用在生成条码页面下作为下拉框的选项
     * @param params 字典类型代码 + 方案id
     * @return
     */
    List<Dict> getDictsForSelectOptionsByParentIdFromSchemeIdAndDictCode(Map<String,String> params);

    /**
     * 更新字典类型数据
     * @param dict
     * @return
     */
    int updateDict(Dict dict);
}
