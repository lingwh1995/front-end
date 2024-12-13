package com.xa8bit.service.impl;

import com.xa8bit.dao.ProductDao;
import com.xa8bit.domain.Product;
import com.xa8bit.service.IProductService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProductServiceImpl implements IProductService {

    @Resource
    private ProductDao productDao;

    @Override
    public int addProduct(Product product) {
        //设置创建时间
        product.setCreateTime(LocalDateTime.now());
        return productDao.addProduct(product);
    }

    @Override
    public int deleteProductById(int id) {
        return productDao.deleteProductById(id);
    }

    @Override
    public int updateProduct(Product product) {
        return productDao.updateProduct(product);
    }

    @Override
    public Product getProductById(int id) {
        return productDao.getProductById(id);
    }

    @Override
    public List<Product> getProducts() {
        return productDao.getProducts();
    }
}
