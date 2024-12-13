package com.xa8bit.service;

import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.xa8bit.domain.User;

public interface ITokenService {

    /**
     * 根据用户信息创建token
     * @param user
     * @return
     * @throws JWTCreationException
     */
    String createToken(User user)  throws JWTCreationException;

    /**
     * 验证token
     * @param token
     * @return
     */
    DecodedJWT verifyToken(String token) throws JWTVerificationException;
}
