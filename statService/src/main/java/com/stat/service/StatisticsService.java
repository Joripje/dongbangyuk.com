package com.stat.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.stat.domain.score.GameScore;
import com.stat.domain.score.ScoreAvg;
import com.stat.domain.score.ScoreAvgRepository;
import com.stat.domain.statistics.Statistics;
import com.stat.domain.statistics.StatisticsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StatisticsService {

	private final StatisticsRepository statisticsRepository;
	private final ScoreAvgRepository scoreAvgRepository;

	@Transactional(readOnly = true)
	public Statistics getStatisticsByType(String type) {
		return statisticsRepository.findByType(type)
			.orElseThrow(() -> new IllegalArgumentException("해당 게임이 없어요."));
	}

	@Transactional
	public void addDummy() {
		Statistics game1 = Statistics.builder()
			.id(1)
			.type("game1")
			.scores(Arrays.asList(0.9, 0.6, 0.8, 0.7, 0.4, 0.6))
			.build();

		Statistics game2 = Statistics.builder()
			.id(2)
			.type("game2")
			.scores(Arrays.asList(0.9, 0.7, 0.8, 0.3, 0.6))
			.build();

		Statistics game3 = Statistics.builder()
			.id(3)
			.type("game3")
			.scores(Arrays.asList(0.9, 0.7, 0.4, 0.6, 1.0, 0.8))
			.build();

		Statistics game4 = Statistics.builder()
			.id(4)
			.type("game4")
			.scores(Arrays.asList(0.7, 0.4, 0.6))
			.build();

		List<Statistics> stats = Arrays.asList(game1, game2, game3, game4);
		statisticsRepository.saveAll(stats);
	}

	public void updateStatistics() {
		List<ScoreAvg> scoreAvgs = scoreAvgRepository.findAll();
		List<Double> allScores = new ArrayList<>();
		List<String> gameTypes = Arrays.asList("game1", "game2", "game3", "game4");

		int sequence = 0;
		for (String gameType: gameTypes) {
			for (ScoreAvg scoreAvg : scoreAvgs) {
				for (GameScore gameScore : scoreAvg.getGameScores()) {
					if (gameScore.getGameId().equals(gameType)) {
						allScores.addAll(gameScore.getScores());
					}
				}
			}
			Statistics statistics = statisticsRepository.findByType(gameType)
				.orElse(Statistics.builder().id(++sequence).type(gameType).build());
			System.out.println("statistics: " + statistics.toString());

			statistics.updateScores(allScores);
			statisticsRepository.save(statistics);
		}
	}
}
