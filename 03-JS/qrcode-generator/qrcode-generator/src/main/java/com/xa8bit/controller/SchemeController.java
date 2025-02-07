package com.xa8bit.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xa8bit.domain.ResponseMessage;
import com.xa8bit.domain.Scheme;
import com.xa8bit.service.ISchemeService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController
public class SchemeController {

    @Resource
    private ISchemeService schemeService;

    /**
     * 新增方案
     * @return
     */
    @PostMapping("/scheme")
    public ResponseMessage<String> addScheme(@RequestBody Scheme scheme) {
        int row = schemeService.addScheme(scheme);
        return ResponseMessage.SUCCESS(row);
    }

    /**
     * 查询所有方案-分页版
     * @return
     */
    @GetMapping("/scheme/pagination/current_page/{current_page}/page_size/{page_size}")
    public ResponseMessage<PageInfo<Scheme>> getSchemesPagination(@PathVariable("current_page") int currentPage,
                                                                  @PathVariable("page_size") int pageSize) {
        // 设置分页条件
        PageHelper.startPage(currentPage, pageSize);
        List<Scheme> schemes = schemeService.getSchemes();
        return ResponseMessage.success(PageInfo.of(schemes));
    }

    /**
     * 根据方案名称查询所有方案-分页版
     * @return
     */
    @GetMapping("/scheme/pagination/current_page/{current_page}/page_size/{page_size}/scheme_name/{scheme_name}")
    public ResponseMessage<PageInfo<Scheme>> getSchemesBySchemeNamePagination(@PathVariable("current_page") int currentPage,
                                                                              @PathVariable("page_size") int pageSize,
                                                                              @PathVariable("scheme_name") String schemeName) {
        // 设置分页条件
        PageHelper.startPage(currentPage, pageSize);
        List<Scheme> schemes = schemeService.getSchemesBySchemeName(schemeName);
        return ResponseMessage.success(PageInfo.of(schemes));
    }

    /**
     * 根据id删除方案
     *
     * @param id
     * @return
     */
    @DeleteMapping("/scheme/{id}")
    public ResponseMessage<String> deleteSchemeById(@PathVariable("id") Integer id) {
        int row = schemeService.deleteSchemeById(id);
        return ResponseMessage.SUCCESS(row);
    }

    /**
     * 查询所有方案-下拉框专用
     * @return
     */
    @GetMapping("/scheme/for_input")
    public ResponseMessage<List<Scheme>> getSchemesForSelectInput() {
        return ResponseMessage.success(schemeService.getSchemesForSelectInput());
    }

    /**
     * 更新方案
     * @return
     */
    @PutMapping("/scheme")
    public ResponseMessage<String> updateScheme(@RequestBody Scheme scheme) {
        int row = schemeService.updateScheme(scheme);
        return ResponseMessage.SUCCESS(row);
    }
}
