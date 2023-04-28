package com.stat.domain.score;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ScoreArchiveRepository extends MongoRepository<ScoreArchive, Long> {

	Optional<ScoreArchive> findByUserId(int userId);

}
