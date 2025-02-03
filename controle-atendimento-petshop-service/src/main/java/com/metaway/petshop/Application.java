package com.metaway.petshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import lombok.Generated;

@SpringBootApplication
@ComponentScan(basePackages = "com.metaway.petshop")
public class Application {
	@Generated
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}