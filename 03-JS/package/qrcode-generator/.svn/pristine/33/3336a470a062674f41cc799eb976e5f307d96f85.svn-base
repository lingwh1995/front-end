package com.xa8bit.service.impl;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.xa8bit.config.TokenConfiguration;
import com.xa8bit.dao.IUserDao;
import com.xa8bit.domain.User;
import com.xa8bit.service.ITokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

@Service
public class TokenServiceImpl implements ITokenService {

    @Autowired
    private TokenConfiguration tokenConfiguration;

    @Autowired
    private IUserDao userDao;

    @Override
    public String createToken(User user) throws JWTCreationException {
        Calendar calendar = Calendar.getInstance();
        //获取时间单位
        String timeUnit = tokenConfiguration.getTimeUnit();
        //获取时间
        int expireTime = tokenConfiguration.getExpireTime();
        switch (timeUnit) {
            case "HOUR":
                calendar.add(Calendar.HOUR, expireTime);
                break;
            case "MINUTE":
                calendar.add(Calendar.MINUTE, expireTime);
                break;
            case "SECOND":
                calendar.add(Calendar.SECOND, expireTime);
                break;
            default:
                break;
        }
        //创建jwtBuilder对象
        JWTCreator.Builder jwtBuilder = JWT.create();
        //创建标头-jwtHeader（标头也可以不创建）
        Map<String, Object> jwtHeader = new HashMap<>();
        //设置标头
        jwtBuilder.withHeader(jwtHeader);

        //设置载荷-payload（存储非敏感的信息，例如：用户账号，不能存密码，防止被人解析）
        jwtBuilder.withClaim("userId", user.getId())
                .withClaim("userName", user.getUsername());
        //设置令牌过期时间-expireTime
        jwtBuilder.withExpiresAt(calendar.getTime());

        //设置签名算法-algorithm（一般密码存放在这里）
        return jwtBuilder.sign(Algorithm.HMAC256(tokenConfiguration.getSecret() + user.getPassword()));
    }

    @Override
    public DecodedJWT verifyToken(String token) throws JWTVerificationException {
        //从token中获取userId
        int userId = JWT.decode(token).getClaim("userId").asInt();
        User user = userDao.getUserById(userId);
        //创建验证对象
        JWTVerifier jWTVerifier = JWT.require(Algorithm.HMAC256(tokenConfiguration.getSecret() + user.getPassword())).build();
        //验证token
        return jWTVerifier.verify(token);
    }
}
