package com.nicolaslaime.ecommerce.dto;

import com.nicolaslaime.ecommerce.entity.Product;
import lombok.Data;


@Data
public class ProductDTO {

    private Long id;
    private String name;
    private String categoryName;
    private double price;
    private String imageUrl;
    private int stock;


    public ProductDTO(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.categoryName = product.getCategory().getName();
        this.price = product.getPrice();
        this.imageUrl = product.getImageUrl();
        this.stock = product.getStock();

    }



}
