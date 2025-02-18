package com.nicolaslaime.ecommerce.controller;

import com.nicolaslaime.ecommerce.entity.Cart;
import com.nicolaslaime.ecommerce.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<Cart> getCart(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(cartService.getCartByUser(userDetails.getUsername()));
    }

    @PostMapping("/add")
    public ResponseEntity<Void> addToCart(@AuthenticationPrincipal UserDetails userDetails,
                                          @RequestParam Long productId,
                                          @RequestParam int quantity) {
        cartService.addToCart(userDetails.getUsername(), productId, quantity);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/remove")
    public ResponseEntity<Void> removeFromCart(@AuthenticationPrincipal UserDetails userDetails,
                                               @RequestParam Long productId) {
        cartService.removeFromCart(userDetails.getUsername(), productId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/checkout")
    public ResponseEntity<Void> checkout(@AuthenticationPrincipal UserDetails userDetails) {
        cartService.checkout(userDetails.getUsername());
        return ResponseEntity.ok().build();
    }
}
