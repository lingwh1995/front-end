package com.xa8bit.dao;

import com.xa8bit.domain.Dict;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface IDictDao {

    /**
     * 根据方案id和level查询数据
     * @param params 方案id + 层级
     * @return
     */
    List<Dict> getDictsForTreeBySchemeIdAndLevelForCascader(Map<String,Object> params);

    /**
     * 根据方案id查询数据
     * @param schemeId 方案id
     * @return
     */
    List<Dict> getDictsForTreeBySchemeIdForTree(@Param("schemeId") String schemeId);

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
     * 根据dictCode查询数据
     * @param params 字典类型代码 + 方案id
     * @return
     */
    List<Dict> getDictsForSelectOptionsByParentIdFromSchemeIdAndDictCode(Map params);

    /**
     * 更新字典类型数据
     * @param dict
     * @return
     */
    int updateDict(Dict dict);

    /**
     * 查询当前数据库中数据id的最大值
     * @return
     */
    int getMaxId();
}
