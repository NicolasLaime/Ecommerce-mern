package com.nicolaslaime.ecommerce.service;

import com.nicolaslaime.ecommerce.entity.Category;
import com.nicolaslaime.ecommerce.entity.Product;
import com.nicolaslaime.ecommerce.repository.ProductRepository;
import com.nicolaslaime.ecommerce.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Slf4j  // Habilita logs con log.info()
@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final CloudinaryService cloudinaryService;

    public Product saveProduct(Product product, Long categoryId, MultipartFile file) {
        log.info("📥 Recibiendo solicitud para guardar producto: {}", product.getName());
        log.info("📂 Archivo recibido: {}", (file != null && !file.isEmpty()) ? file.getOriginalFilename() : "Ninguno");

        // Buscamos la categoría por ID
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
        product.setCategory(category);
        log.info("📂 Categoría asignada: {}", category.getName());

        // Subir la imagen a Cloudinary
        if (file != null && !file.isEmpty()) {
            try {
                log.info("⏳ Subiendo imagen a Cloudinary...");
                String imageUrl = cloudinaryService.uploadImage(file);
                product.setImageUrl(imageUrl);
                log.info("✅ Imagen subida con éxito: {}", imageUrl);
            } catch (IOException e) {
                log.error("❌ Error al subir la imagen a Cloudinary", e);
                throw new RuntimeException("Error al subir la imagen a Cloudinary", e);
            }
        }

        log.info(" Guardando producto en la base de datos...");
        Product savedProduct = productRepository.save(product);
        log.info("✅ Producto guardado con ID: {}", savedProduct.getId());

        return savedProduct;
    }

    public Product getProductById(Long id) {
        log.info(" Buscando producto con ID: {}", id);
        return productRepository.findById(id).orElse(null);
    }

    public void deleteProduct(Long id) {
        log.info("🗑 Eliminando producto con ID: {}", id);
        productRepository.deleteById(id);
    }

    public List<Product> getAllProducts() {
        log.info(" Listando todos los productos");
        return productRepository.findAll();
    }

    public List<Product> getProductsByCategoryName(String categoryName) {
        return productRepository.findByCategoryName(categoryName);
    }


    public List<Product> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }
}
