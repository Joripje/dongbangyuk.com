package com.stat.domain.statistics;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface StatisticsRepository extends MongoRepository<Statistics, Long> {

	Optional<Statistics> findByType(String type);

}
