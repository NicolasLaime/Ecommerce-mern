package com.nicolaslaime.ecommerce.service;


import com.nicolaslaime.ecommerce.entity.Order;
import com.nicolaslaime.ecommerce.repository.OrderRepository;
import com.nicolaslaime.ecommerce.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public OrderService(OrderRepository orderRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }



    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }



}
