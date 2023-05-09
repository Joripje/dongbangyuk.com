package com.stat.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.stat.domain.score.GameScore;
import com.stat.domain.score.ScoreArchive;
import com.stat.domain.score.ScoreArchiveRepository;
import com.stat.domain.statistics.Statistics;
import com.stat.domain.statistics.StatisticsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StatisticsService {

	private final StatisticsRepository statisticsRepository;
	private final ScoreArchiveRepository scoreArchiveRepository;

	@Transactional(readOnly = true)
	public Statistics getStatisticsByType(String type) {
		return statisticsRepository.findByType(type)
			.orElseThrow(() -> new IllegalArgumentException("해당 게임이 없어요."));
	}

	@Transactional
	public void addDummy() {
		Statistics game1 = Statistics.builder()
			.id(1)
			.type("cat")
			.scores(Arrays.asList(9, 6, 8, 7, 4, 6))
			.build();

		Statistics game2 = Statistics.builder()
			.id(2)
			.type("road")
			.scores(Arrays.asList(9, 7, 8, 3, 6))
			.build();

		Statistics game3 = Statistics.builder()
			.id(3)
			.type("rotate")
			.scores(Arrays.asList(9, 7, 4, 6, 4, 8))
			.build();

		Statistics game4 = Statistics.builder()
			.id(4)
			.type("rps")
			.scores(Arrays.asList(7, 4, 6))
			.build();

		List<Statistics> stats = Arrays.asList(game1, game2, game3, game4);
		statisticsRepository.saveAll(stats);
	}
	
	// 스케줄링 적용 필요
	public void updateStatistics() {
		LocalDate today = LocalDate.now();
		List<ScoreArchive> scoreArchives = scoreArchiveRepository.findAll();
		List<String> gameTypes = Arrays.asList("game1", "game2", "game3", "game4");
		int sequence = 0;

		for (String gameType: gameTypes) {
			List<Integer> allScores = new ArrayList<>();

			for (ScoreArchive scoreArchive : scoreArchives) {
				for (GameScore gameScore : scoreArchive.getGameScores()) {
					if (gameScore.getType().equals(gameType) && gameScore.getLastModified().toLocalDate().isEqual(today)) {
						allScores.addAll(gameScore.getScores());
					}
				}
			}

			if (!allScores.isEmpty()) {
				Statistics statistics = statisticsRepository.findByType(gameType)
					.orElse(Statistics.builder().id(++sequence).type(gameType).build());
				statistics.updateScores(allScores);
				statisticsRepository.save(statistics);
			}
		}
	}
}
