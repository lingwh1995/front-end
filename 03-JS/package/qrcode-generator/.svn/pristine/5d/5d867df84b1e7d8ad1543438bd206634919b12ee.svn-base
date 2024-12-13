package com.xa8bit.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

/**
 * 条码表
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BarCodes {
    //条码表主键
    private Integer id;
    //与该条条码相互关联的方案的唯一标识
    private String schemeId;
    //与该条条码相互关联的方案的名称
    private String schemeName;
    //与该条条码相互关联的规则的唯一标识
    private String ruleId;
    //与该条条码相互关联的规则的名称
    private String ruleName;
    //生成批次id
    private String batchId;
    //条码值
    private String barCodesValue;
    //该批次生成条码数量
    private int batchAmount;
    //生成时间
    private LocalDateTime createTime;
}