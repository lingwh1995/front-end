package com.xa8bit.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 规则实体
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Rule {
    //规则表主键
    private Integer id;
    //规则名称
    private String ruleName;
    //规则编号
    private String ruleNumber;
    //规则启用状态[0:正常,1停用]
    private String ruleStatus;
    //方案id
    private String schemeId;
    //规则唯一标识
    private String ruleId;
    //规则备注
    private String ruleComments;
    //用于多表一对多关联查询
    private List<RuleField> ruleFieldList;
    //用于多表一对一关联查询
    private Scheme scheme;
    //创建时间
    private LocalDateTime createTime;
    //更新时间
    private LocalDateTime updateTime;
}