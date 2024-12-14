package com.xa8bit.interceptor;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.xa8bit.config.TokenConfiguration;
import com.xa8bit.domain.Enums;
import com.xa8bit.domain.ResponseMessage;
import com.xa8bit.service.ITokenService;
import com.xa8bit.utils.ContextUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * 系统安全拦截器
 */
@Slf4j
@Component
public class WebSecurityInterceptor implements HandlerInterceptor {

    @Resource
    private TokenConfiguration tokenConfiguration;

    @Resource
    private ITokenService tokenService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String token = request.getHeader(tokenConfiguration.getHeader());
        if(token == null || token.length() == 0){
            RuntimeException runtimeException = new RuntimeException("token不能为空");
            noPermissionResponse(response, runtimeException);
            return false;
        }
        try {
            //验证token
            DecodedJWT jwt = tokenService.verifyToken(token);
            //从jwt中获取userId
            Long userId = jwt.getClaim("userId").asLong();
            //解析token,获取其中存储的userId信息，并放入Threadlocal中
            ContextUtil.set("userId", userId);
        } catch (JWTVerificationException e) {
            noPermissionResponse(response, e);
            return false;
        }
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        //清除ThreadLocal中存储的内容
        ContextUtil.remove();
        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }

    /**
     * token校验失败时返回的信息
     */
    private void noPermissionResponse(HttpServletResponse response, Exception e) throws IOException {
        Map<String, String> responseDataMap = new HashMap<>();
        responseDataMap.put("message", e.getMessage());
        ResponseMessage<Map<String, String>> responseMessage = new ResponseMessage<>(Enums.ResponseEnum.FORBIDDEN, responseDataMap);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().print(new ObjectMapper().writeValueAsString(responseMessage));
    }
}
