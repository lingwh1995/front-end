package com.xa8bit.controller;

import com.xa8bit.domain.Enums;
import com.xa8bit.domain.ResponseMessage;
import com.xa8bit.domain.User;
import com.xa8bit.service.ITokenService;
import com.xa8bit.service.IUserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/user/")
public class UserController {
    @Resource
    private IUserService userService;

    @Resource
    private ITokenService tokenService;

    @PostMapping("/login")
    public ResponseMessage<String> login(@RequestBody User user) {
        //验证用户信息
        User userFromDb = userService.getUserByUserName(user.getUsername());
        if (userFromDb == null) {
            return ResponseMessage.failed(Enums.ResponseEnum.USER_NOT_FOUND.getMsg());
        }
        if (user.getPassword().equals(userFromDb.getPassword())) {
            String token = tokenService.createToken(userFromDb);
            return ResponseMessage.success(token);
        } else {
            return ResponseMessage.failed(Enums.ResponseEnum.PASSWORD_ERROR.getMsg());
        }
    }
}
