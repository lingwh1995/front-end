package com.xa8bit.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xa8bit.domain.BarCodes;
import com.xa8bit.domain.ResponseMessage;
import com.xa8bit.service.IBarCodesService;
import com.xa8bit.utils.UUIDUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;

@RestController
public class BarCodesController {

    @Resource
    private IBarCodesService barCodesService;

    /**
     * 保存每个批次生成的条码
     * @param barCodes
     * @return
     */
    @PostMapping("/barcodes")
    public ResponseMessage<String> addBarCodesBatch(@RequestBody BarCodes barCodes) {
        int row = barCodesService.addBarCodes(barCodes);
        return ResponseMessage.SUCCESS(row);
    }

    /**
     * 查询出所有的批次信息
     * @param ruleId
     * @param schemeId
     * @param currentPage
     * @param pageSize
     * @return
     */
    @GetMapping("/barcodes/pagination/rule_id/{rule_id}/scheme_id/{scheme_id}/current_page/{current_page}/page_size/{page_size}")
    public ResponseMessage<PageInfo<BarCodes>> getBarCodesPagination(@PathVariable(value = "rule_id" ,required = false) String ruleId,
                                                    @PathVariable(value = "scheme_id", required = false) String schemeId,
                                                    @PathVariable("current_page") int currentPage,
                                                    @PathVariable("page_size") int pageSize) {
        //预处理参数
        schemeId = schemeId.equals("undefined") ? "null" : schemeId;
        ruleId = ruleId.equals("undefined") ? "null" : ruleId;
        BarCodes barCodes = new BarCodes();
        //设置规则id
        barCodes.setRuleId(ruleId);
        //设置方案id
        barCodes.setSchemeId(schemeId);
        // 设置分页条件
        PageHelper.startPage(currentPage, pageSize);
        List<BarCodes> barCodesList = barCodesService.getBarCodes(barCodes);
        return ResponseMessage.success(PageInfo.of(barCodesList));
    }

    /**
     * 查询出所有的批次信息
     * @param ruleId
     * @param schemeId
     * @return
     */
    @GetMapping("/barcodes/last_batch_generate/rule_id/{rule_id}/scheme_id/{scheme_id}")
    public ResponseMessage<BarCodes> getLastBatchGenerateBarCodesBySchemeIdAndRuleId(@PathVariable(value = "rule_id" ,required = false) String ruleId,
                                                    @PathVariable(value = "scheme_id", required = false) String schemeId) {
        BarCodes barCodes = new BarCodes();
        //设置规则id
        barCodes.setRuleId(ruleId);
        //设置方案id
        barCodes.setSchemeId(schemeId);
        BarCodes barCodes_ = barCodesService.getLastBatchGenerateBarCodesBySchemeIdAndRuleId(barCodes);
        return ResponseMessage.success(barCodes_);
    }

    @DeleteMapping("/barcodes")
    public ResponseMessage<String> undoAddBarCodes(){
        int row = barCodesService.undoAddBarCodes();
        return ResponseMessage.SUCCESS(row);
    }
}
