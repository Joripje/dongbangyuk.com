package com.function.session;

import org.kurento.client.KurentoClient;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.standard.ServletServerContainerFactoryBean;

import com.function.session.kurento.UserRegistry;
import com.function.session.kurento.HelloWorldRecHandler;

@SpringBootApplication
@EnableWebSocket
public class KurentoServiceApplication implements WebSocketConfigurer {

	@Bean
	public UserRegistry registry() {
		return new UserRegistry();
	}

	@Bean
	public KurentoClient kurentoClient() {
		return KurentoClient.create();
	}

	@Bean
	public HelloWorldRecHandler handler() {
		return new HelloWorldRecHandler();
	}

	@Bean
	public ServletServerContainerFactoryBean createServletServerContainerFactoryBean() {
		ServletServerContainerFactoryBean container = new ServletServerContainerFactoryBean();
		container.setMaxTextMessageBufferSize(32768);
		return container;
	}

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(handler(), "/recording").setAllowedOrigins("*");
	}

	public static void main(String[] args) {
		SpringApplication.run(KurentoServiceApplication.class, args);
	}

}
