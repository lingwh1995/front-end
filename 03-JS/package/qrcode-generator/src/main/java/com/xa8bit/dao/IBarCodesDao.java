package com.xa8bit.dao;

import com.xa8bit.domain.BarCodes;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 条码dao
 */
@Mapper
public interface IBarCodesDao {

    /**
     * 插入每个批次生成的条码数据
     * @param barCodes
     * @return
     */
    int addBarCodes(BarCodes barCodes);

    /**
     * 根据条件查询所有的批次生成的条码
     * @return
     */
    List<BarCodes> getBarCodes(BarCodes barCodes);

    /**
     * 撤销上一步生成操作产生的效果，实际上是删除了数据库中的最后一条数据
     * @return
     */
    int undoAddBarCodes();

    /**
     * 根据schemeId删除条码
     * @param schemeId
     * @return
     */
    int deleteBarCodesBySchemeId(String schemeId);

    /**
     * 根据条件查询所有最后一个批次生成的条码
     * @return
     */
    BarCodes getLastBatchGenerateBarCodesBySchemeIdAndRuleId(BarCodes barCodes);
}
