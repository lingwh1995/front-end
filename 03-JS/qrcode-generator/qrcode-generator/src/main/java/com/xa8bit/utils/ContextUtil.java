package com.xa8bit.utils;

import java.util.HashMap;
import java.util.Map;

/**
 * ThreadLoca工具类
 */
public class ContextUtil {
    private static final ThreadLocal<Map<String, Object>> threadLocal = new ThreadLocal<>();

    /**
     * 设置数据
     * @param key
     * @param value
     */
    public static void set(String key,Object value) {
        Map<String, Object> map = threadLocal.get();
        if (map == null) {
            map = new HashMap<>(6);
            threadLocal.set(map);
        }
        map.put(key, value);
    }

    /**
     * 获取数据
     * @param key
     * @return
     */
    public static Object get(String key) {
        Map<String, Object> map = threadLocal.get();
        if (map == null) {
            map = new HashMap<>(6);
            threadLocal.set(map);
        }
        return map.get(key);
    }

    /**
     * 清除输入
     */
    public static void remove() {
        threadLocal.remove();
    }
}
