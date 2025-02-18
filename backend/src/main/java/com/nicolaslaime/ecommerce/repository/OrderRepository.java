package com.nicolaslaime.ecommerce.repository;

import com.nicolaslaime.ecommerce.entity.Order;
import com.nicolaslaime.ecommerce.entity.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByStatus(OrderStatus status);







}
