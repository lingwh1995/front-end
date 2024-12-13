package com.xa8bit.utils;

import lombok.Builder;

import java.util.HashMap;
import java.util.Map;

/**
 * 用于封装Mybatis条件查询所用到的条件
 */
@Builder
public class ConditionsUtils {
    private Map<String,Object> conditionsMap = new HashMap<>();

    /**
     * 添加条件
     * @param conditionKey      条件key
     * @param conditionValue    条件value
     */
    public void addCondition(String conditionKey,Object conditionValue) {
        conditionsMap.put(conditionKey,conditionValue);
    }
}
