package com.stat.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

@Configuration
public class MongoConfig extends AbstractMongoClientConfiguration {

	@Value("${spring.data.mongodb.host}")
	private String host;

	@Value("${spring.data.mongodb.port}")
	private int port;

	@Value("${spring.data.mongodb.database}")
	private String database;

	@Value("${spring.data.mongodb.username}")
	private String username;

	@Value("${spring.data.mongodb.password}")
	private String password;

	@Value("${spring.data.mongodb.authentication-database}")
	private String authenticationDatabase;

	@Override
	@Bean
	public MongoClient mongoClient() {
		String connectionString = String.format("mongodb://%s:%s@%s:%d/%s", username, password, host, port,
			authenticationDatabase);
		return MongoClients.create(connectionString);
	}

	@Override
	protected String getDatabaseName() {
		return database;
	}

}
