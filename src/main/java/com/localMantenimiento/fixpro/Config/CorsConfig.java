package com.localMantenimiento.fixpro.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Aplica a todas las rutas
            .allowedOrigins("http://127.0.0.1:5500", "http://localhost:5500") // Ajusta si usas otro puerto
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS","UPDATE")
            .allowedHeaders("*")
            .allowCredentials(false);

      }
    };
  }
}
