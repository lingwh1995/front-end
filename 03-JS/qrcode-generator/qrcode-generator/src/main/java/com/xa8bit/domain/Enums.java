package com.xa8bit.domain;

import lombok.Getter;

/**
 * 返回状态码枚举类
 */
public class Enums {

    @Getter
    public enum ResponseEnum {
        SUCCESS("200", "请求成功"),
        FAILURE("500", "请求失败"),
        FORBIDDEN("403", "禁止访问"),
        USER_NOT_FOUND("500", "用户不存在"),
        PASSWORD_ERROR("500", "密码错误"),
        TOKEN_EMPTY("500", "token为空");

        private String code;

        private String msg;

        ResponseEnum(String code, String msg) {
            this.code = code;
            this.msg = msg;
        }
    }

}
