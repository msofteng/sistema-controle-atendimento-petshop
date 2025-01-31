package com.metaway.petshop.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addRedirectViewController("/", "/docs");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
            .addMapping("/**")
            .allowedMethods("GET", "POST", "PUT", "DELETE")
            .allowedHeaders("*")
            .allowedOrigins(
                "https://localhost:4200",
                "https://4200-idx-sistema-controle-atendimento-petsho-1738314528240.cluster-duylic2g3fbzerqpzxxbw6helm.cloudworkstations.dev",
                "https://localhost:8080",
                "https://8080-idx-sistema-controle-atendimento-petsho-1738314528240.cluster-duylic2g3fbzerqpzxxbw6helm.cloudworkstations.dev"
            )
            .allowCredentials(true);
    }
}