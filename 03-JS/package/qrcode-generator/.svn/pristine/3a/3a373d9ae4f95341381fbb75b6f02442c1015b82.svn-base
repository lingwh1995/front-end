package com.xa8bit.domain;

import lombok.Data;
import lombok.Getter;

import java.io.Serializable;

@Getter
@Data
public class ResponseMessage<T> implements Serializable {

    private String code = "200";

    private String msg = "请求成功";

    private T data;

    public ResponseMessage() {
    }

    public ResponseMessage(String code, String msg) {
        if (!code.isEmpty()) {
            this.code = code;
        }
        if (!msg.isEmpty()) {
            this.msg = msg;
        }
    }

    public ResponseMessage(String code, String msg, T data) {
        if (!code.isEmpty()) {
            this.code = code;
        }
        if (!msg.isEmpty()) {
            this.msg = msg;
        }
        this.data = data;
    }

    public ResponseMessage(Enums.ResponseEnum responseEnum, T data) {
        this.code = responseEnum.getCode();
        this.msg = responseEnum.getMsg();
        this.data = data;
    }

    public ResponseMessage(Enums.ResponseEnum responseEnum) {
        this.code = responseEnum.getCode();
        this.msg = responseEnum.getMsg();
    }

    public static ResponseMessage<Void> success() {
        return new ResponseMessage<>(Enums.ResponseEnum.SUCCESS, null);
    }

    public static <T> ResponseMessage<T> success(T data) {
        return new ResponseMessage<>(Enums.ResponseEnum.SUCCESS, data);
    }

    public static ResponseMessage<Void> failed() {
        return new ResponseMessage<>(Enums.ResponseEnum.FAILURE, null);
    }

    public static ResponseMessage<String> failed(String data) {
        return new ResponseMessage<>(Enums.ResponseEnum.FAILURE, data);
    }

    public static ResponseMessage<String> SUCCESS(int row) {
        if (row > 0) {
            return new ResponseMessage<>("200", "请求成功");
        }
        return new ResponseMessage<>("500", "请求失败");
    }
}
