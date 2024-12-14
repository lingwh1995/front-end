package com.xa8bit.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * 读取配置文件中token的配置信息
 */
@Data
@Configuration
@ConfigurationProperties(prefix = "configurations.jwt")
public class TokenConfiguration {
    /**
     * token在header中的key
     */
    private String header;

    /**
     * 令牌秘钥
     */
    private String secret;

    /**
     * 令牌有效期（默认30分钟）
     */
    private int expireTime = 30;

    /**
     * 时间单位
     */
    private String timeUnit;
}
