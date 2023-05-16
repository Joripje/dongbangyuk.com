package com.stat.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.TreeMap;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.stat.domain.score.GameScore;
import com.stat.domain.score.ScoreArchive;
import com.stat.domain.score.ScoreArchiveRepository;
import com.stat.domain.statistics.Statistics;
import com.stat.domain.statistics.StatisticsRepository;
import com.stat.dto.AbilityResponseDto;
import com.stat.dto.GameScoreResponseDto;
import com.stat.dto.StatisticsListResponseDto;
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

		Statistics statistics = statisticsRepository.findByType(type)
			.orElseGet(() -> createStatistics(type));

		statistics.getScores().add(0, score);
		return statisticsRepository.save(statistics);
	}

	@Transactional(readOnly = true)
	public UserHistoryResponseDto getUserHistoryByGameType(int userId, String type) {
		Map<String, Integer> gameCount = getGameCount(userId);
		ScoreArchive scoreArchive = scoreArchiveRepository.findByUserId(userId)
			.orElseThrow(() -> new UserNotFoundException(String.format("%s 님의 게임 응시 내역이 없어요.", userId)));

		List<GameScoreResponseDto> dto;

		if (type.equals("all")) {
			dto = getDataByGameIds(userId);
		} else {
			Optional<GameScore> first = scoreArchive.getGameList().stream()
				.filter(gameScore1 -> gameScore1.getType().equals(type))
				.findFirst();

			if (first.isPresent()) {
				GameScore gameScore = first.get();
				List<List<Integer>> lists = gameScore.getScoreList();
				List<List<Integer>> lists1 = lists.subList(0, (Math.min(lists.size(), 6)));

				dto = lists1.stream()
					.map(integers -> new GameScoreResponseDto(gameScore.getType(), integers))
					.collect(Collectors.toList());
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

		List<Integer> gameIds = scoreArchive.getGameIds().subList(0, Math.min(scoreArchive.getGameIds().size(), 6));
		List<GameScoreResponseDto> dataList = new ArrayList<>();

		for (Integer gameId : gameIds) {
			List<GameScore> gameScores = findGameScoresByGameId(gameId, scoreArchive.getGameList());
			for (GameScore gameScore : gameScores) {
				gameScore.getScoreList().stream()
					.filter(scoreList -> !scoreList.isEmpty())
					.map(scoreList -> new GameScoreResponseDto(gameScore.getType(), scoreList))
					.forEach(dataList::add);
			}
		}
		return dataList;
	}

	private List<GameScore> findGameScoresByGameId(int gameId, List<GameScore> gameScores) {
		return gameScores.stream()
			.filter(gameScore -> !gameScore.getScoreList().isEmpty())
			.filter(gameScore -> gameScore.getScoreList().get(0).get(0).equals(gameId))
			.collect(Collectors.toList());
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

		int catScore = 0;
		int roadScore = 0;
		int rotateScore = 0;
		int rpsScore = 0;

		int total = 0;
		int sum2nd = 0;
		int sum3rd = 0;
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

			for (List<Integer> scoreEntry : results) {
				total += 1;
				sum2nd += scoreEntry.get(2);
				sum3rd += scoreEntry.get(3);
			}

		}
		int enduranceAvg = calculateAverage(sum2nd, total);
		int resilienceAvg = calculateAverage(sum3rd, total);

		return new AbilityResponseDto(catScore, roadScore, rotateScore, rpsScore, enduranceAvg, resilienceAvg);
	}

	private static int calculateAverage(int sum, int totalCount) {
		return totalCount != 0 ? sum / totalCount : 0;
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
	public List<StatisticsListResponseDto> getScoreLevelStatistics() {

		List<StatisticsListResponseDto> dtoList = new ArrayList<>();
		String[] gameTypes = {"cat", "road", "rotate", "rps"};
		for (String gameType : gameTypes) {
			Statistics statistics = statisticsRepository.findByType(gameType)
				.orElseThrow(() -> new GameTypeNotFoundException(String.format("%s에 대한 데이터가 없어요.", gameType)));

			dtoList.add(new StatisticsListResponseDto(gameType, statistics.calculateScoreLevels()));
		}
		return dtoList;
	}

	public void updateAllStatistics() {
		List<ScoreArchive> scoreArchives = scoreArchiveRepository.findAll();

		for (ScoreArchive scoreArchive : scoreArchives) {
			List<GameScore> gameList = scoreArchive.getGameList();
			for (GameScore gameScore : gameList) {
				String type = gameScore.getType();
				System.out.println("type: " + type);
				int score = gameScore.getScoreList().get(0).get(1); // scoreList의 두 번째 값만 추출
				System.out.println("score: " + score);
				updateStatistics(type, score);
			}
		}
	}

	public void updateStatistics(String type, int score) {

		Optional<Statistics> optionalStatistics = statisticsRepository.findByType(type);
		Statistics statistics;

		// 해당 유형의 통계가 없는 경우 새로운 통계 생성
		statistics = optionalStatistics.orElseGet(() -> Statistics.builder()
			.type(type)
			.scores(new ArrayList<>())
			.build());

		// 기존 통계에 점수 추가
		statistics.getScores().add(score);

		// 통계 저장
		statisticsRepository.save(statistics);
	}

}
