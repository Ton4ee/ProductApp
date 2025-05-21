package com.example.productapp;

import com.example.productapp.model.Product;
import com.example.productapp.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner loadData(ProductRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                for (int i = 1; i <= 20; i++) {
                    Product product = new Product();
                    product.setName("Product " + i);
                    product.setDescription("This is the description for product " + i);
                    product.setPrice(10.0 + i);
                    repository.save(product);
                }
            }
        };
    }
}
