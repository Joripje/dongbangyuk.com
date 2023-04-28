package com.stat.domain.score;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ScoreAvgRepository extends MongoRepository<ScoreAvg, Long> {

	Optional<ScoreAvg> findByUserId(int userId);

}
