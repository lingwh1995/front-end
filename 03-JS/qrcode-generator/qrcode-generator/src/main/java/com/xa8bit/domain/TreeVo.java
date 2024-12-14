package com.xa8bit.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * 通用的TreeVo
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TreeVo {
    private Integer id;
    //占位符1
    private String _$1;
    //占位符2
    private String _$2;
    //占位符3
    private String _$3;
    //占位符4
    private String _$4;
    //占位符5
    private String _$5;
    //占位符6
    private String _$6;
    //占位符7
    private String _$7;
    //占位符8
    private String _$8;
    //占位符9
    private String _$9;
    //占位符10
    private String _$10;
    //层级
    private Integer level;
    //父节点Id
    private Integer parentId;
    List<TreeVo> children;
}
