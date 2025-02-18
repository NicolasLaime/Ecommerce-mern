package com.nicolaslaime.ecommerce.controller;

import com.nicolaslaime.ecommerce.dto.ProductDTO;
import com.nicolaslaime.ecommerce.entity.Order;
import com.nicolaslaime.ecommerce.entity.OrderStatus;
import com.nicolaslaime.ecommerce.entity.Product;
import com.nicolaslaime.ecommerce.repository.OrderRepository;
import com.nicolaslaime.ecommerce.repository.ProductRepository;
import com.nicolaslaime.ecommerce.service.OrderService;
import com.nicolaslaime.ecommerce.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final ProductService productService;

    private final ProductRepository productRepository;

    private final OrderRepository orderRepository;

    private final OrderService orderService;

    public AdminController(ProductService productService, ProductRepository productRepository, OrderRepository orderRepository, OrderService orderService) {
        this.productService = productService;
        this.productRepository = productRepository;

        this.orderRepository = orderRepository;
        this.orderService = orderService;
    }


    @PostMapping(value = "/addProduct", consumes = "multipart/form-data")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public Product addProduct(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") double price,
            @RequestParam("categoryId") Long categoryId,
            @RequestParam("stock") int stock,  // Nuevo parámetro
            @RequestParam(value = "imageUrl", required = false) String imageUrl,
            @RequestParam(value = "file", required = false) MultipartFile file) {

        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setStock(stock);  // Asignar el valor de stock


        // Si el usuario envía una URL, la guarda directamente
        if (imageUrl != null && !imageUrl.isEmpty()) {
            product.setImageUrl(imageUrl);
        }

        return productService.saveProduct(product, categoryId, file);
    }


    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/deleteProduct/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long productId) {
        Optional<Product> product = productRepository.findById(productId);

        if (product.isPresent()) {
            // Elimina el producto. La base de datos se encargará de eliminar los cart_item relacionados.
            productRepository.deleteById(productId);
            return ResponseEntity.ok("Producto eliminado correctamente");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Producto no encontrado");
        }
    }


    // actualizar Producto

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PutMapping("/updateProduct/{productId}")
    public ResponseEntity<?> updateProduct(
            @PathVariable Long productId,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") double price,
            @RequestParam("categoryId") Long categoryId,
            @RequestParam(value = "imageUrl", required = false) String imageUrl,
            @RequestParam(value = "file", required = false) MultipartFile file) {

        Optional<Product> existingProduct = productRepository.findById(productId);
        if (!existingProduct.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Producto no encontrado");
        }

        Product product = existingProduct.get();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);

        if (imageUrl != null && !imageUrl.isEmpty()) {
            product.setImageUrl(imageUrl);
        }

        productService.saveProduct(product, categoryId, file);
        return ResponseEntity.ok("Producto actualizado correctamente");
    }


    // Traer Todos los productos
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/products")
    public List<ProductDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream().map(ProductDTO::new).collect(Collectors.toList());
    }


    //total ventas
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/total-ventas")
    public ResponseEntity<Double> getTotalVentas() {
        List<Order> orders = orderRepository.findByStatus(OrderStatus.COMPLETED);

        if (orders.isEmpty()) {
            // 🔹 Si no hay órdenes en la base de datos, usamos datos de prueba
            orders = List.of(
                    new Order(1L, null, null, OrderStatus.COMPLETED, 120.50, null),
                    new Order(2L, null, null, OrderStatus.COMPLETED, 89.99, null),
                    new Order(3L, null, null, OrderStatus.COMPLETED, 45.75, null)
            );
        }

        double totalVentas = orders.stream()
                .mapToDouble(Order::getTotalAmount)
                .sum();

        return ResponseEntity.ok(totalVentas);
    }







}
