package com.metaway.petshop.config;

import org.springframework.context.annotation.*;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.*;

@Configuration
public class OpenAPIConfig {
  @Bean
  public OpenAPI config() {
    OpenAPI config = new OpenAPI();
    Info info = new Info();

    info.title("Controle de Atendimento (Pet Shop)");
    info.description(
        "<b>Sistema de controle de atendimentos de um petshop</b>"
      + "<p>"
      + "<a href=\"http://localhost:4200\" target=\"_blank\">Plataforma WEB (Angular)</a>"
      + "<p>"
      + "<a href=\"http://localhost:3000/coverage/controle-atendimento-petshop-web/\" target=\"_blank\">Testes Unitários (Karma/Jasmine) - Front-end</a>"
      + "<p>"
      + "<a href=\"http://localhost:5000\" target=\"_blank\">Testes Unitários (Jacoco) - Back-end</a>"
      + "<p>"
      + "Para se conectar ao banco de dados, insira as credenciais no <a title=\"Banco de Dados (H2)\" href=\"http://localhost:8080/h2-console\" target=\"_blank\">console</a>:"
      + "<blockquote><b>JDBC URL:</b> jdbc:h2:mem:petshopdb<br><b>Usuário:</b> metaway<br><b>Senha:</b> metaway</blockquote>"
    );
    info.version("1.0.0");

    config.setInfo(info);
    return config;
  }
}