package com.nicolaslaime.ecommerce.repository;

import com.nicolaslaime.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {


    // Obtener productos disponibles (para la tienda)
    @Query("SELECT p FROM Product p WHERE p.available = true")
    List<Product> findAvailableProducts();

    // Obtener productos vendidos (para ver las ventas)
    @Query("SELECT p FROM Product p WHERE p.available = false")
    List<Product> findSoldProducts();


    List<Product> findByCategoryId(Long categoryId);

    List<Product> findByCategoryName(String name);


}

