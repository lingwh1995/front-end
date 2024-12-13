package com.xa8bit.service.impl;

import com.xa8bit.dao.IUserDao;
import com.xa8bit.domain.User;
import com.xa8bit.service.IUserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class UserServiceImpl implements IUserService {
    @Resource
    private IUserDao userDao;

    @Override
    public User getUserByUserName(String userName) {
        return userDao.getUserByUserName(userName);
    }
}
