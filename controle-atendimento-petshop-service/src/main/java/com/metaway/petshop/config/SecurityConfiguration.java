package com.metaway.petshop.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.*;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.*;
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
    return (web) -> web.ignoring().requestMatchers("/", "/h2-console/**");
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    return http
      .csrf(csrf -> csrf.disable())
      .authorizeHttpRequests(auth -> auth
        .requestMatchers("/auth/login", "/auth/signup", "/docs", "/swagger-ui/**", "/v3/api-docs/**")
        .permitAll()
        .anyRequest()
        .authenticated()
      )
      .sessionManagement(sess -> sess.
        sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      )
      .authenticationProvider(authenticationProvider)
      .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
      .cors((cors) -> cors.configurationSource(corsConfigurationSource()))
      .build();
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();

    configuration.setAllowedOrigins(List.of(
      "http://localhost:4200",
      "http://localhost:8080",
      "https://4200-idx-sistema-controle-atendimento-petsho-1738781416065.cluster-etsqrqvqyvd4erxx7qq32imrjk.cloudworkstations.dev",
      "https://8080-idx-sistema-controle-atendimento-petsho-1738781416065.cluster-etsqrqvqyvd4erxx7qq32imrjk.cloudworkstations.dev/"
    ));
    configuration.setAllowedMethods(List.of(
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS"
    ));
    configuration.setAllowedHeaders(List.of(
      "Authorization",
      "Content-Type"
    ));
    configuration.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

    source.registerCorsConfiguration("/**", configuration);

    return source;
  }
}