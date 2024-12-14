package com.xa8bit.service;

import com.xa8bit.domain.Product;

import java.util.List;

public interface IProductService {

    /**
     * 新增产品
     * @param product 产品实体类
     * @return
     */
    int addProduct(Product product);

    /**
     * 删除产品
     * @param id 产品id
     * @return
     */
    int deleteProductById(int id);

    /**
     * 更新产品
     * @param product 产品实体类
     * @return
     */
    int updateProduct(Product product);

    /**
     * 获取单个产品
     * @param id 产品id
     * @return
     */
    Product getProductById(int id);

    /**
     * 获取所有的产品
     * @return
     */
    List<Product> getProducts();
}
