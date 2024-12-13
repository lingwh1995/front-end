package com.xa8bit.config;

import com.xa8bit.interceptor.WebSecurityInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * 拦截器配置
 */
@Configuration
public class InterceptorConfig implements WebMvcConfigurer {

    /**
     * 从Spring容器中获取 WebSecurityInterceptor 实例对象
     */
    @Resource
    private WebSecurityInterceptor webSecurityInterceptor;

    /**
     * 注册拦截器
     * @param registry
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        //存放拦截器放行的的路径
        List<String> excludePathPatterns = new ArrayList<>();
        //放行登录接口
        excludePathPatterns.add("/qrcode-generator/user/login");
        //注册拦截器时不使用 registry.addInterceptor(new WebSecurityInterceptor())，而是使用从Spring容器中获取的webSecurityInterceptor对象
        registry.addInterceptor(webSecurityInterceptor)
                .addPathPatterns("/qrcode-generator/**")//拦截的路径
                .excludePathPatterns(excludePathPatterns);
    }

}
