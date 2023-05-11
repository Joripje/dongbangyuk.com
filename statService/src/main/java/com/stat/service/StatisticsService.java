package com.stat.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.TreeMap;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.stat.domain.score.GameScore;
import com.stat.domain.score.ScoreArchive;
import com.stat.domain.score.ScoreArchiveRepository;
import com.stat.domain.statistics.Statistics;
import com.stat.domain.statistics.StatisticsRepository;
import com.stat.dto.AbilityResponseDto;
import com.stat.dto.GameScoreResponseDto;
import com.stat.dto.StatisticsSaveRequestDto;
import com.stat.dto.UserHistoryResponseDto;
import com.stat.exception.GameTypeNotFoundException;
import com.stat.exception.InsufficientDataException;
import com.stat.exception.UserNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StatisticsService {

	private final StatisticsRepository statisticsRepository;
	private final ScoreArchiveRepository scoreArchiveRepository;

	@Transactional(readOnly = true)
	public List<Integer> getAllScoresByType(String type) {
		Statistics statistics = statisticsRepository.findByType(type)
			.orElseThrow(() -> new GameTypeNotFoundException(String.format("%s에 대한 데이터가 없어요.", type)));

		return statistics.getScores();
	}

	@Transactional
	public Statistics addStatistics(StatisticsSaveRequestDto requestDto) {
		String type = requestDto.getType();
		int score = requestDto.getScore();

		Optional<Statistics> optionalStatistics = statisticsRepository.findByType(type);
		Statistics statistics = optionalStatistics.orElseGet(() -> createStatistics(type));

		statistics.getScores().add(0, score);
		return statisticsRepository.save(statistics);
	}

	@Transactional(readOnly = true)
	public UserHistoryResponseDto getUserHistoryByGameType(int userId, String type) {
		Map<String, Integer> gameCount = getGameCount(userId);
		ScoreArchive scoreArchive = scoreArchiveRepository.findByUserId(userId)
			.orElseThrow(() -> new UserNotFoundException(String.format("%s 님의 게임 응시 내역이 없어요.", userId)));

		GameScore gameScore;
		List<GameScoreResponseDto> dto;

		if (type.equals("all")) {
			dto = getDataByGameIds(userId);
		} else {
			Optional<GameScore> first = scoreArchive.getGameList().stream()
				.filter(gameScore1 -> gameScore1.getType().equals(type))
				.findFirst();

			if (first.isPresent()) {
				gameScore = first.get();
				List<List<Integer>> lists = gameScore.getScoreList();
				List<List<Integer>> lists1 = lists.subList(0, (Math.min(lists.size(), 6)));

				dto = new ArrayList<>();
				for (List<Integer> integers : lists1) {
					dto.add(new GameScoreResponseDto(gameScore.getType(), integers));
				}
			} else {
				throw new GameTypeNotFoundException("[getUserHistoryByGameType] 해당 게임에 대한 응시 내역이 없어요.");
			}
		}
		return new UserHistoryResponseDto(gameCount, dto);
	}

	@Transactional(readOnly = true)
	public List<GameScoreResponseDto> getDataByGameIds(int userId) {
		ScoreArchive scoreArchive = scoreArchiveRepository.findByUserId(userId)
			.orElseThrow(() -> new UserNotFoundException("ScoreArchive not found for userId: " + userId));

		List<Integer> gameIds = scoreArchive.getGameIds();
		gameIds = gameIds.subList(0, Math.min(gameIds.size(), 6));

		List<GameScoreResponseDto> dataList = new ArrayList<>();

		for (Integer gameId : gameIds) {
			List<GameScore> gameScores = findGameScoresByGameId(gameId, scoreArchive.getGameList());
			for (GameScore gameScore : gameScores) {
				if (!gameScore.getScoreList().isEmpty()) {
					for (List<Integer> firstScore : gameScore.getScoreList()) {
						GameScoreResponseDto responseDto = retrieveDataFromFirstScore(gameScore.getType(), firstScore);
						dataList.add(responseDto);
					}
				}
			}
		}

		return dataList;
	}

	private List<GameScore> findGameScoresByGameId(int gameId, List<GameScore> gameScores) {
		List<GameScore> matchingGameScores = new ArrayList<>();

		for (GameScore gameScore : gameScores) {
			if (gameScore.getScoreList().isEmpty()) {
				continue;
			}

			List<Integer> firstScore = gameScore.getScoreList().get(0);
			Integer currentGameId = firstScore.get(0);

			if (currentGameId.equals(gameId)) {
				matchingGameScores.add(gameScore);
			}
		}

		return matchingGameScores;
	}

	private GameScoreResponseDto retrieveDataFromFirstScore(String type, List<Integer> firstScore) {
		return new GameScoreResponseDto(type, firstScore);
	}

	private Map<String, Integer> getGameCount(int userId) {
		ScoreArchive scoreArchive = scoreArchiveRepository.findByUserId(userId)
			.orElseThrow(() -> new UserNotFoundException(String.format("%s 님의 게임 응시 내역이 없어요.", userId)));

		Map<String, Integer> gameDataCounts = new TreeMap<>();
		int total = 0;
		for (GameScore gameScore : scoreArchive.getGameList()) {
			String gameType = gameScore.getType();
			int dataCount = gameScore.getScoreList().size();
			total += dataCount;
			gameDataCounts.put(gameType, dataCount);
		}
		gameDataCounts.put("total", total);

		return gameDataCounts;
	}

	public AbilityResponseDto getUserAbility(int userId) {
		ScoreArchive scoreArchive = scoreArchiveRepository.findByUserId(userId)
			.orElseThrow(() -> new UserNotFoundException(String.format("%s에 대한 데이터가 없어요.", userId)));

		List<GameScore> gameList = scoreArchive.getGameList();
		if (gameList.size() != 4) {
			throw new InsufficientDataException("모든 게임을 수행했을 때만 조회가 가능합니다.");
		}

		// Map<String, Integer> scoreList = new HashMap<>();
		List<Integer> enduranceList = new ArrayList<>();    // 지구력
		List<Integer> resilienceList = new ArrayList<>();    // 회복탄력성

		int catScore = 0;
		int roadScore = 0;
		int rotateScore = 0;
		int rpsScore = 0;

		int total = 0;
		for (GameScore gameScore : gameList) {
			List<List<Integer>> results = gameScore.getScoreList();

			switch (gameScore.getType()) {
				case "cat":
					catScore = results.get(0).get(1);
					break;
				case "road":
					roadScore = results.get(0).get(1);
					break;
				case "rotate":
					rotateScore = results.get(0).get(1);
					break;
				case "rps":
					rpsScore = results.get(0).get(1);
					break;
			}

			// 지구력과 회탄성 평균 구하기
			int sum2nd = 0;
			int sum3rd = 0;
			for (List<Integer> scoreEntry : results) {
				total += 1;
				sum2nd += scoreEntry.get(2);
				sum3rd += scoreEntry.get(3);
			}

			System.out.println("total: " + total);
			int average2nd = sum2nd / total;
			int average3rd = sum3rd / total;
			enduranceList.add(average2nd);
			resilienceList.add(average3rd);
		}

		AbilityResponseDto abilityResponseDto = new AbilityResponseDto(catScore, roadScore, rotateScore, rpsScore,
			calculateAverage(enduranceList), calculateAverage(resilienceList));

		String s = abilityResponseDto.toString();
		System.out.println("ability: " + s);

		return abilityResponseDto;
	}

	private static int calculateAverage(List<Integer> values) {
		int sum = 0;
		for (int value : values) {
			sum += value;
		}
		return sum / values.size();
	}

	private Statistics createStatistics(String type) {
		List<Integer> scores = new ArrayList<>();
		return Statistics.builder()
			.type(type)
			.scores(scores)
			.build();
	}

	@Transactional
	public void addDummy() {
		Statistics game1 = Statistics.builder()
			.type("cat")
			.scores(Arrays.asList(9, 6, 8, 7, 4, 6))
			.build();

		Statistics game2 = Statistics.builder()
			.type("road")
			.scores(Arrays.asList(9, 7, 8, 3, 6))
			.build();

		Statistics game3 = Statistics.builder()
			.type("rotate")
			.scores(Arrays.asList(9, 7, 4, 6, 4, 8))
			.build();

		Statistics game4 = Statistics.builder()
			.type("rps")
			.scores(Arrays.asList(7, 4, 6))
			.build();

		List<Statistics> stats = Arrays.asList(game1, game2, game3, game4);
		statisticsRepository.saveAll(stats);
	}

	@Transactional(readOnly = true)
	public Map<String, Integer> getScoreLevelStatistics(String type) {
		Statistics statistics = statisticsRepository.findByType(type)
			.orElseThrow(() -> new GameTypeNotFoundException(String.format("%s에 대한 데이터가 없어요.", type)));

		return new TreeMap<>(statistics.calculateScoreLevels());

	}

}
