package com.xa8bit.domain;

import lombok.Data;

import java.io.Serializable;

/**
 * 用于保存分页条件的实体
 */
@Data
public class PageEntity {

    /**
     * 序列化ID
     */
    private static final long serialVersionUID = 1L;

    //当前页码数，默认值为1，表示当前页码数为1
    private int currentPage = 1;

    //每页展示的数据量，默认值为10，表示每页展示10条数据
    private int pageSize = 10;

}
