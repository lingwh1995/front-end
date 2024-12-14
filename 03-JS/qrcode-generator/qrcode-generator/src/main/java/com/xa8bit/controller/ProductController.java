package com.xa8bit.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xa8bit.domain.Product;
import com.xa8bit.domain.ResponseMessage;
import com.xa8bit.service.IProductService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;


@RestController
public class ProductController {

    @Resource
    private IProductService productService;

    /**
     * 新增产品
     * @return
     */
    @PostMapping("/product")
    public ResponseMessage<String> addProduct(@RequestBody Product product) {
        int row = productService.addProduct(product);
        return ResponseMessage.SUCCESS(row);
    }

    /**
     * 删除产品
     * @return
     */
    @DeleteMapping("/product/{id}")
    public ResponseMessage<String> deleteProductById(@PathVariable("id") int id) {
        int row = productService.deleteProductById(id);
        return ResponseMessage.SUCCESS(row);
    }

    /**
     * 修改产品
     * @return
     */
    @PutMapping("/product")
    public ResponseMessage<String> updateProduct(@RequestBody Product product) {
        int row = productService.updateProduct(product);
        return ResponseMessage.SUCCESS(row);
    }

    /**
     * 查询单个产品
     * @return
     */
    @GetMapping("/product/{id}")
    public Product getProductById(@PathVariable("id") int id) {
        Product product = productService.getProductById(id);
        return new Product();
    }
    /**
     * 查询多个产品
     * @return
     */
    @GetMapping("/product/{currentPage}/{pageSize}")
    public PageInfo<Product>  getProducts(@PathVariable("currentPage") int currentPage,
                                        @PathVariable("pageSize") int pageSize) {
        // 设置分页条件
        PageHelper.startPage(currentPage, pageSize);
        List<Product> products = productService.getProducts();
        return PageInfo.of(products);
    }
}
