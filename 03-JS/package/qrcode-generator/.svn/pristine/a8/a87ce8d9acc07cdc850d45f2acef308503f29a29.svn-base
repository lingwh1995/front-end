package com.xa8bit.service.impl;

import com.xa8bit.dao.IBarCodesDao;
import com.xa8bit.domain.BarCodes;
import com.xa8bit.service.IBarCodesService;
import com.xa8bit.utils.UUIDUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class BarCodesServiceImpl implements IBarCodesService {

    @Resource
    private IBarCodesDao barCodesDao;

    @Override
    public int addBarCodes(BarCodes barCodes) {
        //设置创建日期
        barCodes.setCreateTime(LocalDateTime.now());
        barCodes.setBatchId(UUIDUtils.randomUUID().toUpperCase());
        return barCodesDao.addBarCodes(barCodes);
    }

    @Override
    public List<BarCodes> getBarCodes(BarCodes barCodes) {
        return barCodesDao.getBarCodes(barCodes);
    }

    @Override
    public int undoAddBarCodes() {
        return barCodesDao.undoAddBarCodes();
    }

    @Override
    public BarCodes getLastBatchGenerateBarCodesBySchemeIdAndRuleId(BarCodes barCodes) {
        return barCodesDao.getLastBatchGenerateBarCodesBySchemeIdAndRuleId(barCodes);
    }

}
