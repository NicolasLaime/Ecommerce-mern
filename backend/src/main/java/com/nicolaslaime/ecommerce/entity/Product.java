package com.nicolaslaime.ecommerce.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private Double price;

    // Este campo va a almacenar la URL de la imagen en Cloudinary
    private String imageUrl;

    private int stock;

    @Column(nullable = false)
    private boolean available = true;  // Indica si el producto está disponible para la venta

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id") // Este es el campo que guarda la relación con Category
    private Category category;
}

