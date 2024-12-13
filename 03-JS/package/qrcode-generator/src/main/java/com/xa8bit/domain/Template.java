package com.xa8bit.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Template {
    //模板表主键
    private Integer id;
    //与该条条码相互关联的方案的唯一标识
    private String schemeId;
    //与该条条码相互关联的方案的名称
    private String schemeName;
    //与该条条码相互关联的规则的唯一标识
    private String ruleId;
    //与该条条码相互关联的规则的名称
    private String ruleName;
    //模板名称
    private String templateName;
    //模板启用状态[0:正常,1停用]
    private String templateStatus;
    //模板类型
    private String templateType;
    //模板内容
    private String templateContent;
    //创建时间
    private LocalDateTime createTime;
    //更新时间
    private LocalDateTime updateTime;
}
