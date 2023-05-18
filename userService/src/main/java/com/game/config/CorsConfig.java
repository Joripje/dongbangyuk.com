package com.game.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
			.allowedOrigins("http://localhost:3000/", "http://localhost:3000", "https://k8a305.p.ssafy.io/", "https://k8a305.p.ssafy.io")
			.allowedMethods("*")
			.allowedHeaders("*")
			.exposedHeaders("*")
			.allowCredentials(true);
	}

}
