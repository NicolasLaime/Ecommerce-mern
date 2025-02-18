package com.nicolaslaime.ecommerce.repository;

import com.nicolaslaime.ecommerce.entity.Cart;
import com.nicolaslaime.ecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUser(User user);
}
