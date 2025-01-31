package com.metaway.petshop.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class OpenAPIConfig {
    @Bean
    public OpenAPI config() {
        return new OpenAPI(){{
            setInfo(new Info(){{
                title("Controle de Atendimento (Pet Shop)");
                description(
                    "<b>Sistema de controle de atendimentos de um petshop</b>"
                    + "<p>"
                    + "<a href=\"https://localhost:4200\" target=\"_blank\">Plataforma WEB (Angular)</a>"
                    + "<p>"
                    + "<a href=\"https://localhost:3000/coverage/controle-atendimento-petshop-web/\" target=\"_blank\">Testes Unitários (Karma/Jasmine) - Front-end</a>"
                    + "<p>"
                    + "<a href=\"https://localhost:5000\" target=\"_blank\">Testes Unitários (Jacoco) - Back-end</a>"
                    + "<p>"
                    + "Para se conectar ao banco de dados, insira as credenciais no <a title=\"Banco de Dados (H2)\" href=\"https://localhost:8080/h2-console\" target=\"_blank\">console</a>:"
                    + "<blockquote><b>JDBC URL:</b> jdbc:h2:mem:petshopdb<br><b>Usuário:</b> metaway<br><b>Senha:</b> metaway</blockquote>"
                );
                version("1.0.0");
                contact(new Contact(){{
                    setName("");
                    setUrl("");
                }});
            }});
        }};
    }
}