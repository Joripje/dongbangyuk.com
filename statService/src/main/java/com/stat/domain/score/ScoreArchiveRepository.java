package com.stat.domain.score;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ScoreArchiveRepository extends MongoRepository<ScoreArchive, Long> {

	List<ScoreArchive> findByUserId(int userId);

	Optional<ScoreArchive> findByUserIdAndGameType(int userId, String gameType);

	ScoreArchive findByUserIdAndGameId(int userId, int gameId);
}