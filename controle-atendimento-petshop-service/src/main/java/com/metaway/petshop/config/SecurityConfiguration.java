package com.metaway.petshop.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.*;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableWebSecurity
@EnableWebMvc
public class SecurityConfiguration {
  @Autowired
  private AuthenticationProvider authenticationProvider;
	
  @Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;

  @Bean
  public WebSecurityCustomizer webSecurityCustomizer() {
    return (web) -> web.ignoring().requestMatchers("/docs", "/", "/h2-console/**", "/swagger-ui/**", "/v3/api-docs/**");
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    return http
      .csrf(csrf -> csrf.disable())
      .authorizeHttpRequests(auth -> auth
        .requestMatchers("/auth/**")
        .permitAll()
        .anyRequest()
        .authenticated()
      )
      .sessionManagement(sess -> sess.
        sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      )
      .authenticationProvider(authenticationProvider)
      .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
      .httpBasic(Customizer.withDefaults())
      .build();
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();

    configuration.setAllowedOrigins(List.of(
      "https://localhost:4200",
      "https://4200-idx-sistema-controle-atendimento-petsho-1738315737017.cluster-m7tpz3bmgjgoqrktlvd4ykrc2m.cloudworkstations.dev",
      "https://localhost:8080",
      "https://8080-idx-sistema-controle-atendimento-petsho-1738315737017.cluster-m7tpz3bmgjgoqrktlvd4ykrc2m.cloudworkstations.dev"
    ));
    configuration.setAllowedMethods(List.of(
      "GET",
      "POST",
      "PUT",
      "DELETE"
    ));
    configuration.setAllowedHeaders(List.of(
      "Authorization", "Content-Type"
    ));

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

    source.registerCorsConfiguration("/**", configuration);

    return source;
  }
}