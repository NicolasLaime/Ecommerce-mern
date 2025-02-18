package com.nicolaslaime.ecommerce.controller;


import com.nicolaslaime.ecommerce.dto.CategoryDTO;
import com.nicolaslaime.ecommerce.dto.ProductDTO;
import com.nicolaslaime.ecommerce.entity.Product;
import com.nicolaslaime.ecommerce.repository.ProductRepository;
import com.nicolaslaime.ecommerce.service.CategoryService;
import com.nicolaslaime.ecommerce.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class PublicController {


    private final ProductService productService;
    private final CategoryService categoryService;

    public PublicController( ProductService productService, CategoryService categoryService) {
        this.productService = productService;
        this.categoryService = categoryService;
    }

    // 🌍 RUTA PÚBLICA
    @GetMapping("/products")
    public List<ProductDTO> getPublicProducts() {
        return productService.getAllProducts().stream().map(ProductDTO::new).toList();
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        return productService.getAllProducts().stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .map(p -> ResponseEntity.ok(new ProductDTO(p)))
                .orElseGet(() -> ResponseEntity.notFound().build());

    }



    @GetMapping("/categories")
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        List<CategoryDTO> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }







    @GetMapping("/categories/{categoryName}/products")
    public List<ProductDTO> getProductsByCategory(@PathVariable String categoryName) {
        return productService.getProductsByCategoryName(categoryName)
                .stream()
                .map(ProductDTO::new)
                .toList();
    }



}
